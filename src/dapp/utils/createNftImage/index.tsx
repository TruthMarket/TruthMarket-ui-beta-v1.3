interface ImageResult {
    dataUrl: string;
    file: File;
}

// interface TextConfig {
//     font: string;
//     size: number;
//     y: number;
// }

import fonts from '@assets/font/STSONG.ttf'

const textY = [420,500,741,787,875,918] // 
const fontSize = [36,30,30,30,24,24] // 

const loadFont = async () => {
    try {
        // Create a new style element
        const style = document.createElement('style');
        style.textContent = `
            @font-face {
                font-family: 'STSong';
                src: url('${fonts}') format('truetype');
                font-weight: normal;
                font-style: normal;
            }
        `;
        document.head.appendChild(style);

        // create and load font
        const fontFace = new FontFace('STSong', `url(${fonts})`);
        const loadedFont = await fontFace.load();
        document.fonts.add(loadedFont);

        // wait the font load completed
        await document.fonts.ready;

        // check 
        const testDiv = document.createElement('div');
        testDiv.style.fontFamily = 'STSong';
        testDiv.style.visibility = 'hidden';
        testDiv.textContent = 'Test font';
        document.body.appendChild(testDiv);
        
        // Make sure the font be used
        await new Promise(resolve => setTimeout(resolve, 100));
        
        document.body.removeChild(testDiv);
        return true;
    } catch (error) {
        console.error('The font loaded faile:', error);
        return false;
    }
};

const CreateNftImage = (
    obj: Record<string, any>,
    name: string,
    nftBackground: string | HTMLImageElement,
    quality = 0.8
): Promise<ImageResult> => {
    return new Promise(async (resolve, reject) => {
        try {
            // Load the font first and wait for completion
            await loadFont();
            
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Can`t create canvas context');

            // Set the canvas size is 1080x1080
            canvas.width = 1080;
            canvas.height = 1080;

            // Loading the background image
            const backgroundImage = new Image();
            backgroundImage.crossOrigin = 'anonymous';
            backgroundImage.src = typeof nftBackground === 'string' ? nftBackground : nftBackground.src;

            backgroundImage.onload = () => {
                try {
                    // Check if the image is square
                    if (backgroundImage.width !== backgroundImage.height) {
                        throw new Error('The background image must be a square!');
                    }

                    // Draw the background image
                    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

                    // Set the base font styles
                    ctx.fillStyle = '#FFFFFF';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    // -----
                    const isEnglishChar = (char: string): boolean => {
                        return /[a-zA-Z]/.test(char);
                    };

                    // Improved text wrapping function
                    const wrapText = (text: string, maxWidth: number): string[] => {
                        const lines: string[] = [];
                        let currentLine = '';
                        let currentWord = '';
                        let isInEnglishWord = false;

                        for (let i = 0; i < text.length; i++) {
                            const char = text[i];
                            
                            // Processing English Words
                            if (isEnglishChar(char)) {
                                currentWord += char;
                                isInEnglishWord = true;
                                
                                // If it is the last character, the remaining words need to be processed
                                if (i === text.length - 1) {
                                    const testLine = currentLine + currentWord;
                                    if (ctx.measureText(testLine).width <= maxWidth) {
                                        currentLine = testLine;
                                    } else {
                                        if (currentLine) lines.push(currentLine);
                                        currentLine = currentWord;
                                    }
                                }
                                continue;
                            }
                            
                            // End of English word (encountering spaces or punctuation)
                            if (isInEnglishWord) {
                                const testLine = currentLine + currentWord + char;
                                if (ctx.measureText(testLine).width <= maxWidth) {
                                    currentLine = testLine;
                                } else {
                                    if (currentLine) lines.push(currentLine);
                                    currentLine = currentWord + char;
                                }
                                currentWord = '';
                                isInEnglishWord = false;
                                continue;
                            }

                            // Processing Chinese characters
                            const testLine = currentLine + char;
                            if (ctx.measureText(testLine).width <= maxWidth) {
                                currentLine = testLine;
                            } else {
                                if (currentLine) lines.push(currentLine);
                                currentLine = char;
                            }
                        }

                        // Add the last line
                        if (currentLine) {
                            lines.push(currentLine);
                        }

                        return lines;
                    };

                    // Draw the values
                    Object.values(obj).forEach((value, index) => {
                        // Setting
                        const currentFontSize = fontSize[index];
                        // Use complete font declaration
                        ctx.font = `normal ${currentFontSize}px STSong, "华文宋体", SimSun`;
                        
                        const text = String(value);
                        const lines = wrapText(text, 700);
                        
                        // Calculate the line height of the current text
                        const lineHeight = currentFontSize * 1.8;
                        let currentY = textY[index];

                        // Draw multiple lines of text
                        lines.forEach((line) => {
                            ctx.fillText(line, canvas.width / 2, currentY);
                            currentY += lineHeight;
                        });
                    });

                    // Generate DataURL in JPEG format
                    const dataUrl = canvas.toDataURL('image/jpeg', quality);

                    // Create new file
                    const blobBin = atob(dataUrl.split(',')[1]);
                    const array = [];
                    for(let i = 0; i < blobBin.length; i++) {
                        array.push(blobBin.charCodeAt(i));
                    }
                    const file = new File([new Uint8Array(array)], `${name}.jpg`, {type: 'image/jpeg'});

                    resolve({ dataUrl, file });
                } catch (error) {
                    reject(error);
                }
            };

            backgroundImage.onerror = () => {
                reject(new Error('The background image loaded faile!'));
            };
        } catch (error) {
            reject(error);
        }
    });
};

export default CreateNftImage;