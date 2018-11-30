import React from 'react'
import { withStyles, createMuiTheme, MuiThemeProvider, Dialog, DialogTitle, DialogContent, DialogContentText, List, ListItem, ListItemText, Checkbox, DialogActions, Button } from '@material-ui/core'

const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      paperScrollPaper: {
        maxHeight: null
      }
    },
    MuiDialogContent: {
      root: {
        padding: '0 25px 5px'
      }
    },
    MuiListItem: {
      root: {
        paddingTop: 0,
        paddingBottom: 0
      }
    },
  },
  typography: {
    useNextVariants: true
  }
})

function MealPopup({ open, mealCategory, handleClose, handleCheck }) {
  return (
    <MuiThemeProvider theme={theme}>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Save to My Recipes</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select a meal category to add this recipe to.
        </DialogContentText>
        <List>
          {mealCategory.map((meal, index) =>
          <ListItem key={index}>
            <Checkbox key={index}
              color="primary"
              checked={meal.checked}
              onChange={() => handleCheck(index)} />
            <ListItemText primary={meal.meal} />
          </ListItem>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
    </MuiThemeProvider>
  )
}

export default withStyles(theme)(MealPopup)
