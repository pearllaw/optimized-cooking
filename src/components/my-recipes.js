import React from 'react'
import { withStyles, Grid, Typography, List, ListItemText, ButtonBase, Card, CardMedia, CardContent, CardHeader } from '@material-ui/core'

const styles = {
  container: {
    marginTop: 100
  },
  list: {
    width: 560,
    borderRadius: '0.25rem'
  },
  card: {
    display: 'flex',
    margin: 15,
    height: 100,
    width: 500
  },
  details: {
    display: 'flex',
    alignItems: 'center'
  },
  content: {
    display: 'inline-block',
    width: 300
  },
  image: {
    width: 200,
  },
  icon: {
    fontSize: '120%',
    fontWeight: 600,
    opacity: 0.8,
    padding: '5px',
    position: 'relative',
    bottom: '30px',
    right: '10px'
  },
  message: {
    marginTop: 150,
    fontSize: '2rem'
  }
}

function MyRecipes({ classes, savedRecipes, deleteRecipe }) {
  return (
    <Grid container
      alignItems="center"
      direction="column"
      spacing={40}
      className={classes.container}>
      <Typography variant="h3" align="center">My Recipes</Typography>
      {savedRecipes.length > 0
        ? <Grid item>
          <List className={classes.list}>
          {savedRecipes.map(recipe => {
          return <Card className={classes.card} key={recipe.recipeId}>
              <CardMedia className={classes.image}
                image={recipe.image}
                title="My Saved Recipe" />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <ButtonBase href={`#view-recipe?id=${recipe.recipeId}`}>
                    <ListItemText primary={recipe.title} />
                  </ButtonBase>
                </CardContent>
                <i className={`material-icons ${classes.icon}`}
                id={recipe.id}
                onClick={deleteRecipe}>clear</i>
              </div>
            </Card>
          })}
        </List>
        </Grid>
        : <Typography variant="h5"
          className={classes.message}>You do not have any saved recipes</Typography>
        }
      </Grid>
  )
}

export default withStyles(styles)(MyRecipes)
