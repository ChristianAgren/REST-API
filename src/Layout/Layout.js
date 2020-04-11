import React from 'react'
import { Container } from '@material-ui/core'
import ComponentsList from '../Components/ComponentsList/ComponentsList';

function Layout() {

    return (
        <Container maxWidth="md">
            <ComponentsList />
        </Container>
    )
}

export default Layout