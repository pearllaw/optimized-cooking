import React from 'react'
import {Typography, Input, Icon, Grid, List, ListItem, ListItemText, Button, withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'

const styles = theme => ({
  button: {
    color: theme.palette
  },
  list: window.screen.availWidth < 760
  ? { width: 260, border: '1px solid white', borderRadius: '0.25rem' }
  : { width: 560, border: '1px solid white', borderRadius: '0.25rem' },
  icon: {
    color: 'white'
  },
  form: {
    fontSize: '1.1rem',
    color: 'white'
  },
  input: {
    marginLeft: 15,
    width: '12%',
    color: 'white',
    fontSize: '1.1rem',
    borderBottom: '1px solid white'
  }
})

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  overrides: {
    MuiListItemText: {
      primary: {
        color: '#fff',
        fontSize: '1.1rem',
        fontWeight: 500
      }
    }
  },
  typography: {
    useNextVariants: true,
  }
})


function IngredientList({ classes, ingredientList, deleteIngredient, setCalories, dailyCalories, getRecipebyCal }) {
  return (
    <Grid container
      alignItems="center"
      direction="column"
      spacing={40}>
      <Grid item>
          <List className={classes.list}>
          {ingredientList.map(item => {
            return <ListItem key={item.id}>
              <MuiThemeProvider theme={theme}>
                <ListItemText primary={item.ingredient} />
              </MuiThemeProvider>
              <Icon className={classes.icon}
                id={item.id}
                onClick={deleteIngredient}>clear</Icon>
            </ListItem>
          })}
          </List>
      </Grid>
      <Grid item>
        <Typography component="h3"
          className={classes.form}>My daily calorie maximum is:
          <span><Input placeholder="2500"
            className={classes.input}
            onChange={setCalories}
            value={dailyCalories}
            disableUnderline /></span>
        </Typography>
      </Grid>
      {ingredientList.length > 0 &&
      <Grid item>
      <MuiThemeProvider theme={theme}>
        <Button className={classes.button}
          href={dailyCalories ? "#recipes-by-calorie" : "#get-recipes"}
          variant="contained"
          color="primary"
          onClick={dailyCalories ? getRecipebyCal : null}>Generate Recipes</Button>
      </MuiThemeProvider>
      </Grid>
      }
    </Grid>
  )
}

export default withStyles(styles)(IngredientList)
