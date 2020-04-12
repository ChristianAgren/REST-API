import React from 'react'
import { Container, Typography, Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ComponentsList from '../Components/ComponentsList/ComponentsList';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        minHeight: "100vh",
        height: "100%",
        backgroundColor: "#F5F5F5",
    },
    title: {
        padding: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function Layout() {
    const classes = useStyles()

    return (
        <div className={classes.mainContainer}>
            <Container maxWidth="lg">
                <Typography className={classes.title} variant="h4">
                    Assignments
                    </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.paper}>Filter/info</Paper>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Paper className={classes.paper}>Generated list
                            <ComponentsList />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Layout