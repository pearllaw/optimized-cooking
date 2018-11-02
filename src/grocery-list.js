import React from 'react'
import { withStyles, MuiThemeProvider, createMuiTheme, Grid, Typography, List, ListItem, ListItemText, Checkbox, Button } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'

const styles = theme => ({
  container: {
    marginTop: 100
  },
  button: {
    color: theme.palette
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

function GroceryList ({ classes, groceries, handleCheck }) {
    return (
      <Grid container
      alignItems="center"
      direction="column"
      spacing={40}
      className={classes.container}
      >
      <Typography variant="h3" align="center">Grocery List</Typography>
        <Grid item>
          <List>
          {groceries.map((grocery, index) => {
          return <ListItem key={index}>
              <Checkbox
                key={index}
                checked={grocery.checked}
                onChange={() => handleCheck(index)}
              />
              <ListItemText primary={grocery.item} />
          </ListItem>
          })}
          </List>
        </Grid>
        <Grid item>
          {groceries.every(grocery => grocery.checked === true) &&
          <MuiThemeProvider theme={theme}>
            <Button className={classes.button}
              color="primary"
              variant="contained"
              href="#instructions">Make Recipe</Button>
          </MuiThemeProvider>
          }
        </Grid>
      </Grid>
    )
}

export default withStyles(styles)(GroceryList)
