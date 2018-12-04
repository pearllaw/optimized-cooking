import React from 'react'
import { Typography, TextField, Button, withStyles, createMuiTheme, MuiThemeProvider, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const styles = theme => ({
  container: {
    textAlign: 'center',
    zIndex: 10
  },
  title: {
    paddingTop: 100,
  },
  input: {
    display: 'inline-block',
    margin: '2rem'
  },
  textField: {
    width: 500
  },
  button: {
    marginTop: 21,
    marginLeft: 25
  },
  tooltip: {
    maxWidth: 500,
    fontSize: 14,
    marginTop: 0
  }
})

const theme = createMuiTheme({
  overrides: {
    MuiNotchedOutline: {
      root: {
        borderColor: 'black'
      }
    }
  },
  typography: {
    useNextVariants: true
  }
})

function IngredientForm({ classes, handleSubmit }) {
  const tip = `💡 For best results, specify each ingredient in detail (e.g. brie cheese)`
  return (
    <div className={classes.container}>
        <Typography variant="h3" align="center" className={classes.title}>What's in Your Fridge?</Typography>
        <Tooltip classes={{tooltip: classes.tooltip}}
          title={tip} 
          placement="bottom-start" 
          onOpen={setTimeout}>
        <form className={classes.input} onSubmit={handleSubmit}>
        <MuiThemeProvider theme={theme}>
          <TextField
            className={classes.textField}
            id="ingredient"
            label="Add an ingredient"
            margin="normal"
            variant="outlined"
            required />
          </MuiThemeProvider>
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
        </Tooltip>
    </div>
  )
}

export default withStyles(styles)(IngredientForm)
