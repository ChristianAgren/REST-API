import React from 'react'
import { List, ListItem, ListItemText, ListSubheader, Typography, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { people } from '../../Assignments.json'

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
        display: 'flex',
        flexDirection: 'column',
        fontSize: '1.1rem',
        '& .MuiTypography-overline': {
            color: 'rgba(0, 0, 0, 0.46)'
        },
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
}));

function ComponentsList() {
    const classes = useStyles()

    return (
        <List className={classes.root} subheader={<li />}>
            {people.map(section => (
                <li key={`section-${section.id}`} className={classes.listSection}>
                    <ul className={classes.ul}>
                            <ListSubheader color="primary" className={classes.listTitle}>
                                {section.name} 
                                {(section.assignments && section.assignments.length > 1) ?
                                    <Typography variant="overline">{`Items: ${section.assignments.length}`}</Typography>
                                    : null
                                }
                            </ListSubheader>
                        {(section.assignments) ?
                            <>
                                {
                                    section.assignments.map(item => (
                                        <ListItem key={`item-${section.id}-${item.desc}`}>
                                            <ListItemText 
                                            primary={`Item ${item.desc}`}
                                            secondary={`Date added: ${item.date}`}
                                            />
                                        </ListItem>
                                    ))
                                }
                            </>
                            : null
                        }
                    <Divider light component="li" />
                    </ul>
                </li>
            ))}
        </List>
    );
}

export default ComponentsList