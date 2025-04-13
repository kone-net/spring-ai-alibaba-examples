package com.alibaba.cloud.ai.toolcall.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lark-suite")
public class LarkSuiteController {

    private final ChatClient dashScopeChatClient;

    public LarkSuiteController(ChatClient.Builder chatClientBuilder) {
        this.dashScopeChatClient = chatClientBuilder.build();
    }

    @GetMapping("/chat-tool-function")
    public String chatTranslateFunction(@RequestParam(value = "query", defaultValue = "发送飞书消息给ou_1418b1b8f291d4e0d06653a7719c0ae3，msg_type为text，内容为json对象，text:hello，receive_id_type为open_id") String query) {
        return dashScopeChatClient.prompt(query).tools("larksuiteChatFunction").call().content();
    }

}
