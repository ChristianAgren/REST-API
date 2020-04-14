import React from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    TextField,
    makeStyles,
    Collapse,
    Button,
    Typography,
    FormControl,
} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
    inputWrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
    nested: {
        width: '80%',
    },
    addAssignmentBtn: {
        margin: theme.spacing(0, 2, 3),
        display: 'flex',
        justifyContent: 'center',
        '& .MuiTypography-overline': {
            fontSize: '.9rem',
            marginLeft: '.4rem',
            color: 'rgba(0, 0, 0, 0.54)'
        },
        '& > span > svg': {
            color: 'rgb(92,182,96)'
        }
    },
}))

function NewAssignment() {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const handleClick = () => {
        setOpen(!open)
    }
    return (
        <>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List className={classes.inputWrapper} component="div">
                    <ListItem className={classes.nested}>
                        <FormControl fullWidth>
                            <TextField id="outlined-basic" label="Add subtask" />
                        </FormControl>
                    </ListItem>
                </List>
            </Collapse>
            {(!open) ?
                <Button onClick={handleClick} color="default" className={classes.addAssignmentBtn}>
                    <AddCircleIcon fontSize="small" />
                    <Typography variant="overline">Add subtask</Typography>
                </Button>
                :
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button color="default" className={classes.addAssignmentBtn}>
                        <SaveIcon fontSize="small" />
                        <Typography variant="overline">Save</Typography>
                    </Button>
                    <Button onClick={handleClick} color="default" className={classes.addAssignmentBtn}>
                        <CancelIcon fontSize="small" style={{ color: 'rgb(245,84,72)' }} />
                        <Typography variant="overline">Close</Typography>
                    </Button>
                </div>
            }
        </>
    )
}

export default NewAssignment;