import React, { 
    // useState 
} from 'react';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
// import { useCreateImageState } from '../../useState/CreateImageState';
import { Upload, Space } from 'antd';
import { useFileImageContext } from '../../useState/fileImage';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const ImageUpload: React.FC = () => {

    const { imageFile, updateImage } = useFileImageContext()||{};

    const onChange: UploadProps['onChange'] = (info: { fileList: UploadFile[] }) => {
        updateImage?.(info.fileList);
    };

    const onPreview = async (file: UploadFile) => {
        // 尝试获取文件的URL
        let src = file.url as string;
        
        // 如果URL不存在，则从文件对象中读取数据
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                // 将文件读取为Data URL
                reader.readAsDataURL(file.originFileObj as FileType);
                // 读取完成后，将结果传递给resolve函数
                reader.onload = () => resolve(reader.result as string);
            });
        }
        
        // 创建一个新的Image对象
        const imageFile = new Image();
        // 设置图片源
        imageFile.src = src;
        
        // 在新窗口中打开图片
        const imgWindow = window.open(src);
        // 如果成功打开窗口，将图片HTML写入新窗口
        imgWindow?.document.write(imageFile.outerHTML);
    };

    return (
        <>
            <Space  >
                    <ImgCrop rotationSlider aspect={35/27}>
                        <Upload
                            listType="picture-card"
                            fileList={imageFile}
                            onChange={onChange}
                            onPreview={onPreview}
                        >
                            {imageFile && imageFile.length < 1 && '+ Upload'}
                        </Upload>
                    </ImgCrop>
                </Space>
        </>
    );
}

export default ImageUpload;