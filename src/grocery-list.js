import React from 'react'
import { withStyles, Grid, Typography, List, ListItem, ListItemText, Checkbox } from '@material-ui/core'
import RecipeButton from './recipe-button'

const styles = {
  container: {
    marginTop: 100
  }
}

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
          {groceries.every(grocery => grocery.checked === true) && <RecipeButton />}
        </Grid>
      </Grid>
    )
}

export default withStyles(styles)(GroceryList)
