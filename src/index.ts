#! /usr/bin/env node

import yargs from 'yargs/yargs';
import { listModels } from './commands/list-models.js';
import { setModel } from './commands/set-model.js';
import { createNewChat } from './commands/new-chat.js';
import { listChats } from './commands/list-chats.js';
import { setChat } from './commands/set-chat.js';
import { askGpt } from './commands/ask.js'

const argv = yargs(process.argv.slice(2))
    .env('GPT')
    .usage('Command line tool to interact with chat-gpt models from terminal')
    .option('l', { alias: 'test', describe: 'Testing the options' })
    .command(['list-models','lm'], 'List all available models that can be used', () => {}, listModels)
    .command(['set-model','sm'], 'Set the desired model to use', setModel)
    .command(['list-chats','lc'], 'List all saved chats', listChats)
    .command(['set-chat', 'sc'], 'Set a chat to use for context', () => {}, setChat)
    .command(['new-chat','nc'], 'Set an empty chat as context', () => {}, createNewChat)
    .command('delete-chat', 'Delete a chat', () => {}, (args) => {
        
    })
    .command('ask', 'Interact with Chat-GPT', () => {}, askGpt)
    .command('test', 'prints args', () => {}, (args) => {
        console.log(args);
    })
    .argv;


