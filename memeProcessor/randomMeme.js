const memesDb = require('../db/db_memes')

function randomMeme(){
    return memesDb[Math.floor(Math.random() * memesDb.length)]
}

module.exports = { randomMeme }