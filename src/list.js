import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'

const styles = theme => ({
  list: {
    width: 560,
    border: '1px solid silver',
    borderRadius: '0.25rem'
  },
  button: {
    color: theme.palette
  }
})

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  typography: {
    useNextVariants: true,
  }
})

class IngredientList extends Component {
  render() {
    const { classes, ingredientList } = this.props
    return (
    <Grid container
      alignItems="center"
      direction="column"
      spacing={40}
      >
      <Grid item>
          <List className={classes.list}>
          {ingredientList.map(item => {
            return <ListItem key={item.id}>
              <ListItemText primary={item.ingredient}/>
            </ListItem>
          })}
          </List>
      </Grid>
      {ingredientList.length > 0 &&
      <Grid item>
        <MuiThemeProvider theme={theme}>
          <Button className={classes.button} href="#get-recipes" variant="contained" color="primary">Generate Recipes</Button>
        </MuiThemeProvider>
      </Grid>
      }
    </Grid>
    )
  }
}

export default withStyles(styles)(IngredientList)
