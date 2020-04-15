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
import { assignments } from '../../Assignments.json';
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
        overflow: 'auto',
        maxHeight: 'calc(100vh - 15rem)',
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

function AssigneeListGeneration() {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.removeScrollbar}>
            <List className={classes.root} subheader={<li />}>
                {assignments.map(section => (
                    <li key={`section-${section.id}`} className={classes.listSection}>
                        <ul className={classes.ul}>
                            <ListSubheader color="primary" className={classes.listTitle}>
                                <span>{`${section.id} - ${section.desc}`}</span>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <SettingsIcon edge="end" />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
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
                                    <MenuItem onClick={handleClose}>Edit</MenuItem>
                                    <MenuItem onClick={handleClose}>Delete</MenuItem>
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