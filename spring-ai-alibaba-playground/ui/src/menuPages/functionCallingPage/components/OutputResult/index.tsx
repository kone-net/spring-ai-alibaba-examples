import React from "react";
import { useStyles } from "../../style";
import { useParams } from "react-router-dom";
import { InputResultProps } from "../../types";

const OutputResult: React.FC<InputResultProps> = ({
  messages = [],
  title = "Conversation",
}) => {
  const { styles } = useStyles();
  const { conversationId } = useParams<{ conversationId?: string }>();

  return (
    <div className={`${styles.card} ${styles.resultPanel}`}>
      <h2 className={styles.panelTitle}>{title}</h2>

      <div className={styles.messagesContainer}>
        {!conversationId ? (
          <div className={styles.botMessage}>
            <div className={styles.messageSender}>AI</div>
            <div className={styles.messageText}>
              你好，请问有什么可以帮你的吗？
            </div>
            <div className={styles.messageTime}>
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        ) : (
          messages?.map((message) => (
            <div
              key={message.id}
              className={
                message.sender === "user"
                  ? styles.userMessage
                  : styles.botMessage
              }
            >
              <div className={styles.messageSender}>
                {message.sender === "user" ? "You" : "AI"}
              </div>
              <div className={styles.messageText}>{message.text}</div>
              <div className={styles.messageTime}>
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OutputResult;
