import React from 'react';
import {
    List,
    ListSubheader,
    Typography,
    Divider,
    IconButton,
    Menu,
    MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import SubTaskItem from '../SubTaskItem/SubTaskItem';
import NewSubTask from '../NewSubTask/NewSubTask'

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
    ul: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'inherit',
        padding: 0,
    },
    subInfo: {
        position: 'relative',
        margin: theme.spacing(1, 4),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        if (event.currentTarget.id === 'delete') {
            props.removeAssignment(anchorEl.id)
        } else if (event.currentTarget.id === 'edit') {
            console.log(anchorEl.id, 'edit');
        }
        setAnchorEl(null);
    };

    // async function deleteAssignment(url, target) {
    //     // Default options are marked with *
    //     const response = await fetch(url + target, {
    //         method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    //     });
    //     return response.json(); // parses JSON response into native JavaScript objects
    // }

    // const deleteAssignmentFromJson = (target) => {
    //     deleteAssignment('http://localhost:3000/api/assignments/', target)
    //         .then((data) => {
    //             console.log(data); // JSON data parsed by `response.json()` call
    //         });
    // }

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
                                    <span>{`${section.id} - ${section.desc}`}</span>
                                    <IconButton
                                        id={section.id}
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
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
                                        <MenuItem id="delete" onClick={(event) => handleClose(event)}>Delete</MenuItem>
                                    </Menu>
                                </ListSubheader>
                                <div className={classes.subInfo}>
                                    <Typography variant="overline">{`Assignee: ${section.name}`}</Typography>
                                    {(section.subtasks && section.subtasks.length > 0) ?
                                        <>
                                            <Typography className={classes.subTasks} variant="overline">{`Subtasks: ${section.subtasks.length}`}</Typography>
                                        </>
                                        : (section.subtasks) ?
                                            <Typography className={classes.subTasks} variant="overline">All out of subtasks!</Typography>
                                            : <Typography className={classes.subTasks} variant="overline">Add some subtasks...</Typography>
                                    }
                                    <Typography variant="overline">{`Added: ${section.date}`}</Typography>
                                </div>
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