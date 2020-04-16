import React from 'react'
import {
    makeStyles,
    fade,
    Button,
    IconButton,
    InputBase
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
    searchBar: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    searchIdentification: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#FFFFFFCC',
        border: 'none'
    },
    search: {
        borderRadius: theme.shape.borderRadius,
        border: '1px solid white',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        margin: theme.spacing(0, 1),
        padding: theme.spacing(0, 1.2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(3em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '18ch',
            '&:focus': {
                width: '25ch',
            },
        },
    },
}));

function FilterSection(props) {
    const classes = useStyles()
    const [searchInput, setSearchInput] = React.useState('')

    const handleInputChange = (event) => {
        setSearchInput(event.target.value)   
    }

    return (
        <div className={classes.searchBar}>
            <div className={classes.search}>
                <Button className={classes.searchIdentification}>
                    ID
                </Button>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    onChange={(event) => handleInputChange(event)}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>
            <IconButton onClick={() => props.handleSearch(searchInput)} className={classes.searchIcon} edge="end" aria-label="complete">
                <SearchIcon fontSize="small" />
            </IconButton>
            {/* <div className={classes.searchIcon}>

            </div> */}
        </div>
    )
}

export default FilterSection