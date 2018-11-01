import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1
  }
}

function Nav ({ classes }) {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" href="#list">My List</Button>
          <Button color="inherit" href="#recipe-collection">Recipes</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(Nav)
