import { listAvailableModels } from '../utils/list-models-util.js';
import { readConfigUtil } from '../utils/config-util.js';

export function listModels(args) {
    const modelsArray = listAvailableModels();
    const conf = readConfigUtil();
    modelsArray.forEach(model => {
        const line = model === conf.model ? `  * ${model}` : `    ${model}`;
        console.log(line);
    })
}
