import axios from 'axios';
import { readConfigUtil, getApiKey } from '../utils/config-util.js';
import { readChatUtil, saveChatUtil } from '../utils/chat-util.js';
import { GptCompletionRequest, GptMessage } from '../models/GptCompletion.js';

const API_URL = "https://api.openai.com/v1/chat/completions";
const LINE_WIDTH = 50;
const MAX_LINES = 100;

const chatMessageTemplate = {
    "role": "user",
    "content": ""
}

const getGptApiResponse = async (body: GptCompletionRequest, headers: object): Promise<GptMessage> => {
    const response = await axios({
        method: 'post',
        url: API_URL,
        data: body,
        headers: headers
    })
    console.log(`Status: ${response.status}`);
    console.log(`Data: ${JSON.stringify(response.data)}`);
    return response.data.choices[0].message
    // return Promise.resolve({"role":"assistant","content":"Sure! Here's an easy recipe for scrambled eggs with a twist.\n\nIngredients:\n• 3 large eggs\n• Salt and pepper to taste\n• 1 tablespoon of butter\n• ¼ cup of shredded cheese (optional)\n• 2 tablespoons of milk (optional)\n\nSteps:\n1. Crack the eggs into a bowl.\n2. Add a pinch of salt and pepper.\n3. Beat the eggs with a fork until the yolks and whites are fully combined.\n4. Heat a non-stick frying pan over medium heat.\n5. Add the butter to the pan. Once the butter is melted, pour in the eggs.\n6. Let the eggs cook for a bit until they start to set around the edges, about 1 to 2 minutes.\n7. Begin to stir the eggs with a spatula, pushing them from one side of the pan to the other.\n8. Continue to cook by stirring every once in a while, for about 2 to 3 more minutes.\n9. When the eggs are mostly cooked but still look a bit runny, add the shredded cheese and milk if you're using them. Stir just until the cheese is melted and the milk is incorporated. The eggs should be slightly creamy.\n10. Immediately remove from heat. Don't overcook - the eggs will continue to cook from the residual heat so they should be slightly underdone when you turn off the heat.\n11. Taste and add more salt and pepper if necessary.\n12. Serve immediately.\n\nYou can serve it with a piece of toast or slice up some fresh fruits to go with it. Enjoy!"})
}

export async function askGpt(args: any) {

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
    console.log(`Request: ${JSON.stringify(body)}`);

    const headers: object = {
        "Authorization": `Bearer ${getApiKey()}`
    }

    // Http request to GPT API
    const message = await getGptApiResponse(body, headers);

    // Display message
    console.log(message.content);

    // Save Question and response in the current chat
    chat.messages.push(message)

    saveChatUtil(conf.currentChat, JSON.stringify(chat));
    
}

