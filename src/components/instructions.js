import React from 'react'
import { Grid, Card, Typography, List, ListItemText, ListItem, CardMedia, CardContent, CardHeader, IconButton, withStyles } from '@material-ui/core'

const styles = {
  container: {
    padding: 50,
  },
  card: {
    boxShadow: 'none'
  },
  subtitle: {
    paddingRight: '24px',
    paddingLeft: '24px'
  },
  image: {
    padding: 20,
    maxHeight: 350,
    maxWidth: 586
  },
  ingredients: {
    boxShadow: 'none',
    marginTop: 80,
    maxHeight: 300,
    overflow: 'auto',
    padding: 25
  },
  directions: {
    boxShadow: 'none'
  }
}

function Instructions({ classes, recipeInfo, handleClick, isFavorited, saveRecipe, deleteRecipe }) {
  const instructions = recipeInfo.analyzedInstructions.flatMap(list => list.steps)
  const source = recipeInfo.sourceUrl
    return (
      <Grid container className={classes.container}>
        <Grid item xs={6}>
          <Card className={classes.card}>
            <CardHeader
              title={recipeInfo.title}
              action={
                <IconButton onClick={handleClick}>
                  {isFavorited === false
                    ?  <i className="far fa-heart" onClick={saveRecipe}></i>
                    : <i className="fas fa-heart" onClick={deleteRecipe}></i>
                  }
                </IconButton>
              }
            />
            <Typography className={classes.subtitle} color="textSecondary">{`Servings: ${recipeInfo.servings}`}</Typography>
            <Typography className={classes.subtitle} color="textSecondary">{`Prep Time: ${recipeInfo.preparationMinutes} minutes`}</Typography>
            <CardMedia
              className={classes.image}
              component="img"
              alt={recipeInfo.title}
              image={recipeInfo.image}
            />
          </Card>
        </Grid>
        <Grid item xs={6}>
            <Card className={classes.ingredients}>
              <CardContent>
                <Typography variant="h6">Ingredients</Typography>
                  {recipeInfo.extendedIngredients.map(ingred => (
                  <List key={ingred.id}>
                    <ListItem>
                      <ListItemText primary={ingred.original} />
                    </ListItem>
                  </List>
                  ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.directions}>
              <CardContent>
                <Typography variant="h6">Directions</Typography>
                  {recipeInfo.analyzedInstructions.length === 0
                    ? <Typography variant="h6" component="p">
                    Sorry! We are unable to load directions on this page.
                    Please visit  {<a href={`${source}`} target="_blank">recipe website</a>} for directions.
                    </Typography>
                    : instructions.map((steps, index) => {
                     return <List key={index}>
                      <ListItem>
                        <ListItemText primary={steps.number + '. ' + steps.step} />
                      </ListItem>
                    </List>
                    })}
              </CardContent>
            </Card>
          </Grid>
      </Grid>
  )
}

export default withStyles(styles)(Instructions)
