
import { useAppDispatch, useAppSelector } from '@/app/store';
import { setOpened } from '@/redux/layout/layoutSlice';

// material-ui 관련 임포트
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

export const useNavbar = () => {

    const drawerWidth: number = 240;
    const dispatch = useAppDispatch();
    const isopened = useAppSelector(state => state.layoutReducer.isopened);

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            '& .MuiDrawer-paper': {
                position: 'relative',
                whiteSpace: 'nowrap',
                width: drawerWidth,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                boxSizing: 'border-box',
                ...(!open && {
                    overflowX: 'hidden',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    width: theme.spacing(7),
                    [theme.breakpoints.up('sm')]: {
                        width: theme.spacing(9),
                    },
                }),
            },
        }),
    );

    // 함수 반환
    return { Drawer, setOpened, dispatch, isopened };
}