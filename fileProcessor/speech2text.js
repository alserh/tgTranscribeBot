const vosk = require('vosk');
const fs = require('fs');
const { Readable } = require('stream');

const model = new vosk.Model('./res/vosk-model-small-ru-0.22'); // Download models from https://alphacephei.com/vosk/models


function speechToText(speechFile) {
    return new Promise((res, rej) => {
        const audioStream = fs.createReadStream(speechFile);
        const readable = new Readable().wrap(audioStream);
        const recognizer = new vosk.Recognizer({ model: model, sampleRate: 16000 });

        let transcription = '';

        readable.on('data', (chunk) => {
            if (recognizer.acceptWaveform(chunk)) {
                transcription += recognizer.result().text;
            }
        });

        readable.on('end', () => {
            transcription += recognizer.finalResult().text;
            recognizer.free();
            res(transcription.trim());
        });

        readable.on('error', (err) => {
            recognizer.free();
            rej(err);
        });
    }
    )
}

// speechToText('./downloads/file_77.wav').then((result) => console.log(result, result, result))

module.exports = { speechToText }









