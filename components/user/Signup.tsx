"use client"
import { useSignup } from '@/hooks/user/useSignup';
// redux 관련 임포트
import { setUser } from '@/redux/user/userSlice';

// material-ui 관련 임포트
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// 회원가입 컴포넌트
export default function Signup() {

    // custom hook 사용
    const { handleSignup, dispatch, user_id, password, password_re, setPassword_re, invitecode, setInvitecode, role, locked, idVaild, passwordVaild, invitecodeVaild, snack, snackMessage, handleSnackClose } = useSignup();

    return (
        <Container component="main" maxWidth="xs">
            {/* 스낵바 설정 */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snack}
                autoHideDuration={5000}
                onClose={handleSnackClose}>
                <Alert
                    onClose={handleSnackClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}>
                    {snackMessage}
                </Alert>
            </Snackbar>
            {/*  */}
            <Typography component="h1" variant="h5" align="center">
                Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Id"
                    label="Id"
                    name="id"
                    value={user_id}
                    autoComplete="id"
                    autoFocus
                    onChange={(event) => dispatch(setUser({ user_id: event.target.value, password, role, locked }))}
                    error={idVaild}
                    helperText={idVaild ? "아이디를 입력해주세요." : ""}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    value={password}
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(event) => dispatch(setUser({ user_id, password: event.target.value, role, locked }))}
                    error={passwordVaild}
                    helperText={passwordVaild ? "비밀번호를 입력해주세요." : ""}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password_re"
                    value={password}
                    label="Password(재)"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(event) => setPassword_re(event.target.value)}
                    error={passwordVaild}
                    helperText={passwordVaild ? "비밀번호를 입력해주세요." : ""}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="invitecode"
                    value={invitecode}
                    label="초대코드(10자)"
                    type="invitecode"
                    id="invitecode"
                    autoComplete="id"
                    onChange={(event) => setInvitecode(event.target.value)}
                    error={invitecodeVaild}
                    helperText={invitecodeVaild ? "초대코드를 제대로 입력해주세요." : ""}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}>
                    Sign Up
                </Button>
            </Box>
        </Container>
    )
}
