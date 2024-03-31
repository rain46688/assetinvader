import { useState, useEffect, useMemo, ChangeEvent, MouseEvent } from 'react';
import { sendGet } from "@/utils/fetch";
import { formatDateV2 } from "@/utils/format";
import { DividendData, createData } from '@/redux/dividend/Dividend';
import { Order, getComparator, stableSort } from '@/utils/sort';

// redux 관련 임포트
import { setDividendList } from '@/redux/dividend/dividendSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';

export const useDividendTable = () => {
    // 정렬 ASC / DESC 관련
    const [order, setOrder] = useState<Order>('desc');
    // 정렬 기준 관련
    const [orderBy, setOrderBy] = useState<keyof DividendData>('occurrence_date');
    // 페이지 관련
    const [page, setPage] = useState(0);
    // 화면에 뿌려지는 기본 데이터 갯수 관련
    const [rowsPerPage, setRowsPerPage] = useState(5);


    // redux 관련 추가
    const dispatch = useAppDispatch();
    const rows = useAppSelector(state => state.dividendReducer);

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
        const res = await sendGet('/cashflow/getlist_cashflow_main/' + id);
        if (res.status === 'success') {

            // 데이터 저장
            const list = res.data;
            // 데이터 변환

            const newList = list.map((item: DividendData, index: number) => {
                // asset 값이 없을 경우 건너뜀
                if ((item as any).asset == undefined) {
                    return;
                }

                // 타입 변환 필요
                return createData(
                    item.id,
                    (item as any).asset.asset_name,
                    item.amount,
                    formatDateV2(item.occurrence_date),
                )
            }
            );
            
            // 외래키로 연결된 asset 값이 없는 경우 생긴 빈 항목 제거 (연결되있던 자산 데이터가 삭제된 경우)
            const filteredList = newList.filter((item: DividendData) => item !== undefined);

            // 데이터 저장
            dispatch(setDividendList(filteredList));
            // debugger;
        } else {
            console.log(' === getList error === ');
        }
    };

    // 정렬 관련 함수
    const handleRequestSort = (
        event: MouseEvent<unknown>,
        property: keyof DividendData,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
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

    // 빈 행 계산
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    // 화면에 뿌려질 데이터
    // useMemo는 특정 값이 변경될 때만 함수를 실행하고 그렇지 않으면 이전 값을 재사용  
    const visibleRows = useMemo(() => {
        console.log(" ==== useMemo ==== ");
        let sortedRows: any[] = [];

        sortedRows = stableSort(rows, getComparator(order, orderBy));

        const slicedRows = sortedRows.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        );

        return slicedRows;
    }, [order, orderBy, page, rowsPerPage, rows]);


    // 함수 반환
    return {
        order,
        orderBy,
        rows,
        visibleRows,
        emptyRows,
        page,
        rowsPerPage,
        setOrder,
        setOrderBy,
        setPage,
        handleRequestSort,
        handleChangePage,
        handleChangeRowsPerPage,
    };
}