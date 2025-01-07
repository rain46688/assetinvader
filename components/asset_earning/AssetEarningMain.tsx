"use client"

import { useMediaQuery } from "@mui/material";
import AssetEarningTable from '@/components/asset_earning/AssetEarningTable';
import AssetEarningChart from '@/components/asset_earning/AssetEarningChart';
import AssetEarningTableMobile from "./mobile/AssetEarningTableMobile";

export default function AssetEarningMain() {

    // 모바일 페이지 체크
    const isMobile = useMediaQuery('(max-width:600px) or (max-height:600px)');
    return (
        <>
        {isMobile ? (
            <>
                {/* AssetEarningTable 컴포넌트 */}
                <AssetEarningTable/>
                <AssetEarningChart />
            </>
        ) : (
            <>
                {/* AssetEarningTable 컴포넌트 */}
                <AssetEarningTable />
                <AssetEarningChart />
            </>
        )}
        </>
    )
}