import React from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  container: {
    marginTop: 100,
    textAlign: 'center'
  },
  input: {
    display: 'inline-block',
    margin: 2 + 'rem'
  },
  textField: {
    width: 500
  },
  button: {
    marginTop: 21,
    marginLeft: 25
  }
}

function IngredientForm({ classes, handleSubmit }) {
  return (
    <div className={classes.container}>
        <Typography variant="h3" align="center">What's in Your Fridge?</Typography>
        <form className={classes.input} onSubmit={handleSubmit}>
          <TextField
            className={classes.textField}
            id="ingredient"
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
            aria-label="add">
            <AddIcon/>
          </Button>
        </form>
      </div>
  )
}

export default withStyles(styles)(IngredientForm)
