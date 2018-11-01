import React, {Component} from 'react'
import { withStyles, Grid, Typography, List, ListItem, ListItemText } from '@material-ui/core'
import hash from './hash'
// import ViewRecipe from './view-recipe'

const styles = {
  container: {
    marginTop: 100
  },
  list: {
    width: 560,
    marginTop: 40,
    border: '1px solid silver',
    borderRadius: '0.25rem'
  },
  listReq: {
    borderTop: '1px solid silver'
  }
}

class RecipeCollection extends Component {
  constructor(props) {
    super(props)
    const { path, params } = hash.parse(location.hash)
    this.state = {
      savedRecipes: [],
      view: { path, params }
    }
    // this.getRecipeInstructions = this.getRecipeInstructions.bind(this)
  }

  // getRecipeInstructions() {
  //   const { id } = this.state.view.params
  //   return <ViewRecipe id={id}/>
  // }

  componentDidMount() {
    fetch('/my-recipes')
      .then(res => res.json())
      .then(savedData => this.setState({ savedRecipes: savedData}))
  }

  render() {
    const { classes } = this.props
    const { savedRecipes } = this.state
    return (
      <Grid container
        alignItems="center"
        direction="column"
        spacing={40}
        className={classes.container}
        >
        <Typography variant="h3" align="center">My Recipes</Typography>
        <Grid item>
          <List className={classes.list}>
          {savedRecipes.map((recipe, index) => {
          return <ListItem key={index}
            id={recipe.recipeId}
            className={savedRecipes.length > 1 ? classes.listReq : null}
          >
            <ListItemText primary={recipe.title} onClick={this.getRecipeInstructions}/>
          </ListItem>
          })}
        </List>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(RecipeCollection)
