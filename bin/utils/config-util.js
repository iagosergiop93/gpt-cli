import fs from 'node:fs';
import path from 'node:path';

export function readConfigUtil() {
    const confString = fs.readFileSync(path.resolve('bin/config/config.json'), {
        encoding: 'utf-8',
        flag: 'r'
    });

    return JSON.parse(confString);
}

export function writeConfigUtil(content) {
    fs.writeFileSync(path.resolve('bin/config/config.json'), content, {
        encoding: 'utf-8',
        flag: 'w'
    })
}

export function createNewChatFile(filename, content) {
    fs.writeFileSync(path.resolve(`bin/chats/${filename}.json`), content, {
        encoding: 'utf-8',
        flag: 'w'
    })
}
