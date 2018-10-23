import React, {Component} from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  list: {
    maxWidth: 500,
    maxHeight: 800,
    overflow: 'auto',
    marginLeft: 350,
    border: '1px solid silver',
    borderRadius: '0.25rem'
  }
}

class IngredientList extends Component {
  render() {
    const { classes, ingredientList } = this.props
    return (
    <List className={classes.list}>
      {ingredientList.map(item => {
        return <ListItem key={item.id}>
          <ListItemText primary={item.ingredient}/>
        </ListItem>
      })}
    </List>
    )
  }
}

export default withStyles(styles)(IngredientList)
