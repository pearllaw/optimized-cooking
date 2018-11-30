import React, { Component } from 'react'
import { withStyles, Grid, Typography, GridList, ListItemText, ButtonBase, Card, CardMedia, CardContent, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  container: {
    marginTop: 100
  },
  root: {
    width: '80%',
    marginTop: '50px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  // gridList: {
  //   width: 500,
  //   height: 450
  // },
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
  messageContainer: {
    marginTop: 100,
    border: '1px solid silver',
    borderRadius: '1rem',
    boxShadow: 'none',
    padding: 30
  },
  message: {
    fontSize: '1.2rem'
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
    const { breakfast } = savedRecipes.filter(recipe => recipe.mealCategory === 'breakfast')
    const { lunch } = savedRecipes.filter(recipe => recipe.mealCategory === 'Lunch')
    const { dinner } = savedRecipes.filter(recipe => recipe.mealCategory === 'Dinner')
    const { snack } = savedRecipes.filter(recipe => recipe.mealCategory === 'Snack')
    return (
      <Grid container
      alignItems="center"
      direction="column"
      spacing={40}
      className={classes.container}>
      <Typography variant="h3" align="center">My Recipes</Typography>
      {savedRecipes.length > 0
        ? <div className={classes.root}>
          <ExpansionPanel expanded={expanded === 'breakfast'} onChange={this.handleChange('breakfast')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Breakfast</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {/* Breakfast items */}
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'lunch'} onChange={this.handleChange('lunch')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Lunch</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            {/* Lunch items */}
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'dinner'} onChange={this.handleChange('dinner')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Dinner</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            {/* Dinner items */}
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'snack'} onChange={this.handleChange('snack')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Snacks</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            {/* Snack items */}
            </ExpansionPanelDetails>
          </ExpansionPanel>
          </div>



        // ? <Grid item>
        //   <List className={classes.list}>
        //   {savedRecipes.map(recipe => {
        //   return <Card className={classes.card} key={recipe.recipeId}>
        //       <CardMedia className={classes.image}
        //         image={recipe.image}
        //         title="My Saved Recipe" />
        //       <div className={classes.details}>
        //         <CardContent className={classes.content}>
        //           <ButtonBase href={`#view-recipe?id=${recipe.recipeId}`}>
        //             <ListItemText primary={recipe.title} />
        //           </ButtonBase>
        //         </CardContent>
        //         <i className={`material-icons ${classes.icon}`}
        //         id={recipe.id}
        //         onClick={deleteRecipe}>clear</i>
        //       </div>
        //     </Card>
        //   })}
        // </List>
        // </Grid>
        : <Card className={classes.messageContainer}>
            <CardContent>
              <Typography variant="h3"
                className={classes.message}>You do not have any saved recipes
              </Typography>
            </CardContent>
          </Card>
        }
      </Grid>
    )
  }
}

export default withStyles(styles)(MyRecipes)
