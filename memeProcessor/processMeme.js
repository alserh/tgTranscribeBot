const { tgSendPhoto } = require("../tgBot/tgEndpointLib");
const { randomMeme } = require("./randomMeme")

async function processMeme(tgMessage){
    const from = tgMessage.from;
    const chat = tgMessage.chat;
    await tgSendPhoto(randomMeme(), chat.id ?? from.id)
}

module.exports = { processMeme }