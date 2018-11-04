import React from 'react'
import {Grid, List, ListItem, ListItemText, Button, withStyles} from '@material-ui/core'

const styles = {
  list: {
    width: 560,
    border: '1px solid silver',
    borderRadius: '0.25rem'
  },
  button: {
    background: 'rgb(80,173,85)'
  }
}

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
        <Button className={classes.button}
          href="#get-recipes"
          variant="contained">Generate Recipes</Button>
      </Grid>
      }
    </Grid>
  )
}

export default withStyles(styles)(IngredientList)
