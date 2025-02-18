import { useState, useEffect, useMemo, ChangeEvent, MouseEvent, MouseEventHandler } from 'react';
import { sendGet, sendPost } from "@/utils/fetch";
import { useRouter } from "next/navigation";
import { formatDate} from "@/utils/format";
import { Order, getComparator, stableSort } from '@/utils/sort';
import { InviteCodeData, createData } from '@/redux/invitecode/InviteCode';

// redux 관련 임포트
import { setInviteCodeList } from '@/redux/invitecode/inviteCodeSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';

export const useInviteCode = () => {
    const router = useRouter();
    // 정렬 ASC / DESC 관련
    const [order, setOrder] = useState<Order>('asc');
    // 정렬 기준 관련
    const [orderBy, setOrderBy] = useState<keyof InviteCodeData>('member_id');
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

    // redux 관련 추가
    const dispatch = useAppDispatch();
    const rows = useAppSelector(state => state.inviteCodeReducer);

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
        const res = await sendGet('/invitecode/getlist_invitecode/' + id);
        if (res.status === 'success') {

            // 데이터 저장
            const list = res.data;
            console.log(list)

            // 데이터 변환
            const newList = list.map((item: InviteCodeData, index: number) => {
                // 타입 변환 필요
                return createData(
                    item.id,
                    item.member_id,
                    item.user_id,
                    item.code,
                    formatDate(item.reg_date),
                    formatDate(item.exp_date),
                    formatDate(item.use_date),
                    item.use_flag,
                )
            }
            );

            // 데이터 저장
            dispatch(setInviteCodeList(newList));
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
        property: keyof InviteCodeData,
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

    // 스낵바 닫기 함수
    const handleSnackClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnack(false);
    };

    // 신규 초대코드 발급
    const createInviteCode = async (id: string) => {
        const data = JSON.stringify({
          });
        const res = await sendPost(data, '/invitecode/add_invitecode/' + id);
        if (res.status === 'success') {

            // 데이터 저장
            const list = res.data;
            console.log(list)

        } else {
            console.log(' === getList error === ');
            setSnack(true);
            setSnackBarStatus("warning");
            setSnackMessage('신규코드 발급에 실패했습니다.');
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
        snack,
        snackMessage,
        addStatus,
        snackBarStatus,
        getList,
        setSnackBarStatus,
        setSnack,
        setSnackMessage,
        setAddStatus,
        setOrder,
        setOrderBy,
        setPage,
        handleRequestSort,
        handleChangePage,
        handleChangeRowsPerPage,
        handleSnackClose,
        createInviteCode,
    };
}