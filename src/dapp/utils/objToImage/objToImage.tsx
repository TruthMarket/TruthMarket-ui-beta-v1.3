interface ImageResult {
    dataUrl: string;
    file: File;
}

const createObjectImage = (
    obj: Record<string, any>,
    name: string,
    quality = 0.8 // 图片质量
): ImageResult => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Can`t create canvas context');

    // 添加标题相关设置
    const title = "Truth Market";
    const titleFontSize = 24;
    ctx.font = `bold ${titleFontSize}px Adobe 宋体 Std L`;
    const titleWidth = ctx.measureText(title).width;
    const titleHeight = titleFontSize * 1.5;

    ctx.font = '15px Adobe 宋体 Std L';
    const lineHeight = 23;
    const lineHeight2 = 30;
    const paddingX = 25;
    const paddingY = paddingX * 1.5;

    // 默认尺寸
    let minWidth = 300;
    let minHeight = 350;
    let totalHeight =0;
    let maxLineWidth =0;
    let isOk=true;
    // 判断尺寸，如果不符合就增加
    while (isOk) {
        maxLineWidth = minWidth - 2 * paddingX;
        // 计算所需的高度
        let totalHeight = paddingY;
        for (const [key, value] of Object.entries(obj)) {
            const text = `${key}: ${value}`;
            const lines = getLines(ctx, text, maxLineWidth);
            totalHeight += lines.length * lineHeight + (lineHeight2 - lineHeight);
        }
        totalHeight += titleHeight + paddingY;

        if (totalHeight>minHeight){
            minWidth += 30;
            minHeight += 35;
        }else{
            isOk=false;
        }
    }

    // 设置画布尺寸
    canvas.width = Math.max(minWidth, titleWidth + 2 * paddingX);
    canvas.height = Math.max(minHeight, totalHeight);

    // 绘制背景和文本
    ctx.fillStyle = '#20222B'; // 深色背景
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制标题
    ctx.font = `bold ${titleFontSize}px Adobe 宋体 Std L`;
    ctx.fillStyle = '#CCD7DD';
    ctx.textAlign = 'center';
    ctx.fillText(title, canvas.width / 2, paddingY + titleFontSize);

    ctx.font = '15px Adobe 宋体 Std L';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#CCD7DD'; // 浅灰色字体

    let y = paddingY + titleHeight + paddingY;
    for (const [key, value] of Object.entries(obj)) {
        const text = `${key}: ${value}`;
        const lines = getLines(ctx, text, maxLineWidth);
        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], paddingX, y);
            y += (i === lines.length - 1) ? lineHeight2 : lineHeight;
        }
    }

    // 生成JPEG格式的DataURL
    const dataUrl = canvas.toDataURL('image/jpeg', quality);

    // 创建File对象
    const blobBin = atob(dataUrl.split(',')[1]);
    const array = [];
    for(let i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
    }
    const file = new File([new Uint8Array(array)], `${name}.jpg`, {type: 'image/jpeg'});

    return { dataUrl, file };
};

// 修改后的getLines函数
function getLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
    const words = text.split('');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const char = words[i];
        const width = ctx.measureText(currentLine + char).width;
        if (width < maxWidth) {
            currentLine += char;
        } else {
            lines.push(currentLine);
            currentLine = char;
        }
    }
    lines.push(currentLine);
    return lines;
}

export default createObjectImage;