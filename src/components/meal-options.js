import React from 'react'
import { withStyles, Dialog, DialogTitle, DialogContent, DialogContentText, List, ListItem, ListItemText, Checkbox, DialogActions, Button } from '@material-ui/core'

const styles = {

}

function MealPopup({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
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
      <DialogActions>
        <Button onClick={handleClose} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(MealPopup)
