import React, { Component } from 'react'
import { withStyles, MuiThemeProvider, createMuiTheme, Button } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'
import hash from '../hash'

const styles = theme => ({
  button: {
    color: theme.palette,
    marginRight: 100,
    marginBottom: 50,
    float: 'right'
  }
})

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: {
    useNextVariants: true,
  }
})

class RecipeButton extends Component {
  constructor(props) {
    super(props)
    const { path, params } = hash.parse(location.hash)
    this.state = {
      view: { path, params }
    }
  }

  render() {
    const { classes } = this.props
    const { id } = this.state.view.params
    return (
      <MuiThemeProvider theme={theme}>
        <Button className={classes.button}
          color="primary"
          variant="contained"
          href={`#instructions?id=${id}`}>Make Recipe</Button>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(RecipeButton)
