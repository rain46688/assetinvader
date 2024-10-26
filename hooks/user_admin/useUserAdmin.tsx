import { useState, useEffect, useMemo, ChangeEvent, MouseEvent } from 'react';
import { sendGet } from "@/utils/fetch";
import { formatDate, formatDateV2, formatDateV3 } from "@/utils/format";
import { Order, getComparator, stableSort } from '@/utils/sort';
import { validationCheck } from '@/utils/util';
import { UserAdminData, createData } from '@/redux/user_admin/UserAdmin';

// redux 관련 임포트
import { setUserAdminList } from '@/redux/user_admin/userAdminSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';

export const useSpending = () => {
    // 정렬 ASC / DESC 관련
    const [order, setOrder] = useState<Order>('desc');
    // 정렬 기준 관련
    const [orderBy, setOrderBy] = useState<keyof UserAdminData>('id');
    // 데이터 선택 관련
    const [selected, setSelected] = useState<readonly number[]>([]);
    // 페이지 관련
    const [page, setPage] = useState(0);
    // 화면에 뿌려지는 기본 데이터 갯수 관련
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // 스낵바 관련
    const [snack, setSnack] = useState(false);
    // 스낵바 메시지 관련
    const [snackMessage, setSnackMessage] = useState('');
    // 스낵바 상태 관련
    const [snackBarStatus, setSnackBarStatus] = useState("success");
    // 데이터 추가 상태 관련
    const [addStatus, setAddStatus] = useState(false);
    // 정렬 안함 상태 관련 (기본 정렬 안함 상태로 설정)
    const [isNotSortStatus, setIsNotSortStatus] = useState(true)

    // redux 관련 추가
    const dispatch = useAppDispatch();
    const rows = useAppSelector(state => state.userAdminReducer);

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
        const res = await sendGet('/member/getlist_member');
        if (res.status === 'success') {

            // 데이터 저장
            const list = res.data;
            // 데이터 변환

            const newList = list.map((item: UserAdminData, index: number) => {
                // 타입 변환 필요
                return createData(
                    item.id,
                    item.user_id,
                    item.role,
                    item.locked,
                    formatDateV3(item.reg_date),
                    formatDateV3(item.mod_date),
                    formatDateV3(item.visit_date),
                    formatDateV3(item.accept_date),
                )
            }
            );

            // 데이터 저장
            dispatch(setUserAdminList(newList));
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
        property: keyof UserAdminData,
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
        snack,
        snackMessage,
        addStatus,
        snackBarStatus,
        getList,
        setIsNotSortStatus,
        setSnackBarStatus,
        setSnack,
        setSnackMessage,
        setAddStatus,
        setOrder,
        setOrderBy,
        setPage,
        isSelected,
        handleSelectAllClick,
        handleRequestSort,
        handleClick,
        handleChangePage,
        handleChangeRowsPerPage,
        handleSnackClose,
    };
}