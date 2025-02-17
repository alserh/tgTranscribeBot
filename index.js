const express = require("express");
const bodyParser = require("body-parser");
// const querystring = require("querystring");
const { tgRequestBodyProcessor } = require("./tgBot/tgRequestBodyProcessor");
// const { tgPostMessage } = require("./tgBot/tgEndpointLib");
const { tgFileOperator } = require("./fileProcessor/tgFileOperator");
const { processMeme } = require("./memeProcessor/processMeme")

const app = express();
const port = process.env.INBOUND_PORT;
// const tgChatId = process.env.TG_TEST_GROUP;


// Used instead default to accomodate Slack token verification
app.use(bodyParser.raw({ type: "*/*" }));


// GET endpoints
app.get("/", (req, res) => {
    console.log('got ping')
    res.json({ status: 200, message: "OK" });
});

// POST endpoints

app.post("/telegram", async (req, res) => {
    const dataBody = req.body.toString();
    const parsedBody = JSON.parse(dataBody);
    try {
        const tgMessage = tgRequestBodyProcessor(parsedBody);
        // console.log(tgMessage)
        // Array to hold all asynchronous operations
        const operations = [];

        if (tgMessage?.entities?.some(item => item.type === 'bot_command')) {
            switch (tgMessage.text.split('@')[0]) {
                case '/trans':
                    operations.push(tgFileOperator(tgMessage))
                    break
                case '/mem_suda':
                    operations.push(processMeme(tgMessage))
                    break
                default:
                    break;
            }
        }

        await Promise.all(operations);

        res.json({ status: 200, result: "All operations processed successfully" });

    } catch (e) {
        console.error("Error processing request:", e.message);
        res.status(500).json({ status: 500, result: e.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});