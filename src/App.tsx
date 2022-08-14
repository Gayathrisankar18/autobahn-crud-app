import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {
    Routes,
    Route,
    Navigate 
} from 'react-router-dom';
import Dashboard from './Pages/DashboardPage';
import PostForm from './Pages/PostFormPage';
import {State} from './types/stateType'
import Snackbar from '@mui/material/Snackbar';
import {setToastAction} from './actions';
import MuiAlert from '@mui/material/Alert';
import {withStyles, WithStyles} from '@material-ui/core/styles';
import {createStyles} from '@material-ui/core';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';

function styles() {
    return createStyles({
        root: {
            margin: '0 auto',
            width: '80%',
            height: '650px',
            padding: '50px',
            paddingTop: '25px'
        }
    })
}

function TransitionLeft(props: TransitionProps & {
  children: React.ReactElement<any, any>;
}) {
    return <Slide {...props} direction="left" />;
}

function App(props: WithStyles<typeof styles>) {
    const toast = useSelector((state: State) => state.toast)
    const dispatch = useDispatch()
    return (
        <div className={props.classes.root}>
            <Routes>
                <Route path="/" element={<Navigate to='/dashboard' />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/forms" element={<PostForm />} />
                <Route path="/forms/:id" element={<PostForm />} />
            </Routes>
            {toast.length ? 
                <Snackbar 
                    open={!!toast.length} 
                    autoHideDuration={5000} 
                    onClose={() => dispatch(setToastAction([]))}
                    TransitionComponent={TransitionLeft}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    message={toast[0].message}>
                    <MuiAlert 
                        onClose={() => dispatch(setToastAction([]))} 
                        severity={toast[0].type === "SUCCESS" ? "success" : "error"} 
                        sx={{width: '100%'}}
                    >
                        {toast[0].message}
                    </MuiAlert>
                </Snackbar>
                : null}
        </div>
    );
}
export default withStyles(styles)(App);
