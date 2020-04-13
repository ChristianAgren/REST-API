import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Typography,
    Divider,
    ListItemSecondaryAction,
    IconButton,
    Button,
    Menu,
    MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { people } from '../../Assignments.json';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 'calc(100vh - 15rem)',
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    listTitle: {
        display:'flex',
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
    inline: {
        display: 'inline',
    },
    tasksSection: {
        marginTop: '2.4rem'
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
    listItemSecondary: {
        '& > button': {
            margin: theme.spacing(0, 1)
        }
    }
}));

function ComponentsList() {
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
        <List className={classes.root} subheader={<li />}>
            {people.map(section => (
                <li key={`section-${section.id}`} className={classes.listSection}>
                    <ul className={classes.ul}>
                        <ListSubheader color="primary" className={classes.listTitle}>
                            <span>{section.name}</span>
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
                        <div
                            style={(!section.assignments || section.assignments.length === 0) ?
                                { margin: '.8rem 0 1.2rem 0' }
                                : { margin: '0rem 0 0 0' }
                            }
                        >
                            {(section.assignments && section.assignments.length > 0) ?
                                <Typography variant="overline">{`Tasks: ${section.assignments.length}`}</Typography>
                                : (section.assignments) ?
                                    <Typography variant="overline">All out of tasks!</Typography>
                                    : <Typography variant="overline">Add some assignments...</Typography>
                            }
                        </div>
                        {(section.assignments) ?
                            <>
                                {
                                    section.assignments.map(item => (
                                        <ListItem key={`item-${section.id}-${item.desc}`}>
                                            <ListItemText
                                                primary={`${item.desc}`}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="overline"
                                                            className={classes.inline}
                                                        >
                                                            {`${item.status} - `}
                                                        </Typography>
                                                        {`Added: ${item.date}`}
                                                    </React.Fragment>}
                                            />
                                            <ListItemSecondaryAction className={classes.listItemSecondary}>
                                                <IconButton edge="end" aria-label="complete">
                                                    <DoneIcon />
                                                </IconButton>
                                                <IconButton edge="end" aria-label="edit">
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton edge="end" aria-label="delete">
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))
                                }
                            </>
                            : null
                        }
                        <Button color="default" className={classes.addAssignmentBtn}>
                            <AddCircleIcon fontSize="small" />
                            <Typography variant="overline">Add assignment</Typography>
                        </Button>
                        <Divider
                            light
                            style={{margin: '.2rem'}}
                            component="li" />
                    </ul>
                </li>
            ))}
        </List>
    );
}

export default ComponentsList