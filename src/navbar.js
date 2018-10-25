import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

const styles = {
  navigation: {
    textTransform: 'uppercase',
    background: 'rgb(43,152,240)',
    boxShadow: 'none'
  },
  tabs: {
    marginTop: 10
  }
}

class Nav extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <AppBar className={classes.navigation}
          position="static">
          <Toolbar variant="dense">
            <Grid
              justify="space-between"
              container
              spacing={24}
            >
              <Grid item>
                <IconButton href="#">
                  <img src="https://png.icons8.com/windows/32/000000/meal.png"
                    width='35px'
                    height='35px'
                  />
                </IconButton>
              </Grid>
              <Grid item>
                <Button
                  className={classes.tabs}
                  href="#list">My List
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(Nav)
