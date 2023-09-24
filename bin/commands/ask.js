import axios from 'axios';
import { readConfigUtil } from '../utils/config-util.js';
import { readChatUtil } from '../utils/read-chat.js';

const API_URL = "https://api.openai.com/v1/chat/completions";

const chatMessageTemplate = {
    "role": "user",
    "content": ""
}

const getGptApiResponse = (body, headers) => {
    return axios({
        method: 'post',
        url: API_URL,
        data: body,
        headers: headers
    })
}

export async function askGpt(args) {

    // Identify model and current chat from config
    const conf = readConfigUtil();

    // Get Chat context
    const chat = readChatUtil(conf.currentChat);
    console.log(chat)
    // Add question to chat
    const newMsg = Object.assign({}, chatMessageTemplate);
    newMsg.content = args._[1];
    chat.messages.push(newMsg);

    // Prepare request body
    const body = {
        model: conf.model,
        messages: chat.messages
    }

    const headers = {
        "Authorization": `Bearer ${args.openApiKey}`
    }

    // Http request to GPT API
    
    getGptApiResponse(body, headers).then(response => {
        console.log(`Status: ${response.status}`);
        console.log(`Data: ${response.data}`);
    }).catch(error => {
        console.log('In catch block')
        console.log(error.response.data);
    })

    // Save Question and response in the current chat

}
