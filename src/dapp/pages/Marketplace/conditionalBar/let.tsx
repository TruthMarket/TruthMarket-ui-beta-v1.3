
import { ConditionalStateType } from '../../Create/useState/stateType';

export let condition: ConditionalStateType = {
    search: null,
    country: null,
    state: null,
    status: null,
    sort: 'Default',
    idData: { start: null, end: null },
    priceData: { start: null, end: null},
    dateStart: null,
    dateEnd: null,
}

// 更新 condition 变量的函数
export const updateCondition = (field: keyof ConditionalStateType, value: any) => {
    condition = { ...condition, [field]: value };
};

// useEffect(() => {
//     console.log('search:', conditionalState.search);
//     console.log('country:', conditionalState.country);
//     console.log('state:', conditionalState.state);
//     console.log('sort:', conditionalState.sort);
//     console.log('idData:', conditionalState.idData);
//     console.log('priceData:', conditionalState.priceData);
//     console.log('dateStart:', conditionalState.dateStart);
//     console.log('dateEnd:', conditionalState.dateEnd);
// }, [
//     conditionalState.search,
//     conditionalState.country,
//     conditionalState.state,
//     conditionalState.sort,
//     conditionalState.idData,
//     conditionalState.priceData,
//     conditionalState.dateStart,
//     conditionalState.dateEnd,
// ]);