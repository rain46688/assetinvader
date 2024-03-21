import { useState, useEffect, useMemo, ChangeEvent, MouseEvent } from 'react';
import { sendGet } from "@/utils/fetch";
import { formatDateV2 } from "@/utils/format";
import { AssetTransactionData, AssetTransactionValidation, AssetName, createData } from "@/redux/asset_transaction/AssetTransaction";
import { Order, getComparator, stableSort } from '@/utils/sort';
import { validationCheck } from '@/utils/util';

// redux 관련 임포트
import { setAssetTransactionList } from '@/redux/asset_transaction/assetTransactionSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';

export const useAssetTransaction = () => {
    // 정렬 ASC / DESC 관련
    const [order, setOrder] = useState<Order>('asc');
    // 정렬 기준 관련
    const [orderBy, setOrderBy] = useState<keyof AssetTransactionData>('trns_date');
    // 데이터 선택 관련
    const [selected, setSelected] = useState<readonly number[]>([]);
    // 페이지 관련
    const [page, setPage] = useState(0);
    // 화면에 뿌려지는 기본 데이터 갯수 관련
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // 이전 데이터 저장
    const [previousData, setPreviousData] = useState('');
    // 유효성 검사 리스트
    const [validationList, setValidationList] = useState<AssetTransactionValidation[]>([]);
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

    // redux 관련 추가
    const dispatch = useAppDispatch();
    const rows = useAppSelector(state => state.assetTransactionReducer);

    // 데이터 가져오기
    useEffect(() => {
        const getList = async (id: string) => {
            const res = await sendGet('/assettransaction/getlist_assettransaction_main/' + id);
            if (res.status === 'success') {

                // 거래 내역 이름 데이터 가져오기
                const asset_type_rest = await sendGet('/asset/getlist_asset_type/' + id);
                const asset_type_rest_list = asset_type_rest.data;
                asset_type_rest_list.map((item: any) => {
                    selectData.push({ id: item.id, label: item.asset_name, asset_acnt: item.asset_acnt });
                });
                setSelectData(selectData);

                // 유효성 검사 리스트
                const valList: AssetTransactionValidation[] = [];
                // 데이터 저장
                const list = res.data;
                // 데이터 변환

                const newList = list.map((item: AssetTransactionData, index: number) => {

                    // asset 값이 없을 경우 건너뜀
                    if ((item as any).asset == undefined) {
                        return;
                    }

                    // 유효성 검사 리스트에 저장
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
                        (item as any).asset.asset_name,
                        (item as any).asset.asset_acnt,
                        item.trns_type,
                        item.amount,
                        formatDateV2(item.trns_date),
                    )
                }
                );

                // asset 없는 경우 생긴 빈 항목 제거 (연결되있던 자산 데이터가 삭제된 경우)
                const filteredList = newList.filter((item: AssetTransactionData) => item !== undefined);

                // 유효성 검사 리스트 저장
                setValidationList(valList);
                // 데이터 저장
                dispatch(setAssetTransactionList(filteredList));
            } else {
                console.log('error');
            }
        };

        // 세션 스토리지에 저장된 id값 가져오기
        const id = sessionStorage.getItem('id');
        // id값으로 데이터 가져오기
        getList('' + id);
    }, []);

    // 정렬 관련 함수
    const handleRequestSort = (
        event: MouseEvent<unknown>,
        property: keyof AssetTransactionData,
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

        // 추가 상태일 때 정렬하지 않음
        if (addStatus) {
            sortedRows = rows;
        } else {
            sortedRows = stableSort(rows, getComparator(order, orderBy));
        }
        // 항목 추가시에 맨뒤에 빈 항목이 추가 안되면 주석 해제

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
                const value = event.target === undefined ? formatDateV2(event.$d) : event.target.value;
                console.log(value);

                // 유효성 검사 타입
                const fieldDataType = {
                    amount: "double2",
                    trns_date: "date2",
                }

                // 유효성 검사
                const result = validationCheck(value, field, fieldDataType, (validationList[index] as any));
                setValidation(result);

                // 이전 데이터 저장
                setPreviousData((item as any)[field]);
                return {
                    ...item,
                    [field]: value
                };
            }
            return item;
        });

        // 수정된 배열을 설정
        dispatch(setAssetTransactionList(updatedRows));
    };

    // 거래 내역 이름 변경 함수
    const handleDataAssetNameChange = (event: ChangeEvent<any>, id: number, index: number, field: string, newValue: AssetName) => {
        console.log(" ==== handleDataAssetNameChange ==== ");
        console.log(newValue);

        // 수정된 배열을 설정
        const updatedRows = rows.map(item => {
            if (item.id === id) {
                console.log(item);
                return {
                    ...item,
                    asset_name: newValue.label,
                    asset_acnt: newValue.asset_acnt,
                    asset_id: newValue.id
                };
            }
            return item;
        });
        dispatch(setAssetTransactionList(updatedRows));
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