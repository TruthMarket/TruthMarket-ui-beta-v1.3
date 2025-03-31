import React from 'react';
// import { Result, ConfigProvider } from 'antd';
// import { ResultStatusType } from 'antd/es/result';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

// 定义一个类型，只能有这些。

interface Props {
    args: string,
}

const ResultApp: React.FC<Props> = ({ args }) => (

    // <ConfigProvider
    //     theme={{
    //         components: {
    //             Result: {
    //                 iconFontSize: 30,
    //                 extraMargin: 0,
    //             },
    //         },
    //     }}
    // >
    //     <Result
    //         status= {args as ResultStatusType}
    //     />
    // </ConfigProvider>
    <div style={{ textAlign: 'center' }}>
        {args === 'success' && <FaCheckCircle size={30} color="green" />}
        {args === 'error' && <FaExclamationCircle size={30} color="red" />}
        {/* <h2>{status === 'success' ? 'Operation Successful!' : 'Something Went Wrong'}</h2> */}
    </div>
);

export default ResultApp;