import React from 'react'
import { Container, Typography, Paper, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AssigneeListGeneration from '../Components/AssigneeListGeneration/AssigneeListGeneration';
import FilterSection from '../Components/FilterSection/FilterSection'
import AddSection from '../Components/AddSection/AddSection';

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
                        <Paper className={classes.paper}>New assignment
                            <AddSection />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <FilterSection />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Paper className={classes.paper}>Assignments
                                <AssigneeListGeneration />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Layout