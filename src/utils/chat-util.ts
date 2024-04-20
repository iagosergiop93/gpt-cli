import fs from 'node:fs';
import path from 'node:path';

export function listChatsUtil(): Promise<Array<string>> {
    return new Promise((resolve,reject) => {
        fs.readdir(`${path.resolve('bin/chats/')}`, (err, files) => {
            resolve(files);
        })
    });
}

export function readChatUtil(chatName: string) {
    const chat = fs.readFileSync(path.resolve(`bin/chats/${chatName}.json`), {
        encoding: 'utf-8',
        flag: 'r'
    })
    return JSON.parse(chat);
}

export function saveChatUtil(chatName: string, chat: string) {
    fs.writeFileSync(path.resolve(`bin/chats/${chatName}.json`), chat, {
        encoding: 'utf-8',
        flag: 'w'
    })
}
