import fs from 'node:fs';
import path from 'node:path';

export function readChatUtil(chatName) {
    const chat = fs.readFileSync(path.resolve(`bin/chats/${chatName}`), {
        encoding: 'utf-8',
        flag: 'r'
    })

    return JSON.parse(chat);
} 