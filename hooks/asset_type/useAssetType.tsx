import { useState, useEffect, useMemo, ChangeEvent, MouseEvent } from 'react';
import { sendGet, sendPut } from "@/utils/fetch";
import { formatDate } from "@/utils/format";
import { AssetTypeData, AssetTypeValidation, createData } from "@/redux/asset_type/AssetType";
import { Order, getComparator, stableSort } from '@/utils/sort';
import { validationCheck } from '@/utils/util';

// redux 관련 임포트
import { setAssetTypeList } from '@/redux/asset_type/assetTypeSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';

export const useAssetType = () => {
    // 정렬 ASC / DESC 관련
    const [order, setOrder] = useState<Order>('asc');
    // 정렬 기준 관련
    const [orderBy, setOrderBy] = useState<keyof AssetTypeData>('asset_type');
    // 데이터 선택 관련
    const [selected, setSelected] = useState<readonly number[]>([]);
    // 페이지 관련
    const [page, setPage] = useState(0);
    // 화면에 뿌려지는 기본 데이터 갯수 관련
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // 이전 데이터 저장
    const [previousData, setPreviousData] = useState('');
    // 유효성 검사 리스트
    const [validationList, setValidationList] = useState<AssetTypeValidation[]>([]);
    // 유효성 검사 성공 여부
    const [validation, setValidation] = useState(false);
    // 스낵바 관련
    const [snack, setSnack] = useState(false);
    // 스낵바 메시지 관련
    const [snackMessage, setSnackMessage] = useState('');
    // 스낵바 상태 관련
    const [snackBarStatus, setSnackBarStatus] = useState("success");
    // 정렬 안함 상태 관련 (기본 정렬 안함 상태로 설정)
    const [isNotSortStatus, setIsNotSortStatus] = useState(true);

    // redux 관련 추가
    const dispatch = useAppDispatch();
    const rows = useAppSelector(state => state.assetTypeReducer);

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
        const res = await sendGet('/asset/getlist_asset_type/' + id);
        if (res.status === 'success') {
            // 유효성 검사 리스트
            const valList: AssetTypeValidation[] = [];
            // 데이터 저장
            const list = res.data;
            // 데이터 변환
            const newList = list.map((item: AssetTypeData, index: number) => {

                // 유효성 검사 리스트에 저장 (수정 기능이 있어서 id 값 필요)
                valList.push({
                    id: item.id,
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
            dispatch(setAssetTypeList(newList));
        } else {
            console.log(' === getList error === ');
            setSnack(true);
            setSnackBarStatus("warning");
            setSnackMessage('데이터가 없거나 불러오는데 실패했습니다.');
        }
    };

    // 정렬 관련 함수
    const handleRequestSort = (
        event: MouseEvent<unknown>,
        property: keyof AssetTypeData,
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
        const selectcheck = (event.target as HTMLInputElement).value;

        // 체크박스가 아닌 곳을 클릭했을 때
        if (selectcheck != 'on') {
            if (orderBy !== 'asset_type' || order !== 'asc') {
                console.log(" === 수정시 정렬 초기화 === ");
                setSnack(true);
                setSnackBarStatus("info");
                setSnackMessage('수정 작업시 정렬이 초기화 됩니다.');
                setOrder('asc');
                setOrderBy('asset_type');
            }
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
        // 페이지 이동시에 정렬 허용
        setIsNotSortStatus(false);
        console.log(validationList);
    };

    // 페이지 관련 함수
    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        // 페이지 데이터 갯수 변경시에 정렬 허용
        setIsNotSortStatus(false);
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
        }

        const slicedRows = sortedRows.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        );

        return slicedRows;
    }, [order, orderBy, page, rowsPerPage, rows]);

    // 데이터 변경 함수
    const handleDataChange = (event: ChangeEvent<any>, id: number, index: number, field: string) => {
        console.log(" ==== handleChange ==== ");

        const updatedRows = rows.map(item => {
            if (item.id === id) {

                // 입력한 값
                const value = event.target.value;

                // 유효성 검사 타입
                const fieldDataType = {
                    asset_acnt: "string",
                    asset_name: "string",
                    amount: "number",
                    earning_rate: "double"
                }
                // 유효성 검사

                // 유효성 검사 리스트에서 해당 필드에 매칭되는 데이터를 뽑아옴
                const fieldData = validationList.find(item => item.id === id);

                const result = validationCheck(value, field, fieldDataType, fieldData);
                setValidation(result);

                // 이전 데이터 저장
                setPreviousData((item as any)[field]);
                return {
                    ...item,
                    [field]: event.target.value
                };
            }
            return item;
        });

        // 수정된 배열을 설정
        dispatch(setAssetTypeList(updatedRows));
    };

    // 데이터 변경 함수
    const handleDataBlur = async (event: ChangeEvent<any>, id: number, index: number, field: string) => {
        console.log(" ==== handleDataBlur ==== ");
        // 이전 데이터와 현재 데이터가 같다면 return

        console.log(" === previousData === ", previousData);
        console.log(" === event.target.value === ", event.target.value);
        if (previousData === "") {
            console.log(" === 데이터 동일 === ");
            return;
        }

        // 유효성 검사
        if (validation == false) {
            // 유효성 검사 실패시 return
            console.log(" === 유효성 검사 실패 === ");
            setSnack(true);
            setSnackMessage("데이터 유효성 검사 실패.");
            setSnackBarStatus("warning");
            return;
        }

        console.log(" === 데이터 변경 === ");

        // list에서 해당 아이디에 매칭되는 데이터를 뽑아옴
        const item = rows.find(item => item.id === id);
        const data = JSON.stringify({
            "asset_type": item?.asset_type,
            "asset_name": item?.asset_name,
            "amount": item?.amount,
            "asset_acnt": item?.asset_acnt,
            "earning_rate": item?.earning_rate
        });

        const result = await sendPut(data, 'asset/update_asset/' + id);
        if (result.status === 'success') {
            console.log(" === 수정 성공 === ");
            setSnack(true);
            setSnackMessage("데이터 수정 완료.");
            setSnackBarStatus("success");
            setIsNotSortStatus(false);
            dispatch(setAssetTypeList([...rows]));
        } else {
            console.log(" === 수정 실패 === ");
            setSnack(true);
            setSnackMessage("데이터 수정 실패.");
            setSnackBarStatus("error");
            setIsNotSortStatus(false);
            dispatch(setAssetTypeList([...rows]));
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
        snackMessage,
        snackBarStatus,
        getList,
        setIsNotSortStatus,
        setSnack,
        setSnackMessage,
        setSnackBarStatus,
        setOrder,
        setOrderBy,
        setPage,
        isSelected,
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