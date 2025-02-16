const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

// const inputFile = path.resolve('./downloads', 'file_74.oga');

function ogaToWav(inputFile) {
    return new Promise((res, rej) => {
        ffmpeg(inputFile)
        .audioFrequency(16000) 
        .audioChannels(1)      
        .format('wav')         
        .on('end', () => {
            // console.log('Conversion finished!');
            res('.' + inputFile.split('.')[1] + '.wav');
        })
        .on('error', (err) => {
            console.error('CONVERSION: Error during conversion:', err);
            rej(err);
        })
        .save('.' + inputFile.split('.')[1] + '.wav');
        }
    )
}


// ogaToWav(inputFile)

module.exports = { ogaToWav }