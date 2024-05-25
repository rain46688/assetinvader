import { useState, useEffect, useMemo, ChangeEvent, MouseEvent } from 'react';
import { sendGet } from "@/utils/fetch";

interface tableDataClass {
    amount: number,
    ratio: number,
    target_ratio: number,
    target_amount: number,
    diff: number,
    earning_sum: number,
    earning_rate: number
}

interface targetRatio {
    [key: string]: number;
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
    // 총 자산금액
    const [totalAmount, setTotalAmount] = useState(0);
    // 총 연수익률
    const [totalEarningRate, setTotalEarningRate] = useState(0);
    // 총 목표 연수익률
    const [totalTargetEarningRate, setTotalTargetEarningRate] = useState(0);
    // 목표자산 계산 숨김여부
    const [openEarning, setOpenEarning] = useState(false);
    // 중분류 선택상자 상태
    const [classCheckBoxStatus, setClassCheckBoxStatus] = useState(false);
    // 목표자산 생략 체크
    const [tartgetAmountStatus, setTargetAmountStatus] = useState(false);
    // 목표자산 비율 임시저장
    const [targetRatioData, setTargetRatioData] = useState<targetRatio>({});

    // 데이터 가져오기
    useEffect(() => {
        // 세션 스토리지에 저장된 id값 가져오기
        const id = sessionStorage.getItem('id');
        // id값으로 데이터 가져오기
        getList('' + id);
    }, []);

    // 데이터 가져오기
    useEffect(() => {
        // 세션 스토리지에 저장된 id값 가져오기
        const id = sessionStorage.getItem('id');
        // id값으로 데이터 가져오기
        getList('' + id);
    }, [classCheckBoxStatus]);


    // 데이터 가져오기 함수
    const getList = async (id: string) => {
        console.log('=== getList ===');
        const res = await sendGet('/asset/getlist_asset_class/' + id);
        if (res.status === 'success') {
            // 데이터 저장
            const list = res.data;
            // 데이터 그룹핑
            let total_amount = 0;
            let total_earning_sum = 0;
            const groupedData = list.reduce((acc: { [key: string]: tableDataClass }, current: { asset_big_class: string, asset_mid_class: string, amount: number, earning_rate: number }) => {
                const disinct_name = current.asset_big_class + (classCheckBoxStatus ? "_" + current.asset_mid_class : "_");
                if (!acc[disinct_name]) {
                    acc[disinct_name] = {
                        amount: 0,
                        ratio: 0,
                        target_ratio: 0,
                        target_amount: 0,
                        diff: 0,
                        earning_sum: 0,
                        earning_rate: 0,
                    };
                }
                acc[disinct_name].amount += current.amount;
                acc[disinct_name].earning_sum += (current.amount * current.earning_rate / 100);
                total_amount += current.amount;

                return acc;
            }, {});

            const savedRatio: any = sessionStorage.getItem('targetRatio');
            if (savedRatio == null) {
                console.log('=== SavedRatioData is Null===');
            } else {
                console.log('=== Load RatioData===');
                const parsedData = JSON.parse(savedRatio);
                const keys = Object.keys(parsedData);
                keys.forEach(key => {
                    const value = parsedData[key];
                    if(groupedData[key] != undefined)
                        groupedData[key].target_ratio = value;
                });
                setTargetRatioData(parsedData);
            }

            for (const temp_data in groupedData) {
                const target_amount = Math.round((total_amount * groupedData[temp_data].target_ratio / 100));
                groupedData[temp_data].target_amount = target_amount;
                groupedData[temp_data].diff = target_amount - groupedData[temp_data].amount;
                groupedData[temp_data].ratio = (groupedData[temp_data].amount / total_amount);
                groupedData[temp_data].earning_rate = groupedData[temp_data].earning_sum / groupedData[temp_data].amount;
                if (isNaN(groupedData[temp_data].earning_rate)) groupedData[temp_data].earning_rate = 0;
                total_earning_sum += groupedData[temp_data].amount * groupedData[temp_data].earning_rate;
            }

            console.log(groupedData);
            setTableData(groupedData);
            setTotalAmount(total_amount);
            setTotalEarningRate(total_earning_sum / total_amount);
        } else {
            console.log(' === getList error === ');
            setSnack(true);
            setSnackBarStatus("warning");
            setSnackMessage('데이터가 없거나 불러오는데 실패했습니다.');
        }
    };

    const handleDataChange = (event: ChangeEvent<any>, temp_data: any) => {
        console.log(" ==== handleChange ==== ");

        // 입력한 값
        const value = event.target.value;
        if (/^[0-9.]*$/.test(value)) {
            let total_amount = 0;
            for (const temp_data in tableData) {
                total_amount += tableData[temp_data].amount;
            }
            setTableData(prevTableData => ({
                ...prevTableData,
                [temp_data]: {
                    ...prevTableData[temp_data],
                    target_ratio: value || 0
                }
            }));
        } else {
            console.log("incorrect data");
        }
    };

    // 데이터 변경 함수
    const handleDataBlur = async (event: ChangeEvent<any>) => {
        console.log(" ==== handleDataBlur ==== ");
        let total_amount = 0;
        let total_target_ratio = 0;
        let earning_sum = 0;
        let target_earning_sum = 0;
        for (const temp_data in tableData) {
            total_amount += tableData[temp_data].amount;
        }

        for (const temp_data in tableData) {
            total_target_ratio += parseFloat(""+tableData[temp_data].target_ratio); // 이상하게 타입은 숫자인데 typeof는 string임
            const target_amount = Math.round(total_amount * tableData[temp_data].target_ratio / 100);
            const diff = target_amount - tableData[temp_data].amount;

            earning_sum += tableData[temp_data].amount * tableData[temp_data].earning_rate;
            target_earning_sum += target_amount * tableData[temp_data].earning_rate;
            tableData[temp_data].target_amount = target_amount;
            tableData[temp_data].diff = diff;
        }

        // targetRatio session 저장
        for (const key in tableData) {
            targetRatioData[key] = tableData[key].target_ratio;
        }
        const jsonData = JSON.stringify(targetRatioData, null, 2);
        sessionStorage.setItem('targetRatio', jsonData);
        
        setTotalAmount(total_amount);
        setTotalEarningRate(earning_sum / total_amount);
        setTotalTargetEarningRate(target_earning_sum / total_amount);
        setTargetRatioData(targetRatioData);

        if (total_target_ratio == 100) {
            setTableData({ ...tableData });
            setTargetAmountStatus(true);
        } else if (total_target_ratio < 100) {
            console.log(' === Error === ');
            console.log(total_target_ratio)
            setTableData({ ...tableData });
            setOpenEarning(false);
            setTargetAmountStatus(false);
        } else {
            console.log(' === Error === ');
            console.log(total_target_ratio)
            setOpenEarning(false);
            setTargetAmountStatus(false);
            setSnack(true);
            setSnackBarStatus("warning");
            setSnackMessage('입력한 조정비율의 합이 100%를 넘습니다.');
        }
    };

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
        totalAmount,
        totalEarningRate,
        totalTargetEarningRate,
        openEarning,
        classCheckBoxStatus,
        tartgetAmountStatus,
        getList,
        setSnack,
        setSnackMessage,
        setSnackBarStatus,
        setOpenEarning,
        setClassCheckBoxStatus,
        setTargetAmountStatus,
        handleSnackClose,
        handleDataChange,
        handleDataBlur,
    };

}