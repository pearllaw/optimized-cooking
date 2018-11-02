import React from 'react'
import { withStyles, MuiThemeProvider, createMuiTheme, Button, Grid } from '@material-ui/core'
import green from '@material-ui/core/colors/green'

const styles = theme => ({
  button: {
    color: theme.palette,
    float: 'right',
    marginRight: 90
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

function GroceryButton ({ classes }) {
  return (
    <MuiThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12}>
          <Button className={classes.button}
            variant="contained"
            color="primary"
            >Create Grocery List</Button>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  )
}

export default withStyles(styles)(GroceryButton)
