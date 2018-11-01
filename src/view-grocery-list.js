import React, {Component} from 'react'
import { withStyles, Grid, Typography, List, ListItem, ListItemText } from '@material-ui/core'

const styles = {
  container: {
    marginTop: 100
  }
}

class GroceryList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groceries: []
    }
  }

  componentDidMount() {

  }

  render() {
    const { classes } = this.props
    return (
      <Grid container
      alignItems="center"
      direction="column"
      spacing={40}
      className={classes.container}
      >
      <Typography variant="h3" align="center">Grocery List</Typography>
        <Grid item>
          <List className={classes.list}>
          {items.map((item, index) => {
          return <ListItem key={index}>
              <ListItemText primary={item.ingredient} />
          </ListItem>
          })}
          </List>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(GroceryList)
