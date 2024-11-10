import { useState, useEffect, useMemo, ChangeEvent, MouseEvent } from 'react';
import { sendGet, sendPut } from "@/utils/fetch";
import { useRouter } from "next/navigation";
import { formatDate} from "@/utils/format";
import { Order, getComparator, stableSort } from '@/utils/sort';
import { UserAdminData, createData } from '@/redux/user_admin/UserAdmin';

// redux 관련 임포트
import { setUserAdminList } from '@/redux/user_admin/userAdminSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';

export const useUserAdmin = () => {
    const router = useRouter();
    // 정렬 ASC / DESC 관련
    const [order, setOrder] = useState<Order>('asc');
    // 정렬 기준 관련
    const [orderBy, setOrderBy] = useState<keyof UserAdminData>('user_id');
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
    const rows = useAppSelector(state => state.userAdminReducer);

    // 권한 관련
    const [role, setRole] = useState<number>(3);

    // 데이터 가져오기
    useEffect(() => {
        // 세션 스토리지에 저장된 id값 가져오기
        const id = sessionStorage.getItem('id');
        // id값으로 데이터 가져오기
        getList('' + id);

        const user_role = Number(sessionStorage.getItem('role'));
        setRole(user_role);
    }, []);

    // 데이터 가져오기 함수
    const getList = async (id: string) => {
        console.log('=== getList === ');
        const res = await sendGet('/member/getlist_member');
        if (res.status === 'success') {

            // 데이터 저장
            const list = res.data;
            console.log(list)

            // 데이터 변환
            const newList = list.map((item: UserAdminData, index: number) => {
                // 타입 변환 필요
                return createData(
                    item.id,
                    item.user_id,
                    item.role,
                    item.locked,
                    formatDate(item.reg_date),
                    formatDate(item.mod_date),
                    formatDate(item.visit_date),
                    formatDate(item.accept_date),
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

    const handleUserAdmission = async (event: ChangeEvent<HTMLInputElement>, id: number) => {
        console.log('Admission : ' + id)
        let data = JSON.stringify({
            "locked": false
        });

        const result = await sendPut(data, 'member/update_member/' + id);
        if (result.status == 'success') {
            // 성공시 스낵바 메시지 설정
            setSnackMessage("회원 승인이 완료되었습니다.\n");
            // 스낵바 오픈
            setSnack(true);
            getList(sessionStorage.getItem('id') + '');
        } else {
            // 실패시 스낵바 메시지 설정
            setSnackMessage("회원정보 수정에 실패하였습니다. 다시 시도해주세요.\n" + result.msg);
            // 스낵바 오픈
            setSnack(true);
        }
    };

    const handleUserBanishment = async (event: ChangeEvent<HTMLInputElement>, id: number) => {
        console.log('Banishment : ' + id)
        console.log('Admission : ' + id)
        let data = JSON.stringify({
            "locked": true
        });

        const result = await sendPut(data, 'member/update_member/' + id);
        if (result.status == 'success') {
            // 성공시 스낵바 메시지 설정
            setSnackMessage("회원 잠금이 완료되었습니다.\n");
            // 스낵바 오픈
            setSnack(true);
            getList(sessionStorage.getItem('id') + '');
        } else {
            // 실패시 스낵바 메시지 설정
            setSnackMessage("회원정보 수정에 실패하였습니다. 다시 시도해주세요.\n" + result.msg);
            // 스낵바 오픈
            setSnack(true);
        }
    };

    const handleUserEdit = (event: ChangeEvent<HTMLInputElement>, id: number) => {
        console.log('Edit : ' + id)
        sessionStorage.setItem('ModifyAdminSelectedId', id.toString());
        // 관리자 페이지로 라우팅
        router.push('' + process.env.NEXT_PUBLIC_MODIFY_ADMIN_URL);
    };

    // 함수 반환
    return {
        role,
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
        handleUserAdmission,
        handleUserBanishment,
        handleUserEdit,
    };
}