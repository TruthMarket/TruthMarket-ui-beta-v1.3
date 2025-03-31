import React,{ 
    // createContext,
    useContext, 
    useState,
    ReactNode,
} from 'react';
// import { useCreateFileState } from '../useState/createFileState';
// import { useCreateImageState } from '../useState/createImageState';
// import { ReactNode } from 'react';
import { UploadFile } from 'antd/lib/upload/interface'; // Assuming this import is needed for UploadFile

interface ContextType {
    fileList: UploadFile<any>[];
    updateFileList: (newFileList: UploadFile[]) => void;

    imageFile: UploadFile<any>[];
    updateImage: (newFileList: UploadFile[]) => void;
}

export let fileImageState = {
    fileList: [] as UploadFile<any>[],
    imageFile: [] as UploadFile<any>[],
};

const Context = React.createContext<ContextType | null>(null);

export const FileImageProvider = ({ children }: { children: ReactNode }) => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const updateFileList = (newFileList: UploadFile[]) => {
        setFileList(newFileList);
        fileImageState.fileList = newFileList;
    };

    const [imageFile, setImage] = useState<UploadFile[]>([]);

    const updateImage = (newFileList: UploadFile[]) => {
        setImage(newFileList);
        fileImageState.imageFile = newFileList;
    };

    return (
        <Context.Provider value={{fileList,updateFileList,imageFile,updateImage}}>
            {children}
        </Context.Provider>
    );
};

export const useFileImageContext = () => useContext(Context);



// export const useState_fileImage = () => {
//     const [fileList, setFileList] = useState<UploadFile[]>([]);
//     const [imageFile, setImage] = useState<UploadFile[]>([]);

//     const updateFileList = (newFileList: UploadFile[]) => {
//         setFileList(newFileList);
//         fileImageState.fileList = newFileList;
//     };

//     const updateImage = (newFileList: UploadFile[]) => {
//         setImage(newFileList);
//         fileImageState.imageFile = newFileList;
//     };

//     return { fileList, updateFileList, imageFile, updateImage };
// };
