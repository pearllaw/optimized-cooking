import React from 'react'
import { AppBar, Toolbar, Button, withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/'
import blue from '@material-ui/core/colors/blue'

const styles = theme => ({
  nav: {
    color: theme.palette
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1
  }
})

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: {
    useNextVariants: true,
  }
})

function Nav ({ classes }) {
  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="static"
        className={classes.nav}>
        <Toolbar>
          <Button color="inherit" href="#list">My List</Button>
          <Button color="inherit" href="#recipe-collection">Recipes</Button>
          <Button color="inherit" href="#grocery-list">Grocery List</Button>
        </Toolbar>
      </AppBar>
    </MuiThemeProvider>
  )
}

export default withStyles(styles)(Nav)
