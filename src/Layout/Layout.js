import React, { useEffect } from 'react'
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
    const [assignments, setAssignments] = React.useState(null)

    useEffect(() => {
        getAssignmentsFromJson()
    }, [])

    //Get assignments

    async function getAssignment(url, target) {
        const response = await fetch((target) ? url + target : url, {
            method: 'GET'
        });
        return response.json();
    }

    const getAssignmentsFromJson = (target) => {
        getAssignment('http://localhost:3000/api/assignments/', target)
            .then((data) => {
                setAssignments(data)
            });
    }

    //Post assignment

    async function postAssignment(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    //Delete assignment

    async function deleteAssignment(url, target) {
        const response = await fetch(url + target, {
            method: 'DELETE', 
        });
        return response.json();
    }

    const deleteAssignmentFromJson = (target) => {
        deleteAssignment('http://localhost:3000/api/assignments/', target)
            .then((data) => {
                setAssignments(data)
            });
    }

    const handleSaveClick = (inputValues) => {
        console.log(inputValues);
        
        postAssignment('http://localhost:3000/api/assignments/', inputValues)
            .then((data) => {
                setAssignments(data)
            });
    }

    return (
        <div className={classes.mainContainer}>
            <Container maxWidth="lg">
                <Typography className={classes.title} variant="h4">
                    Assignments
                    </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.paper}>New assignment
                            <AddSection handleSaveClick={handleSaveClick} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <FilterSection />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Paper style={{marginBottom: '2rem'}} className={classes.paper}>Assignments
                                <AssigneeListGeneration 
                                    removeAssignment={deleteAssignmentFromJson} 
                                    assignments={assignments} 
                                />
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