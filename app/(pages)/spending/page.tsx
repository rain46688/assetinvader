// material-ui 관련 임포트
import Box from '@mui/material/Box';
import SpendingTable from '@/components/spending/SpendingTable';
import SpendingPieChart from '@/components/spending/SpendingPieChart';
import SpendingLineChart from '@/components/spending/SpendingLineChart';

export default function SpendingPage() {

    return (
        <Box sx={{ width: '100%' }}>
            {/* SpendingTable 컴포넌트 */}
            <SpendingTable />
            {/* SpendingLineChart 컴포넌트 */}
            <SpendingLineChart />
            {/* SpendingPieChart 컴포넌트 */}
            <SpendingPieChart />
        </Box>
    );
}
