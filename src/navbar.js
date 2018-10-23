import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Tab from '@material-ui/core/Tab'
import blue from '@material-ui/core/colors/blue'

const styles = {
  navigation: {
    textTransform: 'uppercase',
    background: blue['A100'],
    boxShadow: 'none',
    color: 'black'
  },
  tabs: {
    marginTop: 4
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
                <IconButton>
                  <img src="https://png.icons8.com/windows/32/000000/meal.png"
                    width='35px'
                    height='35px'
                  />
                </IconButton>
              </Grid>
              <Grid item>
                <Tab
                  className={classes.tabs}
                  label="My List"/>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(Nav)
