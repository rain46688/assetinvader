import { useState, ChangeEvent } from 'react';
import { sendGet } from "@/utils/fetch";
import { formatDateV2 } from "@/utils/format";
import { createData } from '@/redux/asset_transaction/AssetTransaction';
import { parseDate } from '@/utils/format';

import { AssetTransactionData } from '@/redux/asset_transaction/AssetTransaction';

export const useDividend = () => {
    // 선택된 자산이름
    const [selectedAssetName, setSelectedAssetName] = useState('');
    // 선택된 배당락일
    const [exDividendDate, setExDividendDate] = useState('')
    // 배당금 계산기 페이지 오픈 여부
    const [openCalPage, setOpenCalPage] = useState(false);
    // 자산 수량
    const [selectedAssetAmout, setSelectedAssetAmout] = useState(0);
    // 선택된 배당금지급일
    const [dividendDate, setDividendDate] = useState('');

    // 자산 선택 이벤트
    const handleSelectAssetName = (event: ChangeEvent<any>) => {
        const changeValue: string = event.target.textContent;
        console.log(changeValue);
        setSelectedAssetName(changeValue);
    }

    // 날짜 선택 이벤트
    const handleDateAccept = (date: any, name: string) => {
        console.log(" === handleDateAccept === ");
        if(name === 'exDividendDate') {
            setExDividendDate(date.$y + '-' + (date.$M + 1) + '-' + (date.$D))
        }  else {
            setDividendDate(date.$y + '-' + (date.$M + 1) + '-' + (date.$D))
        }
    };

    // 배당락일 기준 보유개수 검색
    const handleSearchAssetAmount = async () => {
        console.log("AssetName : ", selectedAssetName, "/exDividendDate : ", exDividendDate)
        setOpenCalPage(true);
        const id = sessionStorage.getItem('id');
        const res = await sendGet('/assettransaction/getlist_assettransaction_main/' + id);
        if (res.status === 'success') {

            // 데이터 저장
            const list = res.data;
            // 데이터 변환

            const newList = list.map((item: AssetTransactionData, index: number) => {
                // asset 값이 없을 경우 건너뜀
                if ((item as any).asset == undefined) {
                    return;
                }
                if((item as any).asset.asset_name != selectedAssetName) {
                    return;
                }
                if ((item as any).trns_type != "매수" && (item as any).trns_type != "매도") {
                    return;
                }
                if(parseDate(formatDateV2((item as any).trns_date)) > parseDate(exDividendDate)) {
                    return;
                }

                // 타입 변환 필요
                return createData(
                    item.id,
                    (item as any).asset.asset_name,
                    (item as any).asset.asset_acnt,
                    item.trns_type,
                    item.amount,
                    formatDateV2(item.trns_date),
                )
            });
            
            // 외래키로 연결된 asset 값이 없는 경우 생긴 빈 항목 제거 (연결되있던 자산 데이터가 삭제된 경우)
            const filteredList = newList.filter((item: AssetTransactionData) => item !== undefined);
            // debugger;
            let assetAmount = 0;
            filteredList.map((item: AssetTransactionData, index: number) => {
                if(item.trns_type == "매수") {
                    assetAmount += Number(item.amount);
                } else {
                    assetAmount -= Number(item.amount);
                }
            });
            if(assetAmount < 0) {
                assetAmount = 0;
            }
            setSelectedAssetAmout(assetAmount);
        } else {
            console.log(' === getList error === ');
        }
    }


    // 함수 반환
    return {
        selectedAssetName, 
        setSelectedAssetName,
        exDividendDate,
        openCalPage,
        setOpenCalPage,
        selectedAssetAmout,
        setSelectedAssetAmout,
        handleSelectAssetName,
        handleSearchAssetAmount,
        handleDateAccept,
    };
}