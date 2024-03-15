import { useState, useEffect, useMemo, ChangeEvent, MouseEvent } from 'react';
import { sendGet, sendPut } from "@/utils/fetch";
import { formatDate } from "@/utils/format";
import { AssetTypeData, createData } from "@/redux/asset_type/AssetType";
import { Order, getComparator, stableSort } from '@/utils/sort';

// redux 관련 임포트
import { setAssetTypeList } from '@/redux/asset_type/assetTypeSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';

export const useAssetType = () => {
    // 정렬 ASC / DESC 관련
    const [order, setOrder] = useState<Order>('asc');
    // 정렬 기준 관련
    const [orderBy, setOrderBy] = useState<keyof AssetTypeData>('id');
    // 데이터 선택 관련
    const [selected, setSelected] = useState<readonly number[]>([]);
    // 페이지 관련
    const [page, setPage] = useState(0);
    // 화면에 뿌려지는 기본 데이터 갯수 관련
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // 이전 데이터 저장
    const [previousData, setPreviousData] = useState('');

    // redux 관련 추가
    const dispatch = useAppDispatch();
    const rows = useAppSelector(state => state.assetReducer);

    // 데이터 가져오기
    useEffect(() => {
        const getList = async (id: string) => {
            const res = await sendGet('/asset/getlist_asset_type/' + id);
            if (res.status === 'success') {
                const list = res.data;
                // 데이터 변환
                const newList = list.map((item: AssetTypeData) =>
                    // 타입 변환 필요
                    createData(
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
                );
                // 데이터 저장
                dispatch(setAssetTypeList(newList));
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
        console.log(" ==== handleClick ==== ");
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
        console.log(" ==== handleChangePage ==== ");
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
    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows],
    );

    // 데이터 변경 함수
    const handleDataChange = (event: ChangeEvent<any>, id: number, field: string) => {
        console.log(" ==== handleChange ==== ");
        const updatedRows = rows.map(item => {
            if (item.id === id) {
                console.log((item as any)[field] + " -> " + event.target.value);
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
    const handleDataBlur = async (event: ChangeEvent<any>, id: number, field: string) => {
        console.log(" ==== handleDataBlur ==== ");
        // list에서 해당 아이디에 매칭되는 데이터를 뽑아옴
        const item = rows.find(item => item.id === id);
        // 이전 데이터와 현재 데이터가 같다면 return
        if (previousData === "") {
            return;
        }
        const data = JSON.stringify({
            "asset_type": item?.asset_type,
            "asset_name": item?.asset_name,
            "amount": item?.amount,
            "asset_acnt": item?.asset_acnt,
            "earning_rate": item?.earning_rate
        });

        const result = await sendPut(data, 'asset/update_asset/' + id);
        if (result.status === 'success') {
            console.log("수정 성공");
        } else {
            console.log("수정 실패");
        }
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
        setPage,
        isSelected,
        handleSelectAllClick,
        handleRequestSort,
        handleClick,
        handleDataChange,
        handleDataBlur,
        handleChangePage,
        handleChangeRowsPerPage,
    };
}