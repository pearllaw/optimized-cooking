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
     <div>Hello</div>
    )
  }
}

export default withStyles(styles)(GroceryList)
