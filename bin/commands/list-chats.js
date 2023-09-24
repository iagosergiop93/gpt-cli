import { listChatsUtil } from '../utils/list-chats-util.js';
import { readConfigUtil } from '../utils/config-util.js';

export async function listChats(args) {
    const chats = await listChatsUtil();
    const currentChat = readConfigUtil()['currentChat'];
    console.log('\nChats available: ');
    chats.forEach(chat => {
        if(chat.match(currentChat)) console.log(`  * ${chat}`);
        else console.log(`    ${chat}`);
    })
    return chats;
}