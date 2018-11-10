import React from 'react'
import { Grid, Typography, TextField, Button, withStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const styles = {
  container: {
    marginTop: 100
  },
  input: {
    display: 'inline-block',
    margin: '2rem'
  },
  textField: {
    maxWidth: 500
  },
  button: {
    marginTop: 21,
    marginLeft: 25
  }
}

function IngredientForm({ classes, handleSubmit }) {
  return (
    <Grid container
      justify="center"
      className={classes.container}>
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
    </Grid>
  )
}

export default withStyles(styles)(IngredientForm)
