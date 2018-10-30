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
  image: {
    padding: 20,
    height: 300,
    width: 570
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

class Instructions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle() {
    this.setState({ clicked: !this.state.clicked })
    const { recipeInfo } = this.props
    const recipe = {
      title: recipeInfo.title,
      recipeId: recipeInfo.id
    }
    this.props.saveRecipe(recipe)
  }

  componentWillMount() {
    this.props.getRecipeInfo()
  }

  render() {
    const { classes, recipeInfo } = this.props
    const { clicked } = this.state
    if (!recipeInfo) return null
    const instructions = recipeInfo.analyzedInstructions.flatMap(list => list.steps)
    return (
      <Grid container className={classes.container}>
        <Grid item xs={6}>
          <Card className={classes.card}>
            <CardHeader
              title={recipeInfo.title}
              subheader={`Servings: ${recipeInfo.servings} ` + `Prep Time: ${recipeInfo.preparationMinutes} minutes`}
              action={
                <IconButton onClick={this.handleToggle}>
                  {clicked === false ? <i className="far fa-heart"></i> : <i className="fas fa-heart"></i>}
               </IconButton>
              }
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
