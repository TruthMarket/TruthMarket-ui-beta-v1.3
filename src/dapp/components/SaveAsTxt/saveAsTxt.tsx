import React from 'react';

interface SaveJsonAsTxtProps {
    jsonData: object;
    fileName: string;
}

const SaveJsonAsTxt: React.FC<SaveJsonAsTxtProps> = ({ jsonData, fileName }) => {
    const saveJsonToTxt = () => {
        const jsonString = JSON.stringify(jsonData);
        const blob = new Blob([jsonString], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <button onClick={saveJsonToTxt}>Save TXT</button>
    );
};

export default SaveJsonAsTxt;