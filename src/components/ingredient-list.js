import React from 'react'
import {Grid, List, ListItem, ListItemText, Button, withStyles, MuiThemeProvider, createMuiTheme} from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'

const styles = theme => ({
  button: {
    color: theme.palette
  },
  list: {
    width: 560,
    border: '1px solid silver',
    borderRadius: '0.25rem'
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


function IngredientList({ classes, ingredientList, deleteIngredient }) {
  return (
    <Grid container
      alignItems="center"
      direction="column"
      spacing={40}
      >
      <Grid item>
          <List className={classes.list}>
          {ingredientList.map(item => {
            return <ListItem key={item.id}>
              <ListItemText primary={item.ingredient}/>
              <i className="material-icons"
                id={item.id}
                onClick={deleteIngredient}>clear</i>
            </ListItem>
          })}
          </List>
      </Grid>
      {ingredientList.length > 0 &&
      <Grid item>
      <MuiThemeProvider theme={theme}>
        <Button className={classes.button}
          href="#get-recipes"
          variant="contained"
          color="primary">Generate Recipes</Button>
      </MuiThemeProvider>
      </Grid>
      }
    </Grid>
  )
}

export default withStyles(styles)(IngredientList)
