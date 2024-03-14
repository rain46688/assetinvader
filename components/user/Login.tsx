import { useLogin } from '@/hooks/user/useLogin';
// redux 관련 임포트
import { setUser } from '@/redux/user/userSlice';

// material-ui 관련 임포트
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// 로크인 컴포넌트
export default function Login() {

    // custom hook 사용
    const { handleLogin, dispatch, user_id, password } = useLogin();

    return (
        // ThemeProvider dark theme 적용 해줘
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5" align="center">
                Login
            </Typography>
            <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
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
                    onChange={(event) => dispatch(setUser({ user_id: event.target.value, password }))}
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
                    onChange={(event) => dispatch(setUser({ user_id, password: event.target.value }))}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}>
                    Login
                </Button>
            </Box>
        </Container>
    )
}
