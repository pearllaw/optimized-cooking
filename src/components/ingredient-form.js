import React from 'react'
import { Typography, TextField, Button, withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const styles = {
  container: {
    textAlign: 'center'
  },
  title: {
    paddingTop: 100,
    color: 'white'
  },
  root: {
    color: 'white'
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

const theme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      root: {
        color: 'white',
        fontSize: '1.1rem',
        fontWeight: 500,
        '&$focused': {
          color: 'white'
        }
      }
    },
    MuiNotchedOutline: {
      focused: {
        borderColor: 'white',
        borderWidth: '1px'
      }
    },
    MuiInputBase: {
      root: {
        color: 'white'
      },
      input: {
        color: 'white',
        fontSize: '1.1rem',
        fontWeight: 500
      }
    },
    MuiOutlinedInput: {
      root: {
        color: 'white'
      },
      notchedOutline: {
        borderColor: 'white'
      }
    }
  },
  typography: {
    useNextVariants: true,
  }
})

function IngredientForm({ classes, handleSubmit }) {
  return (
    <div className={classes.container}>
        <Typography variant="h3" align="center" className={classes.title}>What's in Your Fridge?</Typography>
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
    </div>
  )
}

export default withStyles(styles)(IngredientForm)
