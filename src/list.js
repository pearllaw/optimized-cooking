import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  container: {
    marginTop: 150,
    textAlign: 'center'
  },
  input: {
    display: 'inline-block',
    margin: 2 + 'rem'
  },
  textField: {
    width: 600
  },
  button: {
    marginTop: 21,
    marginLeft: 25
  }
}

class IngredientList extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <Typography variant="h3" align="center">What's in Your Fridge?</Typography>
        <span className={classes.input}>
        <TextField
          className={classes.textField}
          id="outlined-add-ingredient"
          label="Add an ingredient"
          margin="normal"
          variant="outlined"
          required />
        <Button
          className={classes.button}
          type="submit"
          variant="fab"
          mini
          color="primary"
          aria-label="Add">
          <AddIcon/>
        </Button>
        </span>
      </div>
    )
  }
}

export default withStyles(styles)(IngredientList)
