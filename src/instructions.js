import React, {Component} from 'react'
import { Grid, Card, Typography, List, ListItemText, ListItem, CardMedia, CardContent, CardHeader, IconButton, Avatar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  container: {
    padding: 50,
  },
  card: {
    boxShadow: 'none'
  },
  icon: {
    right: 400
  },
  image: {
    padding: 20,
    height: 300,
    width: 570
  },
  ingredients: {
    boxShadow: 'none',
    marginTop: 80,
    maxHeight: 300,
    overflow: 'auto'
  },
  directions: {
    boxShadow: 'none'
  }
}

class Instructions extends Component {

  componentDidMount() {
    this.props.getRecipeInfo()
  }

  render() {
    const { recipeInfo, classes } = this.props
    if (!recipeInfo) return null
    const instructions = recipeInfo.analyzedInstructions.flatMap(list => list.steps)
    return (
      <Grid container className={classes.container}>
        <Grid item xs={6}>
          <Card className={classes.card}>
            <CardHeader
              action={
                <IconButton className={classes.icon}>
                  <i className="far fa-heart"></i>
               </IconButton>
              }
              title={recipeInfo.title}
              subheader={`Servings: ${recipeInfo.servings} ` + `Prep Time: ${recipeInfo.preparationMinutes} minutes`}
            />
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
                  {instructions.map((steps, index) => (
                     <List key={index}>
                      <ListItem>
                        <ListItemText primary={steps.number + '. ' + steps.step} />
                      </ListItem>
                    </List>
                    ))}
              </CardContent>
            </Card>
          </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Instructions)
