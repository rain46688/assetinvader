import { useState, useEffect, useMemo, ChangeEvent, MouseEvent } from 'react';
import { sendGet } from "@/utils/fetch";
import { formatDateV2 } from "@/utils/format";
import { AssetEarningData, AssetEarningValidation, AssetName, createData } from "@/redux/asset_earning/AssetEarning";
import { Order, getComparator, stableSort } from '@/utils/sort';
import { validationCheck } from '@/utils/util';

// redux 관련 임포트
import { setAssetEarningList } from '@/redux/asset_earning/assetEarningSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';

export const useAssetEarning = () => {
    // 정렬 ASC / DESC 관련
    const [order, setOrder] = useState<Order>('asc');
    // 정렬 기준 관련
    const [orderBy, setOrderBy] = useState<keyof AssetEarningData>('trns_date');
    // 데이터 선택 관련
    const [selected, setSelected] = useState<readonly number[]>([]);
    // 페이지 관련
    const [page, setPage] = useState(0);
    // 화면에 뿌려지는 기본 데이터 갯수 관련
    const [rowsPerPage, setRowsPerPage] = useState(15);
    // 유효성 검사 리스트
    const [validationList, setValidationList] = useState<AssetEarningValidation[]>([]);
    // 유효성 검사 성공 여부
    const [validation, setValidation] = useState(false);
    // 스낵바 관련
    const [snack, setSnack] = useState(false);
    // 스낵바 메시지 관련
    const [snackMessage, setSnackMessage] = useState('');
    // 스낵바 상태 관련
    const [snackBarStatus, setSnackBarStatus] = useState("success");
    // 데이터 추가 상태 관련
    const [addStatus, setAddStatus] = useState(false);
    // 거래 내역 선택 데이터
    const [selectData, setSelectData] = useState<AssetName[]>([]);
    // 정렬 안함 상태 관련 (기본 정렬 안함 상태로 설정)
    const [isNotSortStatus, setIsNotSortStatus] = useState(true)
    // 초기 마지막 페이지 이동 플래그(이게 맞나)
    const [firstMove, setFirstMove] = useState(0);

    // redux 관련 추가
    const dispatch = useAppDispatch();
    const rows = useAppSelector(state => state.assetEarningReducer);

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
        const res = await sendGet('/assetearning/getlist_assetearning/' + id);
        if (res.status === 'success') {

            // 셀렉트 박스 거래 내역 이름 데이터 가져오기
            const asset_type_rest = await sendGet('/asset/getlist_asset_type/' + id);
            const asset_type_rest_list = asset_type_rest.data;
            asset_type_rest_list.forEach((item: any) => {
                const exists = selectData.some((data: any) => data.id === item.id);
                if (!exists) {
                    selectData.push({ id: item.id, label: item.asset_name, asset_acnt: item.asset_acnt });
                }
            });
            setSelectData(selectData);

            // 유효성 검사 리스트
            const valList: AssetEarningValidation[] = [];
            // 데이터 저장
            const list = res.data;
            // 데이터 변환

            const newList = list.map((item: AssetEarningData, index: number) => {

                // 유효성 검사 리스트에 저장 (수정 기능이 없어서 id값을 index로 사용)
                valList.push({
                    id: index,
                    asset_name: false,
                    asset_acnt: false,
                    trns_type: false,
                    amount: false,
                    trns_date: false
                });

                // 타입 변환 필요
                return createData(
                    item.id,
                    item.asset_name,
                    item.asset_acnt,
                    item.trns_type,
                    item.amount,
                    formatDateV2(item.trns_date),
                )
            }
            );

            // 유효성 검사 리스트 저장
            setValidationList(valList);
            // 데이터 저장
            dispatch(setAssetEarningList(newList));
            // 최초 1번 마지막 페이지로 이동
            if (firstMove == 0) {
                const movePage = Math.ceil((newList.length) / rowsPerPage) - 1;
                setPage(movePage);
                setFirstMove(1);
            }
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
        property: keyof AssetEarningData,
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
    const handleDataChange = (event: any, id: number, index: number, field: string) => {
        console.log(" ==== handleChange ==== ");

        const updatedRows = rows.map(item => {
            if (item.id === id) {

                // 입력한 값
                let value = null;
                if (event !== null) {
                    value = event.target === undefined ? formatDateV2(event.$d) : event.target.value;
                } else {
                    value = "";
                }

                // 유효성 검사 타입
                const fieldDataType = {
                    amount: "number",
                    trns_date: "date2",
                }

                // 유효성 검사
                const result = validationCheck(value, field, fieldDataType, (validationList[index] as any));
                setValidation(result);

                return {
                    ...item,
                    [field]: value
                };
            }
            return item;
        });

        // 수정된 배열을 설정
        dispatch(setAssetEarningList(updatedRows));
    };

    // 셀렉트 박스 거래 내역 이름 변경 함수
    const handleDataAssetNameChange = (event: ChangeEvent<any>, id: number, index: number, field: string, newValue: AssetName) => {
        console.log(" ==== handleDataAssetNameChange ==== ");

        // 수정된 배열을 설정
        const updatedRows = rows.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    asset_name: newValue.label,
                    asset_acnt: newValue.asset_acnt,
                    asset_id: newValue.id
                };
            }
            return item;
        });
        dispatch(setAssetEarningList(updatedRows));
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
        addStatus,
        validation,
        selectData,
        snackBarStatus,
        getList,
        setIsNotSortStatus,
        setSnackBarStatus,
        setSnack,
        setSnackMessage,
        handleDataAssetNameChange,
        setAddStatus,
        setValidationList,
        setOrder,
        setOrderBy,
        setPage,
        isSelected,
        handleSelectAllClick,
        handleRequestSort,
        handleClick,
        handleDataChange,
        handleChangePage,
        handleChangeRowsPerPage,
        handleSnackClose,
    };
}