import { useState } from "react";
import { MarketPageType } from "../../../type/componentsDate";

export let current_pageDate: MarketPageType = {
    current: 1,
    pageSize: 8,
    pageNumber: 1,
}

// 在文件顶部定义自定义 hook
export const useState_PageDate = () => {

    const [pageData, setPageDate] = useState<MarketPageType>({
        current: 1,
        pageSize: 8,
        pageNumber: 1,
    })

    const updateMarketPageDate = (field: keyof MarketPageType, value: number) => {
        setPageDate(prevState => {
            const newData = { ...prevState, [field]:value }
            current_pageDate = newData;
            return newData;
        });
    };

    return { pageData, updateMarketPageDate };
}