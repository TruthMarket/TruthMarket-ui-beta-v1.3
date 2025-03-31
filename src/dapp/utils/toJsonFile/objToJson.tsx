import fs from 'fs';
import path from 'path';

import { JsonState } from '../../pages/Create/useState/stateType';


export function objToJson(state: JsonState, name:string): File| null {
    // 1. 将对象转换为 JSON 字符串
    const json = JSON.stringify(state, null, 2);

    // 将状态转换为 JSON 字符串
    const jsonBlob = new Blob([json], { type: 'application/json' });

    const jsonFile = new File([jsonBlob], `${name}.json`, { type: 'application/json' });

    return jsonFile;
}

// 可选：如果需要将 JSON 保存到文件
export function saveJsonToFile(jsonData: string, outputFile: string): void {
    const outputPath = path.resolve(outputFile);
    fs.writeFileSync(outputPath, jsonData);
    console.log(`数据已成功保存到 ${outputFile}`);
}
