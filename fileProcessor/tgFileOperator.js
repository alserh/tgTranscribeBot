const { getFile, tgPostMessage } = require("../tgBot/tgEndpointLib");
const { downloadFile } = require("./fileDownload");
const { unlink } = require("node:fs/promises");
const { ogaToWav } = require("./ffFileConverter.js")
const { speechToText } = require("./speech2text.js")
require("../tgBot/tgEndpointLib.js")
require("dotenv").config();

const tgToken = process.env.TG_API_TOKEN;

async function tgFileOperator(tgMessage) {
    try {
        const file = await getFile(tgMessage.file);
        const from = tgMessage.from;
        const chat = tgMessage.chat;
        const path = file.result.file_path;
        const fileName = path.split("/").pop();
        // const fileSize = file.result.file_size;
        const downloadUrl = `https://api.telegram.org/file/bot${tgToken}/${path}`;
        const downloadPath = `./downloads/${fileName}`;
        const wavFile = `./downloads/${fileName.split('.')[0] + '.wav'}`;
        let message = ''

        await downloadFile(downloadUrl, fileName);
        await ogaToWav(downloadPath);
        await speechToText(wavFile).then((result) => message += result)
        //make a fallback for empty (bad, silent) file
        await tgPostMessage(message, chat.id ?? from.id)
        //send text here (temp)
        await unlink(downloadPath);
        await unlink(wavFile);

    } catch (e) {
        console.error("Error processing file message:", e.message + " \n" + e);
    }
}


// tgFileOperator({
//     from: {
//       id: 313318542,
//       is_bot: false,
//       first_name: 'Alex S',
//       username: 'alex1serheyuk',
//       language_code: 'en'
//     },
//     text: '/trans',
//     file: {
//       duration: 6,
//       mime_type: 'audio/ogg',
//       file_id: 'AwACAgIAAxkBAAICJGewm_sYXDxscywsxpZp6iSWhZj8AAKnbAACzrCBSXg_X0l2VoTBNgQ',
//       file_unique_id: 'AgADp2wAAs6wgUk',
//       file_size: 25632
//     },
//     edited: false,
//     entities: [ { offset: 0, length: 6, type: 'bot_command' } ]
// })


module.exports = { tgFileOperator };