import { useState, useEffect, useMemo, ChangeEvent, MouseEvent } from 'react';
import { sendGet } from "@/utils/fetch";


interface tableDataClass {
    amount: number,
    ratio: number,
    ad_ratio: number,
    diff: number,
    earning_sum: number,
    earning_rate: number
}


export const useAssetRecord = () => {

    // 표 데이터 관련
    const [tableData, setTableData] = useState<tableDataClass[]>([])
    // 스낵바 관련
    const [snack, setSnack] = useState(false);
    // 스낵바 메시지 관련
    const [snackMessage, setSnackMessage] = useState('');
    // 스낵바 상태 관련
    const [snackBarStatus, setSnackBarStatus] = useState("success");

    // 데이터 가져오기
    useEffect(() => {
        // 세션 스토리지에 저장된 id값 가져오기
        const id = sessionStorage.getItem('id');
        // id값으로 데이터 가져오기
        getList('' + id);
    }, []);


    // 데이터 가져오기 함수
    const getList = async (id: string) => {
        console.log('=== getList === ');
        const res = await sendGet('/asset/getlist_asset_class/' + id);
        if (res.status === 'success') {
            // 데이터 저장
            const list = res.data;
            // 데이터 그룹핑
            let total_amount = 0;
            const groupedData = list.reduce((acc: { [key: string]: tableDataClass }, current: { asset_big_class: string, amount: number, earning_rate: number }) => {
                if (!acc[current.asset_big_class]) {
                    acc[current.asset_big_class] = {
                        amount: 0,
                        ratio: 0,
                        ad_ratio: 0,
                        diff: 0,
                        earning_sum: 0,
                        earning_rate: 0
                    };
                }
                acc[current.asset_big_class].amount += current.amount;
                acc[current.asset_big_class].earning_sum += (current.amount * current.earning_rate / 100);
                total_amount += current.amount;

                return acc;
            }, {});

            for (const temp_data in groupedData) {
                groupedData[temp_data].diff = (total_amount * groupedData[temp_data].ratio) - groupedData[temp_data].amount;
                groupedData[temp_data].ad_ratio = groupedData[temp_data].amount / total_amount;
                groupedData[temp_data].earning_rate = groupedData[temp_data].earning_sum / groupedData[temp_data].amount;
            }
            setTableData(groupedData);
        } else {
            console.log(' === getList error === ');
            setSnack(true);
            setSnackBarStatus("warning");
            setSnackMessage('데이터가 없거나 불러오는데 실패했습니다.');
        }
    };

    const handleDataChange = (event: ChangeEvent<any>, temp_data:any) => {
        console.log(" ==== handleChange ==== ");

        // 입력한 값
        const value = event.target.value;
        if (/^[0-9]*$/.test(value)) {
            // let total_amount = 0;
            // for(const temp_data in tableData){
            //     total_amount += tableData[temp_data].amount;
            // }
            // setTableData(prevTableData => ({
            //     ...prevTableData,
            //     [temp_data]: {
            //         ...prevTableData[temp_data],
            //         ratio: value
            //     }
            // }));
            // for(const temp_data in tableData){
            //     tableData[temp_data].diff = (total_amount * tableData[temp_data].ratio) - tableData[temp_data].amount;
            //     tableData[temp_data].earning_rate = tableData[temp_data].earning_sum / tableData[temp_data].amount;
            // }
        }
    };

    // const handleDataChange = (event: ChangeEvent<any>, temp_data: any): void => {
    //     const value = event.target.value;
    //     if (/^[0-9]*$/.test(value)) {
    //         setTableData(prevTableData => {
    //             const updatedTableData = {
    //                 ...prevTableData,
    //                 [temp_data]: {
    //                     ...prevTableData[temp_data],
    //                     ratio: value
    //                 }
    //             };
                
    //             // diff와 earning_rate 계산
    //             let totalAmount = 0;
    //             for (const key in updatedTableData) {
    //                 totalAmount += updatedTableData[key].amount;
    //             }
    
    //             const updatedData = Object.keys(updatedTableData).reduce((acc:{ [key: string]: tableDataClass }, key:any) => {
    //                 const item = updatedTableData[key];
    //                 const diff = (totalAmount * item.ratio / 100) - item.amount;
    //                 const earningRate = item.earning_sum / item.amount;
                    
    //                 acc.push(key:{
    //                     ...item,
    //                     diff,
    //                     earning_rate: earningRate
    //                 });
    //                 return acc;
    //             }, {});

    //             console.log(updatedData);
    //             return updatedData;
    //         });
    //     }
    // };
    
    
    

    // 스낵바 닫기 함수
    const handleSnackClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnack(false);
    };

    // 함수 반환
    return {
        snack,
        snackMessage,
        snackBarStatus,
        tableData,
        getList,
        setSnack,
        setSnackMessage,
        setSnackBarStatus,
        handleSnackClose,
        handleDataChange,
    };

}