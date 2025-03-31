import React, {useEffect,useState} from 'react';
// import styles from './styles.module.scss';
import { updateCondition} from '../../pages/Marketplace/conditionalBar/let';
import { DatePicker,  Space } from 'antd';
// import { useJsonContext } from '../../provider/JsonProvider';
import { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

interface TypeProps {
    useFor: string;
}

const DateSelector: React.FC<TypeProps> = ({useFor}) => {
    // const {updateConditionalState} = useConditionalContext()||{};
    // const {updateBoxInfo} = useJsonContext()||{};

    const [dates, setDates] = useState<[Dayjs | null, Dayjs | null] | null>(null); // 更新状态变量类型
    useEffect(() => {
        if(useFor === 'filter'&& dates) {
            const [startDate, endDate] = dates;
            updateCondition('dateStart',startDate);
            updateCondition('dateEnd',endDate)
        }
    },[dates]);

    const handleDateChange = (
        dates: [
            Dayjs | null, 
            Dayjs | null] | null, 
            // dateStrings: [string, string]
        ) => {
        setDates(dates as [Dayjs | null, Dayjs | null] | null); // 更新状态变量
    };

    return (
    <>
        {/* <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#4912c7', // 全局主色
                    // 文本色
                    colorBgContainer : '#2b2d47', // 容器背景色
                    colorBgBase: '#2b2d47', // 基础背景色
                    // controlOutlineWidth : 0, // 控件边框宽度
                    colorTextBase : '#ffffff', // 基础文字色
                    lineWidth : 0, // 线宽
                },
                components: {
                    DatePicker: {
                        cellHoverBg: '#8A2BE2', 
                        
                        hoverBg: '#373952', 

                    },
                },
            }}
        >
            
        </ConfigProvider> */}
        <Space direction="vertical" size={12}>
                {/* <DatePicker renderExtraFooter={() => 'extra footer'} /> */}
                {/* <DatePicker renderExtraFooter={() => 'extra footer'} showTime /> */}
                <RangePicker renderExtraFooter={() => 'extra footer'} onChange={handleDateChange}/>
                {/* <RangePicker renderExtraFooter={() => 'extra footer'} showTime /> */}
                {/* <DatePicker renderExtraFooter={() => 'extra footer'} picker="month" /> */}
            </Space>
    </>
    );
};

export default DateSelector;