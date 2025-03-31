import React from 'react';
// import type { GetProp, UploadFile, UploadProps } from 'antd';
// import { useCreateFileState } from '../../useState/CreateFileState';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { 
    Upload, 
    // ConfigProvider, 
    Space 
} from 'antd';
import { useFileImageContext } from '../../useState/fileImage';

const { Dragger } = Upload;

const FileUpload: React.FC = () => {

    const { fileList, updateFileList } = useFileImageContext() || {};

    // handle file change
    const handleChange = (info: { fileList: UploadFile[] }) => {
        updateFileList?.(info.fileList);
    };

    return (
        <>
            <Space  >
                <Dragger
                    multiple
                    beforeUpload={() => false}
                    onChange={handleChange}
                    fileList={fileList}
                // {...props}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger>
            </Space>
        </>
    );
}

export default FileUpload;