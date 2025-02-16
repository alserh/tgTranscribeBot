function tgRequestBodyProcessor(body) {
    console.log(body)
    if(body.message || body.edited_message){
        const isEdited = body.edited_message != null;
        const m = body.message ?? body.edited_message;
        const entities = body.message.entities ?? [] 
        const chat = m.chat ?? []
        // console.log(m);
        // if(m === undefined) throw new Error("No message in telegram response!");
        const text = m.text ?? m.caption;
        // const file = m.photo !== undefined
            // ? m.photo[m.photo.length - 1]
    
        const file = m.photo?.at(-1) ?? m.video ?? m.audio ?? m.document ?? m.sticker ?? m.animation ?? m.voice ?? m.video_note ?? m.reply_to_message?.voice;
    
        if (m == null) {
            throw new Error(`Unsupported message type from Telegram: check type\n ${JSON.stringify(body)}`);
        }
    
        return {
            "chat": chat,
            "from": m.from,
            "text": text,
            "file": file,
            "edited": isEdited,
            "entities": entities
        };
    }
}

module.exports = { tgRequestBodyProcessor };