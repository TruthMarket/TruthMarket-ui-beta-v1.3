import { saveAs } from 'file-saver';

export const objectToTxtFile = (obj: Record<string, any>, name:string): File => {
    // 将对象转换为字符串
    const content = Object.entries(obj)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

    // 创建当前日期作为文件名
    const fileName = `${name}_${new Date().toISOString().split('T')[0]}.txt`;

    // 创建Blob对象
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });

    // 创建File对象
    const file = new File([blob], fileName, { type: 'text/plain' });

    // 使用file-saver库保存文件
    saveAs(file);

    return file;
};
