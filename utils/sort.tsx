
// 정렬을 위한 타입
export type Order = 'asc' | 'desc';

/**
 * descendingComparator 함수 : 내림차순 정렬을 위한 함수
 * @param {T} a - 비교할 값
 * @param {T} b - 비교할 값
 * @param {keyof T} orderBy - 정렬 기준
 */
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

/**
 * getComparator 함수 : 정렬 기준을 반환하는 함수
 * @param {Order} order - 정렬 순서
 * @param {Key} orderBy - 정렬 기준
 */
export function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

/**
 * stableSort 함수 : 안정적인 정렬을 위한 함수
 * @param {readonly T[]} array - 정렬할 배열
 * @param {(a: T, b: T) => number} comparator - 비교 함수
 */
export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}