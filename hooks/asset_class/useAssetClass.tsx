import { useState, useEffect, useMemo, ChangeEvent, MouseEvent } from 'react';
import { sendGet, sendPut, sendPost, sendDelete } from "@/utils/fetch";
import { formatDate, formatDateV2 } from "@/utils/format";
import { AssetClassData, AssetClassValidation, createData } from "@/redux/asset_class/AssetClass";
import { Order, getComparator, stableSort } from '@/utils/sort';
import { validationCheck } from '@/utils/util';
import { AssetRecord } from '@/redux/asset_record/AssetRecord';

// redux 관련 임포트
import { setAssetClassList } from '@/redux/asset_class/assetClassSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';

export const useAssetClass = () => {
    // 정렬 ASC / DESC 관련
    const [order, setOrder] = useState<Order>('asc');
    // 정렬 기준 관련
    const [orderBy, setOrderBy] = useState<keyof AssetClassData>('asset_big_class');
    // 데이터 선택 관련
    const [selected, setSelected] = useState<readonly number[]>([]);
    // 페이지 관련
    const [page, setPage] = useState(0);
    // 화면에 뿌려지는 기본 데이터 갯수 관련
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // 이전 데이터 저장
    const [previousData, setPreviousData] = useState('');
    // 유효성 검사 리스트
    const [validationList, setValidationList] = useState<AssetClassValidation[]>([]);
    // 유효성 검사 성공 여부
    const [validation, setValidation] = useState(false);
    // 스낵바 관련
    const [snack, setSnack] = useState(false);
    // 스낵바 버튼 관련
    const [snackButton, setSnackButton] = useState(false);
    // 스낵바 메시지 관련
    const [snackMessage, setSnackMessage] = useState('');
    // 스낵바 상태 관련
    const [snackBarStatus, setSnackBarStatus] = useState("success");
    // 스낵바 상태 관련
    const [snackButtonStatus, setSnackButtonStatus] = useState(false);
    // 정렬 안함 상태 관련 (기본 정렬 안함 상태로 설정)
    const [isNotSortStatus, setIsNotSortStatus] = useState(true);

    // redux 관련 추가
    const dispatch = useAppDispatch();
    const rows = useAppSelector(state => state.assetClassReducer);

    // 데이터 가져오기
    useEffect(() => {
        // 세션 스토리지에 저장된 id값 가져오기
        const id = sessionStorage.getItem('id');
        // id값으로 데이터 가져오기
        getList('' + id);
    }, []);

    // 스낵바 버튼 인식
    useEffect(() => {
        if (snackButtonStatus) {
            console.log("예 클릭");
            handleDeleteAndAddAssetRecord();
            setSnackButtonStatus(false);
        } else {
            console.log("아니오 클릭");
        }
    }, [snackButtonStatus]);

    // 데이터 가져오기 함수
    const getList = async (id: string) => {
        console.log('=== getList === ');
        const res = await sendGet('/asset/getlist_asset_class/' + id);
        if (res.status === 'success') {
            // 유효성 검사 리스트
            const valList: AssetClassValidation[] = [];
            // 데이터 저장
            const list = res.data;
            // 데이터 변환
            const newList = list.map((item: AssetClassData, index: number) => {
                // 유효성 검사 리스트에 저장 (수정 기능이 있어서 id 값 필요)
                valList.push({
                    id: item.id,
                    asset_mid_class: false,
                    asset_acnt: false,
                    asset_name: false,
                    amount: false,
                    earning_rate: false
                });

                // 타입 변환 필요
                return createData(
                    item.id,
                    item.member_id,
                    item.asset_type,
                    item.asset_big_class,
                    item.asset_mid_class,
                    item.asset_acnt,
                    item.asset_name,
                    item.amount,
                    item.earning_rate,
                    formatDate(item.reg_date),
                    formatDate(item.mod_date),
                    item.use_flag
                )
            }
            );

            console.log(valList);

            // 유효성 검사 리스트 저장
            setValidationList(valList);
            // 데이터 저장
            dispatch(setAssetClassList(newList));
        } else {
            console.log(' === getList error === ');
            setSnack(true);
            setSnackButton(false);
            setSnackBarStatus("warning");
            setSnackMessage('데이터가 없거나 불러오는데 실패했습니다.');
        }
    };

    // 정렬 관련 함수
    const handleRequestSort = (
        event: MouseEvent<unknown>,
        property: keyof AssetClassData,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // 데이터 선택 관련 함수
    const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    // 데이터 선택 관련 함수
    const handleClick = (event: MouseEvent<unknown>, id: number) => {
        console.log(" ==== handleClick ==== ");
        const selectcheck = (event.target as HTMLInputElement).value;

        // 체크박스가 아닌 곳을 클릭했을 때
        if (selectcheck != 'on') {
            // if (orderBy !== 'asset_big_class' || order !== 'asc') {
            console.log(" === 수정시 정렬 초기화 === ");
            setSnack(true);
            setSnackButton(false);
            setSnackBarStatus("info");
            setSnackMessage('수정 시 자동정렬 기능이 종료됩니다. 다시 정렬하려면 정렬버튼을 클릭해주세요.');
            // }
            return;
        }

        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    // 페이지 관련 함수
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        console.log(validationList);
    };

    // 페이지 관련 함수
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // 선택된 데이터 확인 함수
    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    // 빈 행 계산
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    // 화면에 뿌려질 데이터
    // useMemo는 특정 값이 변경될 때만 함수를 실행하고 그렇지 않으면 이전 값을 재사용  
    const visibleRows = useMemo(() => {
        console.log(" ==== useMemo ==== ");
        let sortedRows: any[] = [];

        // 수정 상태일 때 정렬하지 않음
        if (isNotSortStatus) {
            console.log(" === 정렬 안함 상태 === ");
            sortedRows = rows;
        } else {
            console.log(" === 정렬 가능 상태 === ");
            setIsNotSortStatus(true);
            sortedRows = stableSort(rows, getComparator(order, orderBy));
            // 정렬된 데이터 저장
            dispatch(setAssetClassList(sortedRows));
        }

        const slicedRows = sortedRows.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        );

        return slicedRows;
    }, [order, orderBy, page, rowsPerPage, rows]);

    // 데이터 변경 함수
    const handleDataChange = (event: ChangeEvent<any>, id: number, field: string) => {
        console.log(" ==== handleChange ==== ");

        const updatedRows = rows.map(item => {
            if (item.id === id) {
                // 입력한 값
                let changeValue: string = event.target.nodeName === 'LI' ? event.target.textContent : event.target.value;
                changeValue = changeValue.includes("Add") ? changeValue.split('"')[1] : changeValue;
                console.log((item as any)[field] + " -> " + changeValue);

                // 유효성 검사 타입
                const fieldDataType = {
                    asset_mid_class: "string",
                    asset_acnt: "string",
                    asset_name: "string",
                    amount: "number",
                    earning_rate: "double"
                }
                // debugger;
                // 유효성 검사 리스트에서 해당 필드에 매칭되는 데이터를 뽑아옴
                const fieldData = validationList.find(item => item.id === id);

                const result = validationCheck(changeValue, field, fieldDataType, fieldData);
                setValidation(result);

                // 이전 데이터 저장
                setPreviousData((item as any)[field]);
                console.log((item as any)[field])
                console.log(changeValue)
                return {
                    ...item,
                    [field]: changeValue
                };
            }
            return item;
        });

        // 수정된 배열을 설정
        dispatch(setAssetClassList(updatedRows));
    };

    // 데이터 변경 함수
    const handleDataBlur = async (event: ChangeEvent<any>, id: number, field: string) => {
        console.log(" ==== handleDataBlur ==== ");
        // 이전 데이터와 현재 데이터가 같다면 return
        console.log(" === previousData === ", previousData);
        console.log(" === event.target.value === ", event.target.value);
        if (previousData === "" && previousData == event.target.value) {
            console.log(" === 데이터 동일 === ");
            return;
        }

        // 유효성 검사
        if (validation == false) {
            // 유효성 검사 실패시 return
            console.log(" === 유효성 검사 실패 === ");
            setSnack(true);
            setSnackButton(false);
            setSnackMessage("데이터 유효성 검사 실패.");
            setSnackBarStatus("warning");
            return;
        }
        console.log(" === 데이터 변경 === ");

        // list에서 해당 아이디에 매칭되는 데이터를 뽑아옴
        const item = rows.find(item => item.id === id);
        const data = JSON.stringify({
            "asset_big_class": item?.asset_big_class,
            "asset_mid_class": item?.asset_mid_class,
            "asset_name": item?.asset_name,
            "amount": String(item?.amount).trim() === '' ? "0" : item?.amount,
            "asset_acnt": item?.asset_acnt,
            "earning_rate": item?.earning_rate,
        });

        const result = await sendPut(data, 'asset/update_asset/' + id);
        if (result.status === 'success') {
            console.log("수정 성공");
            setSnack(true);
            setSnackButton(false);
            setSnackMessage("데이터 수정 완료.");
            setSnackBarStatus("success");
            // setIsNotSortStatus(true);
            dispatch(setAssetClassList([...rows]));
        } else {
            console.log("수정 실패");
            setSnack(true);
            setSnackButton(false);
            setSnackMessage("데이터 수정 실패.");
            setSnackBarStatus("error");
            // setIsNotSortStatus(true);
            dispatch(setAssetClassList([...rows]));
        }
    };

    // 스낵바 닫기 함수
    const handleSnackClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnack(false);
        setSnackButton(false);
    };

    const handleDeleteAndAddAssetRecord = async() => {
        await handleDeleteAssetRecord();
        await handleAddAssetRecord();
    }

    // 자산기록 함수(useState에서 사용하기 위해 여기다 만듬)
    const handleAddAssetRecord = async () => {
        // 새로운 배열을 생성하고 수정된 데이터를 추가
        const newList: AssetRecord[] = [];
        for (let asset of rows) {
            const modifiedAsset: AssetRecord = {
                member_id: asset.member_id,
                asset_type: asset.asset_type === undefined ? "" : asset.asset_type,
                asset_big_class: asset.asset_big_class === undefined ? "" : asset.asset_big_class,
                asset_mid_class: asset.asset_mid_class === undefined ? "" : asset.asset_mid_class,
                asset_acnt: asset.asset_acnt === undefined ? "" : asset.asset_acnt,
                asset_name: asset.asset_name === undefined ? "" : asset.asset_name,
                amount: asset.amount,
                record_date: formatDateV2(new Date() + '')
            };
            newList.push(modifiedAsset);
        }
        const sumData = {
            "asset_records": newList
        };
        const data: string = JSON.stringify(sumData, null, 4);
        const result = await sendPost(data, 'assetrecord/add_bulk_assetrecord');
        if (result.status === 'success') {
            // 추가 시에 마지막 페이지로 이동
            setOrder('asc');
            setOrderBy('asset_big_class');
            setSnack(true);
            setSnackButton(false);
            setSnackButtonStatus(false);
            setSnackMessage("데이터 추가 완료.");
            setSnackBarStatus("success");
        } else {
            console.log("fail");
            setSnack(true);
            setSnackButton(false);
            setSnackButtonStatus(false);
            setSnackMessage("데이터 추가 실패.");
            setSnackBarStatus("error");
        }
    };

    const handleDeleteAssetRecord = async () => {
        // 한번 더 찾는게 비효율이 있음
        const id = sessionStorage.getItem('id');
        const search_data = JSON.stringify({
            "member_id": id,
            "search_date": formatDateV2(new Date() + ''),
        });
        const search_result = await sendPost(search_data, 'assetrecord/search_assetrecord');
        for (let delete_date of search_result.data) {
            console.log(delete_date);
            const result = await sendDelete('assetrecord/delete_bulk_assetrecord/' + id + "/" + delete_date);
            if (result.status === 'success') {
                console.log("delete complete");
            } else {
                console.log("delete fail");
            }
        }
    }


    // 함수 반환
    return {
        selected, setSelected,
        order,
        orderBy,
        rows,
        visibleRows,
        emptyRows,
        page,
        rowsPerPage,
        validationList,
        snack,
        snackButton,
        snackMessage,
        snackBarStatus,
        snackButtonStatus,
        getList,
        setValidationList,
        setIsNotSortStatus,
        setSnack,
        setSnackMessage,
        setSnackBarStatus,
        setOrder,
        setOrderBy,
        setPage,
        isSelected,
        setSnackButton,
        setSnackButtonStatus,
        handleAddAssetRecord,
        handleSelectAllClick,
        handleRequestSort,
        handleClick,
        handleDataChange,
        handleDataBlur,
        handleChangePage,
        handleChangeRowsPerPage,
        handleSnackClose,
    };
}