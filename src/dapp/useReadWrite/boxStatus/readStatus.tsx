

// import { useEffect,useState } from 'react';
import { Config_BoxStatus } from "../../constants/abiAddress_v1_3";
// import { useState_boxStatus } from "../../useState/state_boxStatus";
import { useReadContract } from 'wagmi';

export const useBoxStatus = () => {
    const { data: adminData } = useReadContract({
        ...Config_BoxStatus,
        functionName: 'Admin'
    });

    const { data: completeCountsData } = useReadContract({
        ...Config_BoxStatus,
        functionName: 'completeCounts'
    });

    const Admin = () => {
        if (adminData) {
            return adminData.toString();
        }
        return '';
    };

    const completeCounts = () => {
        if (completeCountsData) {
            return parseInt(completeCountsData.toString());
        }
        return 0;
    };

    return {
        Admin,
        completeCounts
    };
};