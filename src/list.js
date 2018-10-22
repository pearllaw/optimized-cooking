import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'

const styles = {
  container: {
    marginTop: 150
  },
  textField: {
    width: 600,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}

class IngredientList extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
      <Grid
        container
        direction="column"
      >
        <Typography variant="h3" align="center">What's in Your Fridge?</Typography>
        <TextField
          className={classes.textField}
          id="outlined-add-ingredient"
          label="Add an ingredient"
          margin="normal"
          variant="outlined" />
      </Grid>

      </div>
    )
  }
}

export default withStyles(styles)(IngredientList)
