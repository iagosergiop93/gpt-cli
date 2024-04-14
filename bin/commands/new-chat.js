import { readConfigUtil, writeConfigUtil, createNewChatFile } from '../utils/config-util.js';
import { listChatsUtil } from '../utils/chat-util.js';
import { 
    uniqueNamesGenerator,
    adjectives,
    animals,
    colors
} from 'unique-names-generator';

const chatTemplate = {
    "messages": []
}

export function createNewChat(args) {
    const conf = readConfigUtil();
    const newChatName = uniqueNamesGenerator({
        dictionaries: [colors, adjectives, animals]
    }).replace(' ','_');
    createNewChatFile(newChatName, JSON.stringify(chatTemplate))
    conf['currentChat'] = newChatName;
    writeConfigUtil(JSON.stringify(conf));
    console.log(`Created new chat ${newChatName}`);
    listChatsUtil();
}

