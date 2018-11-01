import React, {Component} from 'react'
import { withStyles, Grid, Typography, List, ListItem, ListItemText } from '@material-ui/core'

const styles = {
  container: {
    marginTop: 100
  },
  list: {
    width: 560,
    marginTop: 40,
    backgroundColor: 'azure',
    borderRadius: '0.25rem'
  },
  link: {
    textDecoration: 'none'
  }
}

class RecipeCollection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      savedRecipes: []
    }
  }

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
          {savedRecipes.map(recipe => {
          return <ListItem key={recipe.recipeId} divider>
            <a href={`#view-recipe?id=${recipe.recipeId}`}
              className={classes.link}>
              <ListItemText primary={recipe.title} />
            </a>
          </ListItem>
          })}
        </List>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(RecipeCollection)
