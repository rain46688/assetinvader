"use client"

// 리덕스 관련 임포트
import { store } from './store'
import { Provider } from "react-redux"
// material-ui 관련 임포트
import { createTheme, ThemeProvider } from '@mui/material/styles';

// 테마 적용
const Theme = createTheme();

export function CustomProvider({ children }: { children: React.ReactNode }) {
    return <ThemeProvider theme={Theme}>
        <Provider store={store}>
            {children}
        </Provider>
    </ThemeProvider>
}
