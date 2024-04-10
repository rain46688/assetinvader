// material-ui 관련 임포트
import Box from '@mui/material/Box';
import InterestTable from '@/components/interest/InterestTable';

export default function InterestPage() {

    return (
        <Box sx={{ width: '100%' }}>
            {/* InterestTable 컴포넌트 */}
            <InterestTable />
        </Box>
    );
}
