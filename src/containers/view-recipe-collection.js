import React, {Component} from 'react'
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
    height: 100
  },
  content: {
    flex: '1 0 auto',
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    width: 360
  },
  image: {
    width: 150,
  },
  icon: {
    fontSize: '120%',
    fontWeight: 600,
    opacity: 0.8,
    padding: '10px',
    position: 'absolute',
    color: 'white'
  }
}

class RecipeCollection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      savedRecipes: []
    }
    this.deleteRecipe = this.deleteRecipe.bind(this)
  }

  deleteRecipe(e) {
    const { savedRecipes } = this.state
    const updateRecipes = savedRecipes.filter(item => item.id !== parseInt(e.target.id, 10))
    fetch(`/my-recipes/${e.target.id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    this.setState({ savedRecipes: updateRecipes })
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
        {savedRecipes.length > 0 &&
        <Grid item>
          <List className={classes.list}>
          {savedRecipes.map(recipe => {
          return <Card className={classes.card} key={recipe.recipeId}>
              <i className={`material-icons ${classes.icon}`}
                id={recipe.id}>clear</i>
              <CardMedia className={classes.image}
                image={recipe.image}
                title="My Saved Recipe" />
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <ButtonBase href={`#view-recipe?id=${recipe.recipeId}`}>
                      <ListItemText primary={recipe.title} />
                    </ButtonBase>
                  </CardContent>
                </div>
            </Card>
          })}
        </List>
        </Grid>
        }
      </Grid>
    )
  }
}

export default withStyles(styles)(RecipeCollection)
