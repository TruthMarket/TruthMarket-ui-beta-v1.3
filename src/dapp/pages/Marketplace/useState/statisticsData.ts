
/*
import { useState } from "react";
import { StatisticsDateType } from "../../../dappContext/statisticsDataContext";

export let currentStatistics: StatisticsDateType = {
    total: 0,
    blacks:0,
    totalDisplay:0,
    storing: 0,
    onSale: 0,
    swaping: 0,
    completed: 0,
    published: 0,
    GTV: 0,
}

// 在文件顶部定义自定义 hook
export const useState_StatisticsDate = () => {

    const [statisticsDate, setStatisticsDate] = useState<StatisticsDateType>(currentStatistics);

    const updateStatisticsDate = (field: keyof StatisticsDateType, value: number) => {
        setStatisticsDate(prevState => {
            const newData = { ...prevState, [field]:value }
            currentStatistics = newData;
            return newData;
        });
    };

    return { statisticsDate, updateStatisticsDate };
}
*/

const data = [
    {
        label: "Total:",
        count: 1811,
    },
    {
        label: "Storing:",
        count: 467,
    },
    {
        label: "On Sale:",
        count: 216,

    },
    {
        label: "Swaping:",
        count: 175,
        
    },
    {
        label: "Completed:",
        count: 943,
        
    },
    {
        label: "Published:",
        count: 124,
        
    },
    {
        label: "GTV:",
        count: 1993521452,
    },
];

export default data;

