import Box from '@mui/material/Box';
import UserAdminTable from '@/components/user_admin/UserAdminTable';
import InviteCodeTable from '@/components/invitecode/InviteCodeTable';

export default function AdminPage() {

  return (
    // 회원정보 수정 페이지
    <Box sx={{ width: '100%' }}>
      <UserAdminTable />
      <InviteCodeTable />
    </Box>
  );
}