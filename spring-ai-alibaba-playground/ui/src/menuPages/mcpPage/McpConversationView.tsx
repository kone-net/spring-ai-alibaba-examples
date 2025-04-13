import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Sender } from "@ant-design/x";
import CodeInfo from "./components/CodeInfo";
import { useStyles } from "./style";
import {
  ChatMessage,
  useConversationContext,
} from "../../stores/conversation.store";
import BasePage from "../components/BasePage";
import { getMcp } from "../../api/mcp";
import { mapStoredMessagesToUIMessages } from "../../utils";
// 导入通用气泡组件
import ResponseBubble from "../components/ResponseBubble";
import RequestBubble from "../components/RequestBubble";
import { McpUiMessage } from "./types";
import { Message } from "../ChatPage/types";
interface McpConversationViewProps {
  conversationId: string;
}

const McpConversationView = ({ conversationId }: McpConversationViewProps) => {
  const { styles } = useStyles();
  const location = useLocation();
  const [inputContent, setInputContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const {
    activeConversation,
    chooseActiveConversation,
    updateActiveConversation,
  } = useConversationContext();

  // 跟踪组件是否首次加载，用于处理URL中的prompt参数
  const isFirstLoad = useRef(true);
  const processedPrompts = useRef(new Set<string>());

  // 选择正确的对话
  useEffect(() => {
    chooseActiveConversation(conversationId);
  }, [conversationId, chooseActiveConversation]);

  // 从存储的会话中加载消息
  useEffect(() => {
    if (activeConversation) {
      // 确保消息数组存在并且有内容
      if (
        activeConversation.messages &&
        activeConversation.messages.length > 0
      ) {
        const filteredMessages = activeConversation.messages.filter(
          (msg) => !(msg as McpUiMessage).isLoading
        );

        if (filteredMessages.length > 0) {
          const uiMessages = mapStoredMessagesToUIMessages(
            filteredMessages as ChatMessage[]
          );
          setMessages(uiMessages);
        } else {
          setMessages([]);
        }
      } else {
        setMessages([]);
      }
    }
  }, [activeConversation?.id, activeConversation?.messages]);

  // 处理URL中的prompt参数
  useEffect(() => {
    if (isFirstLoad.current && activeConversation) {
      const queryParams = new URLSearchParams(location.search);
      const urlPrompt = queryParams.get("prompt");

      if (urlPrompt && !processedPrompts.current.has(urlPrompt)) {
        // 标记此prompt已处理，避免重复处理
        processedPrompts.current.add(urlPrompt);
        console.log("从URL参数获取提示词:", urlPrompt);

        // 清除URL中的prompt参数，防止刷新页面重复发送
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);

        // 设置输入内容并自动发送
        setTimeout(() => {
          handleSendMessage(urlPrompt);
        }, 300);
      }

      isFirstLoad.current = false;
    }
  }, [location.search, activeConversation]);

  const updateConversationMessages = (
    messageContent: string,
    role: "assistant",
    isError: boolean = false,
    userTimestamp: number,
    userMessage: McpUiMessage
  ) => {
    if (!activeConversation) return;

    const assistantTimestamp = Date.now();
    const assistantMessage: McpUiMessage = {
      role: role,
      content: messageContent,
      timestamp: assistantTimestamp,
      isError: isError,
    };
    const assistantUiMessage = mapStoredMessagesToUIMessages([
      assistantMessage,
    ])[0];

    setMessages((prev) => [...prev, assistantUiMessage]);

    const existingUserMessage = activeConversation.messages.find(
      (msg) => msg.timestamp === userTimestamp && msg.role === "user"
    );

    const baseMessages = existingUserMessage
      ? activeConversation.messages
      : [...activeConversation.messages, userMessage];

    const finalMessages = baseMessages
      .filter((msg) => !(msg as McpUiMessage).isLoading)
      .concat([assistantMessage]);

    if (isError) {
      console.log("更新错误后的消息列表:", finalMessages);
    }

    updateActiveConversation({
      ...activeConversation,
      messages: finalMessages as McpUiMessage[],
    });
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading || !activeConversation) return;
    setIsLoading(true);
    setInputContent("");
    const userTimestamp = Date.now();
    const userMessage: McpUiMessage = {
      role: "user",
      content: text,
      timestamp: userTimestamp,
    };

    const userUiMessage = mapStoredMessagesToUIMessages([userMessage])[0];
    setMessages((prev) => [...prev, userUiMessage]);

    const updatedWithUserMessage = [
      ...activeConversation.messages,
      userMessage,
    ] as McpUiMessage[];
    updateActiveConversation({
      ...activeConversation,
      messages: updatedWithUserMessage,
    });

    try {
      const response = await getMcp(text, conversationId);
      if (response.code !== 0 || !response.data) {
        throw new Error(response.message || "Failed to get response");
      }
      updateConversationMessages(
        response.data,
        "assistant",
        false,
        userTimestamp,
        userMessage
      );
    } catch (error) {
      console.error("处理MCP请求错误:", error);
      updateConversationMessages(
        "抱歉，处理您的请求时出现错误。",
        "assistant",
        true,
        userTimestamp,
        userMessage
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BasePage title="MCP" conversationId={conversationId}>
      <div className={styles.container}>
        {/* 左侧面板 - 代码展示和输入框 */}
        <div className={styles.leftPanel}>
          <CodeInfo />
          <div className={styles.senderWrapper}>
            <Sender
              value={inputContent}
              onChange={setInputContent}
              onSubmit={handleSendMessage}
              placeholder="开始对话..."
              className={styles.sender}
              loading={isLoading}
            />
          </div>
        </div>

        {/* 右侧面板  */}
        <div className={styles.rightPanel}>
          <div className={`${styles.card} ${styles.resultPanel}`}>
            <h2 className={styles.panelTitle}>MCP 对话</h2>
            <div className={styles.messagesContainer}>
              {messages.length === 0 && !conversationId ? (
                <ResponseBubble
                  content="你好，请问有什么可以帮你的吗？"
                  timestamp={Date.now()}
                />
              ) : (
                messages.map((message) =>
                  message.sender === "user" ? (
                    <RequestBubble
                      key={message.id}
                      content={message.text}
                      timestamp={message.timestamp}
                    />
                  ) : (
                    <ResponseBubble
                      key={message.id}
                      content={message.text}
                      timestamp={message.timestamp}
                      isError={message.isError}
                    />
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </BasePage>
  );
};

export default McpConversationView;
