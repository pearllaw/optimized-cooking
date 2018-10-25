import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

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

class IngredientList extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.getRecipes()
  }

  render() {
    const { classes, ingredientList } = this.props
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
            </ListItem>
          })}
          </List>
      </Grid>
      {ingredientList.length > 0 &&
      <Grid item>
        <Button className={classes.button}
          href="#get-recipes"
          variant="contained"
          onClick={this.handleClick}
          >Generate Recipes</Button>
      </Grid>
      }
    </Grid>
    )
  }
}

export default withStyles(styles)(IngredientList)
