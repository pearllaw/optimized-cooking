import React, { Component } from 'react'
import { withStyles, Grid, GridListTile, GridListTileBar, Typography, Card, CardContent, CardHeader, CardMedia, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  container: {
    marginTop: 100
  },
  root: {
    width: '80%',
    marginTop: 60
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  recipe: {
    listStyle: 'none'
  },
  image: {
    width: '100%',
    height: 250
  },
  icon: {
    borderRadius: '50%',
    border: '1.5px solid',
    fontWeight: 600,
    padding: '3px',
    fontSize: '14px',
    color: 'midnightblue',
    position: 'relative',
    top: 30,
    left: 375
  },
  messageContainer: {
    padding: 10
  },
  message: {
    fontSize: '1.2rem'
  }
})

const theme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    },
    MuiPaper: {
      elevation1: {
        boxShadow: 'none'
      }
    },
    GridListTile: {
      root: {
        width: '100%'
      }
    }
  },
  typography: {
    useNextVariants: true
  }
})

class MyRecipes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: null
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = meal => (e, expanded) => {
    this.setState({ expanded: expanded ? meal : false })
  }

  render() {
    const { classes, savedRecipes, deleteRecipe } = this.props
    const { expanded } = this.state
    const breakfast = savedRecipes.filter(recipe => recipe.mealCategory === 'Breakfast')
    const lunch = savedRecipes.filter(recipe => recipe.mealCategory === 'Lunch')
    const dinner = savedRecipes.filter(recipe => recipe.mealCategory === 'Dinner')
    const snack = savedRecipes.filter(recipe => recipe.mealCategory === 'Snack')
    return (
      <Grid container
      alignItems="center"
      direction="column"
      spacing={40}
      className={classes.container}>
      <Typography variant="h3" align="center">My Recipes</Typography>
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'breakfast'} onChange={this.handleChange('breakfast')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Breakfast</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container
              direction="row"
              spacing={40}>
              {breakfast.length > 0
                ? breakfast.map(item =>
                  <Grid item xs={4} key={item.recipeId}>
                    <GridListTile key={item.recipeId} className={classes.recipe}>
                    <i className={`material-icons ${classes.icon}`}
                      id={item.id}
                      onClick={deleteRecipe}>clear</i>
                    <a href={`#view-recipe?id=${item.recipeId}`}>
                    <img src={item.image} alt={item.title} className={classes.image}/>
                    <GridListTileBar title={item.title} />
                    </a>
                  </GridListTile>
                  </Grid>  
              )
              : <MuiThemeProvider theme={theme}>
                  <Card className={classes.messageContainer}>
                    <CardContent>
                      <Typography variant="h3"
                      className={classes.message}>You do not have any saved breakfast recipes
                      </Typography>
                    </CardContent>
                  </Card>
                </MuiThemeProvider>
            }
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'lunch'} onChange={this.handleChange('lunch')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Lunch</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container
              direction="row"
              spacing={40}>
              {lunch.length > 0
                ? lunch.map(item =>
                  <Grid item xs={4} key={item.recipeId}>
                    <GridListTile key={item.recipeId} className={classes.recipe}>
                    <i className={`material-icons ${classes.icon}`}
                      id={item.id}
                      onClick={deleteRecipe}>clear</i>
                    <a href={`#view-recipe?id=${item.recipeId}`}>
                    <img src={item.image} alt={item.title} className={classes.image}/>
                    <GridListTileBar title={item.title} />
                    </a>
                  </GridListTile>
                  </Grid>  
                )
                : <MuiThemeProvider theme={theme}>
                  <Card className={classes.messageContainer}>
                    <CardContent>
                      <Typography variant="h3"
                      className={classes.message}>You do not have any saved lunch recipes
                      </Typography>
                    </CardContent>
                  </Card>
                </MuiThemeProvider>
              }
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'dinner'} onChange={this.handleChange('dinner')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Dinner</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Grid container
              direction="row"
              spacing={40}>
              {dinner.length > 0
                ? dinner.map(item =>
                  <Grid item xs={4} key={item.recipeId}>
                    <GridListTile key={item.recipeId} className={classes.recipe}>
                    <i className={`material-icons ${classes.icon}`}
                      id={item.id}
                      onClick={deleteRecipe}>clear</i>
                    <a href={`#view-recipe?id=${item.recipeId}`}>
                    <img src={item.image} alt={item.title} className={classes.image}/>
                    <GridListTileBar title={item.title} />
                    </a>
                  </GridListTile>
                  </Grid>  
                )
                : <MuiThemeProvider theme={theme}>
                  <Card className={classes.messageContainer}>
                    <CardContent>
                      <Typography variant="h3"
                      className={classes.message}>You do not have any saved dinner recipes
                      </Typography>
                    </CardContent>
                  </Card>
                </MuiThemeProvider>
              }
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'snack'} onChange={this.handleChange('snack')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Snacks</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Grid container
              direction="row"
              spacing={40}>
              {snack.length > 0
                ? snack.map(item =>
                  <Grid item xs={4} key={item.recipeId}>
                    <GridListTile key={item.recipeId} className={classes.recipe}>
                    <i className={`material-icons ${classes.icon}`}
                      id={item.id}
                      onClick={deleteRecipe}>clear</i>
                    <a href={`#view-recipe?id=${item.recipeId}`}>
                    <img src={item.image} alt={item.title} className={classes.image}/>
                    <GridListTileBar title={item.title} />
                    </a>
                  </GridListTile>
                  </Grid>  
                )
                : <MuiThemeProvider theme={theme}>
                  <Card className={classes.messageContainer}>
                    <CardContent>
                      <Typography variant="h3"
                      className={classes.message}>You do not have any saved snack recipes
                      </Typography>
                    </CardContent>
                  </Card>
                </MuiThemeProvider>
              }
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Grid>
    )
  }
}

export default withStyles(styles)(MyRecipes)
