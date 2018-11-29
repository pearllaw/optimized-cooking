import React, { Component } from 'react'
import { withStyles, DialogTitle, DialogContent, DialogContentText, ListItem, ListItemText } from '@material-ui/core'

const styles = {

}

class MealPopup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  render() {
    const { open } = this.state
    return (
    <Dialog open={open} onClose={this.handleClose}>
      <DialogTitle>Save to My Recipes</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select a meal category to add this recipe to.
        </DialogContentText>
        <List>
          <ListItem>
            <Checkbox color="primary" />
            <ListItemText primary="Breakfast"/>
          </ListItem>
          <ListItem>
            <Checkbox color="primary" />
            <ListItemText primary="Lunch"/>
          </ListItem>
          <ListItem>
            <Checkbox color="primary" />
            <ListItemText primary="Dinner"/>
          </ListItem>
          <ListItem>
            <Checkbox color="primary" />
            <ListItemText primary="Snack"/>
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
    )
  }
}

export default withStyles(styles)(MealPopup)
