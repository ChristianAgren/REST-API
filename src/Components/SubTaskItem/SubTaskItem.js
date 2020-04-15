import React from 'react'
import {
    makeStyles,
    Typography,
    FormControl,
    TextField,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';


const useStyles = makeStyles((theme) => ({
    // '.MuiListItem-container':{
    //     '& :hover': {
    //         backgroundColor: 'black'
    //     }
    // },
    inline: {
        display: 'inline',
    },
    listItemSecondary: {
        '& > button': {
            margin: theme.spacing(0, 1)
        }
    }
}))

function SubTaskItem(props) {
    const classes = useStyles()
    const [shouldEdit, setShouldEdit] = React.useState(false)
    const handleEditClick = () => {
        setShouldEdit(!shouldEdit)
    }

    return (
        <ListItem button>
            {(shouldEdit) ?
                <FormControl fullWidth>
                    <TextField id="outlined-basic" label="Change assignment" />
                </FormControl>
                :
                <ListItemText
                    primary={`${props.item.desc}`}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="overline"
                                className={classes.inline}
                            >
                                {`${props.item.status} - `}
                            </Typography>
                            {`Added: ${props.item.date}`}
                        </React.Fragment>}
                />
            }
            <ListItemSecondaryAction className={classes.listItemSecondary}>
                {(shouldEdit) ?
                    <IconButton onClick={handleEditClick} edge="end" aria-label="edit">
                        <DoneIcon />
                    </IconButton>
                    :
                    <>
                        <IconButton edge="end" aria-label="complete">
                            <DoneIcon />
                        </IconButton>
                        <IconButton onClick={handleEditClick} edge="end" aria-label="edit">
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </>
                }
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default SubTaskItem