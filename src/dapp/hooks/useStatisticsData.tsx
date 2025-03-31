////@ts-nocheck
import { 
    // useState, 
    // useCallback,
    // useEffect, 
    useContext } from "react";
// import { 
    // useState_StatisticsDate, 
//     currentStatistics 
// } from "../pages/Marketplace/useState/statisticsData";
import { StatisticsDateType } from "../dappContext/statisticsDataContext";
import { useStatisticsDataContext } from "../dappContext/statisticsDataContext";
import { ContractContext } from "../context";
// import { StatisticsDateType } from "../../../type/contractDate";

export const useStatisticsDate = ()=> {
    const { 
        getStatus, 
        totalSupply, 
        blackSupply,
    } = useContext(ContractContext);

    const {
        statisticsData,
        // timestamp,
        // updateStatisticsData,
        // updateAllStatisticsData,
        // checkDataExpired,
    } = useStatisticsDataContext();
    

    const getStatisticsDate = async (): Promise<StatisticsDateType> => {
        const total = await totalSupply();
        const blacks = await blackSupply();
        console.log('total', total)
        let totalDisplay=total - blacks ,storing = 0, onSale = 0, swaping = 0, completed = 0, published = 0, GTV = 0;

        if (total || total != statisticsData.total) {
            const tokenIdArray = Array.from({ length: total }, (_, index) => index);
            // setTokenIdArray(newTokenIdArray);
            console.log('tokenIdArray', tokenIdArray)

            const StatusList = await Promise.all(tokenIdArray.map(async (id) => await getStatus(id)));
            console.log('StatusList', StatusList)

            if (StatusList.length > 0) {
                // StatusList.forEach(status => {
                //     switch(status) {
                //         case 'Storing': storing++; break;
                //         case 'Selling': case 'Auctioning': onSale++; break;
                //         case 'Delivering': case 'Refunding': swaping++; break;
                //         case 'Completed': completed++; break;
                //         case 'Published': published++; break;
                //     }
                // });

                StatusList.forEach(status => {
                    switch (Number(status)) {
                        case 0: storing++; break;
                        case 1: case 2: onSale++; break;
                        case 3: case 4: swaping++; break;
                        case 5: completed++; break;
                        case 6: published++; break;
                    }
                });

                // return { total, blacks, storing, onSale, swaping, completed, published, GTV };
            }
        };
        return { total, blacks, totalDisplay, storing, onSale, swaping, completed, published, GTV };
    }

    return {getStatisticsDate};

};
