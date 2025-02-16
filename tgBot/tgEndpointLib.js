const { tgSendRequest } = require("./tgSendRequest");

module.exports = {
    async getMe() {
        let res = await tgSendRequest("getMe");
        return res;
    },

    async tgPostMessage(messageText, chat_id) {
        try {
            let headers = {
                "content-type": "application/json"
            };
            let body = {
                "chat_id": chat_id,
                "text": messageText
            };
            let res = await tgSendRequest("sendMessage", "POST", headers, body);
            return res;
        } catch (e) {
            console.error(`Error sending text message: ${e}`);
        }
    },

    async getFile(file) {
        const request = "getFile?file_id=" + file.file_id;
        let res = await tgSendRequest(request);
        console.log(res);
        return res;
    },

    async setWebhook(url, secret_token = null) {
        let headers = {
            "content-type": "application/json"
        };
        let body = {
            "url": url,
            "secret_token": secret_token
        };
        let res = await tgSendRequest("setWebhook", "POST", headers, body);
        console.log(res);
        return res;
    },

    async getWebhookInfo() {
        let res = await tgSendRequest("getWebhookInfo");
        console.log(res);
        return res;
    }
};