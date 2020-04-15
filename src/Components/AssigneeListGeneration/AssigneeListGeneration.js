import React from 'react';
import {
    Box,
    Divider,
    IconButton,
    List,
    ListSubheader,
    Menu,
    MenuItem,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import SubTaskItem from '../SubTaskItem/SubTaskItem';
import NewSubTask from '../NewSubTask/NewSubTask'
import EditAssignment from '../EditAssignment/EditAssignment'

const useStyles = makeStyles((theme) => ({
    removeScrollbar: {
        width: '100%',
        overflowX: 'hidden'
    },
    root: {
        width: 'calc(100% + 17px)',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflowY: 'scroll',
        maxHeight: 'calc(100vh - 18rem)',
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    listTitle: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '1.1rem',
        '& > button': {
            position: 'absolute',
            right: '1rem',
            color: 'rgba(0, 0, 0, 0.26)'
        }
    },
    editAssignment: {
        margin: theme.spacing(1, 6),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    ul: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'inherit',
        padding: 0,
    },
    subInfo: {
        position: 'relative',
        margin: theme.spacing(1, 5),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    subTasks: {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)'
    }
}));

function AssigneeListGeneration(props) {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [shouldEdit, setShouldEdit] = React.useState(false)
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleEdit = () => {
        setShouldEdit(!shouldEdit)
    }

    const handleClose = (event) => {
        if (event.currentTarget.id === 'delete') {
            props.removeAssignment(anchorEl.id)
            setAnchorEl(null);
        } else if (event.currentTarget.id === 'edit') {
            handleEdit()
        } else {
            setAnchorEl(null);
        }
    };

    const openEdit = () => {
        const editSection = getAssignment()
        return (
            <EditAssignment handleEdit={handleEdit} open={shouldEdit} section={editSection} />
        )
    }

    const getAssignment = () => { 
        return props.assignments.find(i => i.id === anchorEl.id)
    }

    return (
        <div className={classes.removeScrollbar}>
            <List className={classes.root} subheader={<li />}>
                {(props.assignments === null || props.assignments === undefined) ?
                    <h1>Loading</h1>
                    :
                    props.assignments.map(section => (
                        <li key={`section-${section.id}`} className={classes.listSection}>
                            <ul className={classes.ul}>
                                <ListSubheader color="primary" className={classes.listTitle}>
                                    <span>{`${section.desc}`}</span>
                                    <IconButton
                                        id={section.id}
                                        aria-controls="menu"
                                        aria-haspopup="true"
                                        onClick={(event) => handleMenu(event)}
                                        color="inherit"
                                    >
                                        <SettingsIcon edge="end" />
                                    </IconButton>
                                    <Menu
                                        id={`Menu-${section.id}`}
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <MenuItem id="edit" onClick={(event) => handleClose(event)}>Edit</MenuItem>
                                        {
                                            (shouldEdit) ? openEdit() : null
                                        }
                                        <MenuItem id="delete" onClick={(event) => handleClose(event)}>Delete</MenuItem>
                                    </Menu>
                                </ListSubheader>
                                <Box className={classes.subInfo}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <Typography variant="overline">{`Assignee: ${section.name}`}</Typography>
                                        <Typography variant="overline">{`ID: ${section.id}`}</Typography>
                                    </div>
                                    {(section.subtasks && section.subtasks.length > 0) ?
                                        <>
                                            <Typography className={classes.subTasks} variant="overline">{`Subtasks: ${section.subtasks.length}`}</Typography>
                                        </>
                                        : (section.subtasks) ?
                                            <Typography className={classes.subTasks} variant="overline">All out of subtasks!</Typography>
                                            : <Typography className={classes.subTasks} variant="overline">Add some subtasks...</Typography>
                                    }
                                    <Typography variant="overline">{`Added: ${section.date}`}</Typography>
                                </Box>
                                {(section.subtasks) ?
                                    <>
                                        {
                                            section.subtasks.map(item => (
                                                <SubTaskItem
                                                    key={`item-${section.id}-${item.desc}`}
                                                    item={item}
                                                    id={section.id}
                                                />
                                            ))
                                        }
                                    </>
                                    : null
                                }

                                <NewSubTask />

                                <Divider
                                    light
                                    style={{ margin: '.2rem' }}
                                    component="li" />
                            </ul>
                        </li>
                    ))}
            </List>
        </div>
    );
}

export default AssigneeListGeneration