import React from 'react'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import green from '@material-ui/core/colors/green'

const styles = theme => ({
  button: {
    color: theme.palette,
    float: 'right',
    margin: 30
  }
})

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: {
    useNextVariants: true,
  }
})

function GroceryButton({ classes }) {
  return (
    <MuiThemeProvider theme={theme}>
      <Button className={classes.button}
        variant="contained"
        color="primary">Create Grocery List</Button>
    </MuiThemeProvider>
  )
}

export default withStyles(styles)(GroceryButton)
