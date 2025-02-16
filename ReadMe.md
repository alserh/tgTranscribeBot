# tgT: transcribe voice messages 
This project is designed based on [another project of mine](https://github.com/alserh/tg2slack/tree/withApi) and the need to avoid listening to voice messages. Essentially at the moment it does only that. 

---
### Installation: 

##### As we're using external means of speech->text conversion the project requires couple of local dependancies: 
1. [Language model](https://alphacephei.com/vosk/models/vosk-model-small-ru-0.22.zip) (archive content put inside `prjectFolder/res/`)
2. [FFMPEG codec](https://ffmpeg.org/download.html)

With these installed locally feel free to 

```
npm install
```
---
### Usage
You will require to set up an `.env` file with the following parameters:

- Port 
	 - INBOUND_PORT = 3000	
- TELEGRAM bot:
	-  TG_API_TOKEN=`YOUR_BOT_TOKEN_HERE`
	- TG_URL='https://api.telegram.org'

---
### TODO
- I accept feature requests
- Videos transcription (circles) 
- fix multiple replies to same file 
- fix empty (silent) tracks
- fix issue with vanishing tg voice messages (no file on reply case) 
- handle "trashy" messages
- clear code / rearrange functions in a better fasion