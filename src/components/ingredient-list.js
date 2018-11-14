import React from 'react'
import {Grid, List, ListItem, ListItemText, Button, withStyles, MuiThemeProvider, createMuiTheme, Typography, Input} from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'

const styles = theme => ({
  button: {
    color: theme.palette
  },
  list: window.screen.availWidth < 760
  ? { width: 260, border: '1px solid silver', borderRadius: '0.25rem' }
  : { width: 560, border: '1px solid silver', borderRadius: '0.25rem' },
  form: {
    fontSize: '1rem'
  },
  input: {
    marginLeft: 15,
    width: '15%'
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
              <ListItemText primary={item.ingredient}/>
              <i className="material-icons"
                id={item.id}
                onClick={deleteIngredient}>clear</i>
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
            value={dailyCalories} /></span>
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
