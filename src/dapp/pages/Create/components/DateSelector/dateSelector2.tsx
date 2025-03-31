import React from 'react';
// import styles from './styles.module.scss';
// import { useConditionalContext } from '../../provider/ConditionalBarProvider';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';
import { useBoxInfoContext } from '../../useState/boxInfo';
import dayjs from 'dayjs';

// const { RangePicker } = DatePicker;

interface TypeProps {
    useFor: string;
}

const DateSelector2: React.FC<TypeProps> = ({useFor}) => {
    // const {updateConditionalState} = useConditionalContext()||{};
    const {boxInfoState,updateBoxInfo} = useBoxInfoContext()||{};

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
        if(useFor === 'mint') {
            updateBoxInfo?.('eventDate',dateString);
        }
    };

    return (
    <>
        <Space direction="vertical" size={12}>
                <DatePicker 
                renderExtraFooter={() => 'extra footer'} 
                onChange={onChange} 
                value={boxInfoState?.eventDate ? dayjs(boxInfoState.eventDate) : null}
                />
            </Space>
    </>
    );
};

export default DateSelector2;