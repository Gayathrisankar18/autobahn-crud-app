import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {UpdatePostAction, getPostAction, AddPostAction} from '../actions'
import {State} from '../types/stateType';
import Button from '@mui/material/Button';
import {
    useNavigate,
    useParams
} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {MouseEvent} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {createStyles} from '@material-ui/core'
import {withStyles, WithStyles} from '@material-ui/core/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import validate from 'validate.js';
import {constraints} from '../Validations/PostValidations'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function styles() {
    return createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        formField : {
            width: '400px'
        },
        alertWrapper: {
            marginBottom: '5px'
        },
        backButton: {
            alignSelf: 'flex-start'
        }
    })
}

interface ErrorType {
  body?: string[],
  title?: string[]
}

function PostForm(props : WithStyles<typeof styles>) {

    const dispatch = useDispatch()
    const post = useSelector((state: State) => state.post)
    const loading = useSelector((state: State) => state.loading)
    const {id} = useParams()
    const navigate = useNavigate();

    const [title, setTitle] = useState < string > ('')
    const [body, setBody] = useState < string > ('')
    const [error, setError] = useState < ErrorType > ({})
  

    const handleSubmitAction = (event: MouseEvent<HTMLButtonElement, Event>) => {
        event.preventDefault();
        const validateError:ErrorType | undefined = validate({title: title.trim(), body: body.trim()}, constraints)
        if(validateError) {
            setError(validateError)
            return
        }
        if(id) {
            dispatch(UpdatePostAction({"title" : title,
                "body" : body, 'userId': 23, 'id': post.id}))
        }else {
            dispatch(AddPostAction({"title" : title,
                "body" : body, 'userId': 23}))
        }
        setTitle("")
        setBody("")
        setError({})
        navigate("/dashboard")
    }

    useEffect(() => {
        if(id) {
            dispatch(getPostAction(parseInt(id)))
        }
    }, [])

    useEffect(() => {
        if(id) {
            setTitle(post.title)
            setBody(post.body)
        }
    }, [post, id])

    return (
        <div className={props.classes.root}>
            {loading ?  <CircularProgress /> : <>
          <Tooltip title="Go to Dashboard" arrow><Button className={props.classes.backButton} size="medium" variant="contained" color="primary" onClick={() => navigate("/dashboard")}><ArrowBackIosNewIcon /></Button></Tooltip>
          <Typography variant="h5" gutterBottom component="div">
              {id ? "Update Post" : "Add Post"}
          </Typography>
          <Stack sx={{width: '50%'}} spacing={2} className="alertWrapper">
              {error.body && error.body[0] && <Alert severity="error">{error.body[0]}</Alert>}
              {error.title && error.title[0] && <Alert severity="error">{error.title[0]}</Alert>}
          </Stack>
          <TextField 
              id="standard-basic" 
              label={id ? "Update title" : "Add title" }
              variant="standard" 
              value={title || ""} 
              type="text"
              className={props.classes.formField}
              onChange={e => {setError({});setTitle(e.target.value)}}
            />
          <br />
          <br />
          <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder={id ? "Update body" : "Add body"}
              style={{width: 400, height: 100}}
              value={body || "" }
              className={props.classes.formField}
              onChange={e => {setError({});setBody(e.target.value)}}
          />
          <br />
          <Button size="medium" variant="contained" color="primary" onClick={handleSubmitAction}>{id ? "Update Post" : "Add Post"}</Button>
        </>
            }
        </div>
    );
}

export default withStyles(styles)(PostForm);
