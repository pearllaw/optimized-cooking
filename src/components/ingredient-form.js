import React from 'react'
import { Typography, TextField, Button, withStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const styles = {
  container: {
    textAlign: 'center',
    marginTop: 100
  },
  input: {
    display: 'inline-block',
    margin: '2rem'
  },
  textField: window.screen.availWidth < 760
  ? { width: 200 }
  : { width: 500 },
  button: {
    marginTop: 21,
    marginLeft: 25
  }
}

function IngredientForm({ classes, handleSubmit }) {
  return (
    <div className={classes.container}>
        <Typography variant="h3" align="center" className={classes.title}>What's in Your Fridge?</Typography>
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
