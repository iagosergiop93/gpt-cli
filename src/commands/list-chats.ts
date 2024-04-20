import { listChatsUtil } from '../utils/chat-util.js';
import { readConfigUtil } from '../utils/config-util.js';

export async function listChats(args: any) {
    const chats: Array<string> = await listChatsUtil();
    const currentChat: string = readConfigUtil()['currentChat'];
    console.log('\nChats available: ');
    chats.forEach(chat => {
        if(chat.match(currentChat)) console.log(`  * ${chat}`);
        else console.log(`    ${chat}`);
    })
    return chats;
}