import { listChatsUtil } from '../utils/chat-util.js';
import { readConfigUtil } from '../utils/config-util.js';
import { writeFileSync } from 'node:fs';
import path from 'node:path';

async function validateInput(args) {
    if(!args.c) throw new Error('Missing chat in input. Use flag -c to specify the model');
    const availableChats = await listChatsUtil();
    const inputModel = args.c;
    if(availableChats.filter(model => model === inputModel).length === 0) {
        throw new Error(`The chat ${inputModel} is not available`);
    }
}

export async function setChat(args) {
    await validateInput(args);
    const conf = readConfigUtil();
    conf.currentChat = args.c;
    writeFileSync(path.resolve('bin/config/config.json'), JSON.stringify(conf), {
        encoding: 'utf-8',
        flag: 'w'
    });
    console.log(`${args.c} was set`);
}