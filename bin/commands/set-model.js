import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { listAvailableModels } from '../utils/list-models-util.js';
import { readConfigUtil } from '../utils/config-util.js';

function validateInput(args) {
    if(!args.m) throw new Error('Missing model in input. Use flag -m to specify the model');
    // const availableModels = listAvailableModels();
    // const inputModel = args.m;
    // if(availableModels.filter(model => model === inputModel).length === 0) {
    //     throw new Error(`The Model ${inputModel} is not available`);
    // }
}

export function setModel(args) {
    try {
        validateInput(args)
    } catch (error) {
        console.error(error.message);
        return 1;
    }
    const conf = readConfigUtil();    
    const model = args.m;
    
    conf.model = model;
    writeFileSync(path.resolve('bin/config/config.json'), JSON.stringify(conf), {
        encoding: 'utf-8',
        flag: 'w'
    });
    console.log(`${model} was set`)
}

