import { useState, useEffect, useMemo, ChangeEvent, MouseEvent } from "react";
import { sendGet, sendPost } from "@/utils/fetch";
import {
  CashFlowData,
  CashFlowValidation,
  createData,
} from "@/redux/cash_flow/CashFlow";
import { Order, getComparator, stableSort } from "@/utils/sort";
import { validationCheck } from "@/utils/util";
import { formatDateV3, parseDate } from "@/utils/format";

// redux 관련 임포트
import { setCashFlowList } from "@/redux/cash_flow/cashFlowSlice";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { InterestData } from "@/redux/interest/Interest";

export const useCashFlow = () => {
  // 정렬 ASC / DESC 관련
  const [order, setOrder] = useState<Order>("asc");
  // 정렬 기준 관련
  const [orderBy, setOrderBy] = useState<keyof CashFlowData>("asset_name");
  // 데이터 선택 관련
  const [selected, setSelected] = useState<readonly number[]>([]);
  // 페이지 관련
  const [page, setPage] = useState(0);
  // 화면에 뿌려지는 기본 데이터 갯수 관련
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // 이전 데이터 저장
  const [previousData, setPreviousData] = useState("");
  // 유효성 검사 리스트
  const [validationList, setValidationList] = useState<CashFlowValidation[]>([]);
  // 총계 데이터
  const [sumCashFlow, setSumCashFlow] = useState<CashFlowData>();
  // 유효성 검사 성공 여부
  const [validation, setValidation] = useState(false);
  // 스낵바 관련
  const [snack, setSnack] = useState(false);
  // 스낵바 메시지 관련
  const [snackMessage, setSnackMessage] = useState("");
  // 스낵바 상태 관련
  const [snackBarStatus, setSnackBarStatus] = useState("success");
  // 정렬 안함 상태 관련 (기본 정렬 안함 상태로 설정)
  const [isNotSortStatus, setIsNotSortStatus] = useState(true);
  // 날짜 선택 관련
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());

  // redux 관련 추가
  const dispatch = useAppDispatch();
  const rows = useAppSelector((state) => state.cashFlowReducer);

  // 데이터 가져오기
  useEffect(() => {
    // 세션 스토리지에 저장된 id값 가져오기
    const id = sessionStorage.getItem("id");
    // id값으로 데이터 가져오기
    getList("" + id);
  }, [year]);

  // 데이터 가져오기 함수
  const getList = async (id: string) => {
    console.log("=== getList === ");
    const res_cashflow = await sendGet("/cashflow/getlist_cashflow/" + id);
    const res_interest = await sendGet("/interest/getlist_interest/" + id);
    if (res_cashflow.status === "success" && res_interest.status === "success") {
      // 유효성 검사 리스트
      const valList: CashFlowValidation[] = [];
      // 데이터 저장
      const list_cashflow = res_cashflow.data;
      const list_interest = res_interest.data;
      console.log(list_cashflow);
      console.log(list_interest);
      // 합계 값 저장 리스트
      let sumCashFlowList = {
        jan: 0,
        feb: 0,
        mar: 0,
        apr: 0,
        may: 0,
        jun: 0,
        jul: 0,
        aug: 0,
        sep: 0,
        oct: 0,
        nov: 0,
        dec: 0,
      };
      // 데이터 변환(cashflow)
      let newList = list_cashflow.map((item: CashFlowData, index: number) => {
        // cash_flow 값이 없는경우 0으로 채움
        let cashFlowList = {
          jan: 0,
          feb: 0,
          mar: 0,
          apr: 0,
          may: 0,
          jun: 0,
          jul: 0,
          aug: 0,
          sep: 0,
          oct: 0,
          nov: 0,
          dec: 0,
        };
        if ((item as any).cash_flow != undefined) {
          const cash_flow_list = (item as any).cash_flow;
          cash_flow_list.map((item: any) => {
            const [itemYear, itemMonth] = formatDateV3(item.occurrence_date).split("-");
            if(itemYear != year) return;
            switch (itemMonth) {
              case "01":
                cashFlowList.jan += item.amount;
                sumCashFlowList.jan += item.amount;
                break;
              case "02":
                cashFlowList.feb += item.amount;
                sumCashFlowList.feb += item.amount;
                break;
              case "03":
                cashFlowList.mar += item.amount;
                sumCashFlowList.mar += item.amount;
                break;
              case "04":
                cashFlowList.apr += item.amount;
                sumCashFlowList.apr += item.amount;
                break;
              case "05":
                cashFlowList.may += item.amount;
                sumCashFlowList.may += item.amount;
                break;
              case "06":
                cashFlowList.jun += item.amount;
                sumCashFlowList.jun += item.amount;
                break;
              case "07":
                cashFlowList.jul += item.amount;
                sumCashFlowList.jul += item.amount;
                break;
              case "08":
                cashFlowList.aug += item.amount;
                sumCashFlowList.aug += item.amount;
                break;
              case "09":
                cashFlowList.sep += item.amount;
                sumCashFlowList.sep += item.amount;
                break;
              case "10":
                cashFlowList.oct += item.amount;
                sumCashFlowList.oct += item.amount;
                break;
              case "11":
                cashFlowList.nov += item.amount;
                sumCashFlowList.nov += item.amount;
                break;
              case "12":
                cashFlowList.dec += item.amount;
                sumCashFlowList.dec += item.amount;
                break;
            }
          });
        }

        // 유효성 검사 리스트에 저장 (수정 기능이 있어서 id 값 필요)
        valList.push({
          id: item.id,
          asset_name: false,
          jan: false,
          feb: false,
          mar: false,
          apr: false,
          may: false,
          jun: false,
          jul: false,
          aug: false,
          sep: false,
          oct: false,
          nov: false,
          dec: false,
        });

        // 타입 변환 필요
        return createData(
          item.id,
          item.asset_name,
          cashFlowList.jan,
          cashFlowList.feb,
          cashFlowList.mar,
          cashFlowList.apr,
          cashFlowList.may,
          cashFlowList.jun,
          cashFlowList.jul,
          cashFlowList.aug,
          cashFlowList.sep,
          cashFlowList.oct,
          cashFlowList.nov,
          cashFlowList.dec
        );
      });
      console.log(newList);
      // debugger;
      // 데이터 변환(interest)
      for(const asset of list_interest) {
        if ((asset as any).interest != undefined) {
          const interest_list = (asset as any).interest;
          for(const interest of interest_list) {
            console.log(interest);
            const [itemYear, itemMonth] = formatDateV3(interest.occurrence_date).split("-");
            if(itemYear != year) continue;
            switch (itemMonth) {
              case "01":
                newList.find((item: CashFlowData) => item.id === asset.id).jan += interest.amount;
                sumCashFlowList.jan += interest.amount;
                break;
              case "02":
                newList.find((item: CashFlowData) => item.id === asset.id).feb += interest.amount;
                sumCashFlowList.feb += interest.amount;
                break;
              case "03":
                newList.find((item: CashFlowData) => item.id === asset.id).mar += interest.amount;
                sumCashFlowList.mar += interest.amount;
                break;
              case "04":
                newList.find((item: CashFlowData) => item.id === asset.id).apr += interest.amount;
                sumCashFlowList.apr += interest.amount;
                break;
              case "05":
                newList.find((item: CashFlowData) => item.id === asset.id).may += interest.amount;
                sumCashFlowList.may += interest.amount;
                break;
              case "06":
                newList.find((item: CashFlowData) => item.id === asset.id).jun += interest.amount;
                sumCashFlowList.jun += interest.amount;
                break;
              case "07":
                newList.find((item: CashFlowData) => item.id === asset.id).jul += interest.amount;
                sumCashFlowList.jul += interest.amount;
                break;
              case "08":
                newList.find((item: CashFlowData) => item.id === asset.id).aug += interest.amount;
                sumCashFlowList.aug += interest.amount;
                break;
              case "09":
                newList.find((item: CashFlowData) => item.id === asset.id).sep += interest.amount;
                sumCashFlowList.sep += interest.amount;
                break;
              case "10":
                newList.find((item: CashFlowData) => item.id === asset.id).oct += interest.amount;
                sumCashFlowList.oct += interest.amount;
                break;
              case "11":
                newList.find((item: CashFlowData) => item.id === asset.id).nov += interest.amount;
                sumCashFlowList.nov += interest.amount;
                break;
              case "12":
                newList.find((item: CashFlowData) => item.id === asset.id).dec += interest.amount;
                sumCashFlowList.dec += interest.amount;
                break;
            }
          }
        }
      }
      console.log(newList);
      // 유효성 검사 리스트 저장
      setValidationList(valList);
      // 총계 데이터 저장
      setSumCashFlow({
        id: 0,
        asset_name: '총계',
        jan: sumCashFlowList.jan,
        feb: sumCashFlowList.feb,
        mar: sumCashFlowList.mar,
        apr: sumCashFlowList.apr,
        may: sumCashFlowList.may,
        jun: sumCashFlowList.jun,
        jul: sumCashFlowList.jul,
        aug: sumCashFlowList.aug,
        sep: sumCashFlowList.sep,
        oct: sumCashFlowList.oct,
        nov: sumCashFlowList.nov,
        dec: sumCashFlowList.dec,
      });
      // 데이터 저장
      dispatch(setCashFlowList([...newList]));
    } else {
      console.log(" === getList error === ");
      setSnack(true);
      setSnackBarStatus("warning");
      setSnackMessage("데이터가 없거나 불러오는데 실패했습니다.");
    }
  };

  // 정렬 관련 함수
  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof CashFlowData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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

  // 빈 행 계산
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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

    sortedRows = [sumCashFlow, ...sortedRows];

    const slicedRows = sortedRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    return slicedRows;
  }, [order, orderBy, page, rowsPerPage, rows]);

  // 데이터 변경 함수
  const handleDataChange = (
    event: ChangeEvent<any>,
    id: number,
    index: number,
    field: string
  ) => {
    console.log(" ==== handleChange ==== ");

    const updatedRows = rows.map((item) => {
      if (item.id === id) {
        // 입력한 값
        const value = event.target.value;
        console.log("EnterKey : ", value)

        // 유효성 검사 타입
        const fieldDataType = {
          asset_name: "string",
          jan: "number",
          feb: "number",
          mar: "number",
          apr: "number",
          may: "number",
          jun: "number",
          jul: "number",
          aug: "number",
          sep: "number",
          oct: "number",
          nov: "number",
          dec: "number",
        };
        // 유효성 검사

        // 유효성 검사 리스트에서 해당 필드에 매칭되는 데이터를 뽑아옴
        const fieldData = validationList.find((item) => item.id === id);

        const result = validationCheck(value, field, fieldDataType, fieldData);
        setValidation(result);

        // 이전 데이터 저장
        setPreviousData((item as any)[field]);
        return {
          ...item,
          [field]: event.target.value,
        };
      }
      return item;
    });

    // 수정된 배열을 설정
    dispatch(setCashFlowList(updatedRows));
  };

  // 데이터 변경 함수
  const handleDataBlur = async (
    event: ChangeEvent<any>,
    id: number,
    index: number,
    field: string
  ) => {
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
    console.log(field);
    console.log(item);
    let amount;
    let month;
    switch(field) {
        case "jan" :
            amount = item?.jan;
            month = "01";
            break;
    }

    console.log(year + "-" + month + "-01")
    const data = JSON.stringify({
        "asset_id": id,
        "amount": String(amount).trim() === '' ? 0: amount,
        "occurrence_date": parseDate(year + "-" + month + "-01")
    });
    console.log(data)

    const result = await sendPost(data, 'cashflow/add_cashflow');
    if (result.status === 'success') {
        console.log(" === 수정 성공 === ");
        setSnack(true);
        setSnackMessage("데이터 수정 완료.");
        setSnackBarStatus("success");
        setIsNotSortStatus(false);
    } else {
        console.log(" === 수정 실패 === ");
        setSnack(true);
        setSnackMessage("데이터 수정 실패.");
        setSnackBarStatus("error");
        setIsNotSortStatus(false);
    }
  };

  // 스낵바 닫기 함수
  const handleSnackClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack(false);
  };

  // 함수 반환
  return {
    selected,
    setSelected,
    year,
    setYear,
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
    setValidationList,
    getList,
    setIsNotSortStatus,
    setSnack,
    setSnackMessage,
    setSnackBarStatus,
    setOrder,
    setOrderBy,
    setPage,
    handleRequestSort,
    handleDataChange,
    handleDataBlur,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSnackClose,
  };
};
