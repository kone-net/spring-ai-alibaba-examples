import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token, css }) => {
  return {
    container: css`
      display: flex;
      height: calc(100vh - 116px);
      padding: 48px 12px 12px;
      background: ${token.colorBgLayout};
    `,
    leftPanel: css`
      width: 33%;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding-right: 16px;
    `,
    rightPanel: css`
      width: 67%;
      height: 100%;
      padding-left: 16px;
    `,
    card: css`
      background: ${token.colorBgContainer};
      border-radius: ${token.borderRadiusLG}px;
      box-shadow: ${token.boxShadow};
      overflow: auto;
    `,
    codeInfoPanel: css`
      height: 70%;
      margin-bottom: 16px;
      padding: 16px;
      display: flex;
      flex-direction: column;
    `,
    senderWrapper: css`
      background: ${token.colorBgContainer};
      border-radius: ${token.borderRadiusLG}px;
      box-shadow: ${token.boxShadow};
      background-color: "red";
      padding: 16px;
      display: flex;
      flex-direction: column;
      margin-top: auto;
    `,
    sender: css`
      width: 100%;
    `,
    resultPanel: css`
      height: calc(100% - 16px);
      padding: 0 16px 16px;
      display: flex;
      flex-direction: column;
    `,
    panelTitle: css`
      font-size: 16px;
      font-weight: 500;
      color: ${token.colorTextHeading};
      margin-bottom: 16px;
    `,
    messageForm: css`
      display: flex;
      flex-direction: column;
      height: calc(100% - 32px);
    `,
    messageInput: css`
      flex-grow: 1;
      margin-bottom: 12px;
      border-radius: ${token.borderRadius}px;
      border: 1px solid ${token.colorBorder};
      padding: 12px;
      resize: none;
      font-size: 14px;
      outline: none;

      &:focus {
        border-color: ${token.colorPrimary};
        box-shadow: 0 0 0 2px ${token.colorPrimaryBg};
      }
    `,
    sendButton: css`
      height: 40px;
      background: ${token.colorPrimary};
      color: white;
      font-size: 14px;
      border: none;
      border-radius: ${token.borderRadius}px;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background: ${token.colorPrimaryHover};
      }

      &:disabled {
        background: ${token.colorBgContainerDisabled};
        color: ${token.colorTextDisabled};
        cursor: not-allowed;
      }
    `,
    messagesContainer: css`
      display: flex;
      flex-direction: column;
      gap: 12px;
    `,
    emptyMessages: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: ${token.colorTextSecondary};
      font-size: 14px;
    `,
    userMessage: css`
      align-self: flex-end;
      max-width: 80%;
      background: ${token.colorPrimaryBg};
      border-radius: ${token.borderRadiusLG}px;
      padding: 12px;
    `,
    botMessage: css`
      align-self: flex-start;
      max-width: 80%;
      background: ${token.colorBgLayout};
      border-radius: ${token.borderRadiusLG}px;
      padding: 12px;
    `,
    messageSender: css`
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 6px;
      color: ${token.colorTextSecondary};
    `,
    messageText: css`
      font-size: 14px;
      white-space: pre-wrap;
      word-break: break-word;
    `,
    messageTime: css`
      font-size: 12px;
      color: ${token.colorTextDescription};
      margin-top: 4px;
    `,

    /* CodeInfo 组件样式 */
    codeInfoContainer: css`
      margin-bottom: 20px;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: auto;
    `,
    codeInfoBody: css`
      flex: 1;
      overflow: auto;
      padding: 16px 24px;
    `,
    codeInfoIntro: css`
      font-size: 14px;
      margin-bottom: 16px;
    `,
    codeInfoSteps: css`
      margin-top: 20px;
    `,
    codeInfoStepItem: css`
      margin-bottom: 24px;
    `,
    codeInfoStepTitle: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-bottom: 8px;
    `,
    codeInfoTitleText: css`
      font-weight: 500;
      margin-right: 8px;
    `,
    codeInfoIcon: css`
      font-size: 16px;
      margin-left: 8px;
      color: ${token.colorPrimary};
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transform: scale(1.2);
        color: ${token.colorPrimaryActive};
      }
    `,
    codeInfoStepDesc: css`
      font-size: 14px;
      margin-top: 4px;
    `,
    codePreview: css`
      background-color: #f5f5f5;
      padding: 14px;
      border-radius: 8px;
      font-family: "SF Mono", "Monaco", "Menlo", "Consolas", monospace;
      font-size: 13px;
      white-space: pre-wrap;
      overflow-x: auto;
      max-height: 600px;
      overflow-y: auto;
      line-height: 1.5;
      color: #333;
      border: 1px solid #e8e8e8;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    `,
    codeInfoTabs: css`
      width: 100%;
      .ant-tabs-nav {
        margin-bottom: 20px;
      }
    `,
    documentationContainer: css`
      font-size: 14px;
      line-height: 1.6;
      padding: 4px 0;

      h4 {
        margin-top: 24px;
        margin-bottom: 12px;
        font-weight: 600;
        color: ${token.colorTextHeading};
      }

      h4:first-child {
        margin-top: 0;
      }

      ul {
        padding-left: 20px;
        margin: 12px 0;
      }

      li {
        margin-bottom: 8px;
      }

      code {
        background: ${token.colorFillTertiary};
        padding: 2px 4px;
        border-radius: 4px;
        font-family: "SF Mono", "Monaco", "Menlo", "Consolas", monospace;
        font-size: 0.9em;
      }
    `,
  };
});
