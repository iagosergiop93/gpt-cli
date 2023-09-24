import { exec } from 'node:child_process';
import path from 'node:path';

export function listChatsUtil() {
    return new Promise((resolve,reject) => {
        exec(`ls ${path.resolve('bin/chats/')}`, (err, stdout,stderr) => {
            const chats = stdout.split('\n');
            resolve(chats);
        });
    });
}