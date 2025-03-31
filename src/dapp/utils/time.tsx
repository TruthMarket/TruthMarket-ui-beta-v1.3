// import { useCallback } from 'react';
// import { useJsonContext } from '../../provider/JsonProvider';



export const AddTime = () => {
    // const { updateJsonState } = useJsonContext() || {};

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    };

    const dateTime = () => {
        try {
            const date = formatDate(new Date());
            if (date) {
                console.log('create date:', date);
                return date;
            } else {
                console.error('date is empty!');
            }
        } catch (error) {
            console.error('Add date error:', error);
            throw error;
        }

    }

    return dateTime;
}

export const timeToDate = (time: number) => {
    // const { updateJsonState } = useJsonContext() || {};

    const formatDate = (time: number): string => {
        const milliseconds = time >= 1e10 ? time : time * 1000;

        const date = new Date(milliseconds);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    };

    const date = formatDate(time);
    
    return date;

}
