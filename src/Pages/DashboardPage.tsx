import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deletePostAction, SetLoadingAction, FetchAllPostSuccessAction} from '../actions'
import {State} from '../types/stateType';
import Button from '@mui/material/Button';
import {
    useNavigate 
} from 'react-router-dom';
import PaginatedTable from '../Components/PaginatedTable';
import {createStyles} from '@material-ui/core'
import {withStyles, WithStyles} from '@material-ui/core/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {ActionTypes} from "../constants";

function styles() {
    return createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: '25px'
        },
        addButton : {
            width: '150px',
            margin: '10px'
        }
    })
}

export interface Column {
  id : 'id' | 'title' | 'body' | '';
  label: string;
  minWidth: number;
  align?: "right" | "inherit" | "left" | "center" | "justify";
  format?: (id: number) => JSX.Element;
}

export interface Row {
  userId: number;
  title: string;
  body: string;
  id: number;
}

const columns: Column[] = [
    {id: 'id', label: 'ID', minWidth: 70},
    {id: 'title', label: 'Title', minWidth: 70},
    {id: 'body', label: 'Body', minWidth: 70},
    {id: '', label: '', minWidth: 70, format:(id: number) => <EditButton id={id} />},
    {id: '', label: '', minWidth: 70, format:(id: number) => <DeleteButton id={id} />}
]


function EditButton({id}: {id: number}):JSX.Element {
    const navigate = useNavigate(); 
    return <Tooltip title="Edit" arrow><Button size="medium" variant="contained" color="primary" onClick={() => navigate(`/forms/${id}`)}><EditIcon fontSize="small"/></Button></Tooltip>
}

function DeleteButton({id}: {id: number}):JSX.Element {
    const dispatch = useDispatch()
    return <Tooltip title="Delete" arrow><Button size="medium" variant="contained" color="error" onClick={() => dispatch(deletePostAction(id))}><DeleteIcon fontSize="small"/></Button></Tooltip>
}


function Dashboard(props : WithStyles<typeof styles>) {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const posts = useSelector((state: State) => state.posts)
    const loading = useSelector((state: State) => state.loading)

    useEffect(() => {

    // Used async await because it was asked in the test to implement otherwise we could just use dispatch(FetchAllPostAction())
        async function fetchAllPost(): Promise<any> {
            dispatch(SetLoadingAction(true))
            let response: any = await fetch(`${ActionTypes.BASE_URL}`)
            response = await response.json()
            dispatch(FetchAllPostSuccessAction(response))
            dispatch(SetLoadingAction(false))
        }
        fetchAllPost()
    // dispatch(FetchAllPostAction())
    }, [])

    return (
        <div className={props.classes.root}>
            {loading ?  <CircularProgress /> : 
            <>
                <Button className={props.classes.addButton} size="medium" variant="contained" color="primary" onClick={() => navigate('/forms')}>Add Post</Button>
                <PaginatedTable columns={columns} rows={posts}/>
            </>
            }
        </div>
    );
}

export default withStyles(styles)(Dashboard);
