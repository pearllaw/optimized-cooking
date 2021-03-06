import React from 'react'
import { Grid, Card, Typography, List, ListItemText, ListItem, CardMedia, CardContent, CardHeader, IconButton, withStyles, CardActions, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { FacebookShareButton, TwitterShareButton, EmailShareButton, FacebookIcon, TwitterIcon, EmailIcon } from 'react-share'

const styles = {
  container: {
    padding: 50,
  },
  card: {
    boxShadow: 'none'
  },
  action: {
    display: 'flex'
  },
  subtitle: {
    paddingRight: '24px',
    paddingLeft: '24px'
  },
  image: {
    padding: 20,
    maxHeight: 350,
    maxWidth: 586
  },
  ingredients: {
    boxShadow: 'none',
    marginTop: 80,
    maxHeight: 300,
    overflow: 'auto',
    padding: 25
  },
  directions: {
    boxShadow: 'none'
  }
}

const theme = createMuiTheme({
  overrides: {
    MuiCardHeader: {
      action: {
        marginTop: 0
      }
    },
    MuiIconButton: {
      root: {
        padding: 0
      }
    }
  },
  typography: {
    useNextVariants: true
  }
})

function Instructions({ classes, recipeInfo, handleClick, isFavorited, saveRecipe, deleteRecipe }) {
  const instructions = recipeInfo.analyzedInstructions.flatMap(list => list.steps)
  const source = recipeInfo.sourceUrl
  const bull = <span className={classes.bullet}>•</span>
    return (
      <Grid container className={classes.container}>
        <Grid item xs={6}>
          <Card className={classes.card}>
          <MuiThemeProvider theme={theme}>
            <CardHeader
              title={recipeInfo.title}
              action={
                <CardActions className={classes.action}>
                  <IconButton onClick={handleClick}>
                  {isFavorited === false
                    ?  <i className="material-icons" style={{fontSize: '30px'}} onClick={saveRecipe}>favorite_border</i>
                    : <i className="material-icons" style={{fontSize: '30px'}} onClick={deleteRecipe}>favorite</i>
                  }
                  </IconButton>
                  <FacebookShareButton url={`https://optimized-cooking.herokuapp.com/#view-recipe?id=${recipeInfo.id}`}
                    quote={recipeInfo.title}>
                    <FacebookIcon size={30} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={`https://optimized-cooking.herokuapp.com/#view-recipe?id=${recipeInfo.id}`}
                    title={recipeInfo.title}
                    hashtags={['optimizedcooking', 'whippingUp', `${recipeInfo.title}`]}>
                    <TwitterIcon size={30} round />
                  </TwitterShareButton>
                  <EmailShareButton url={`https://optimized-cooking.herokuapp.com/#view-recipe?id=${recipeInfo.id}`}
                    subject={`Check out this recipe- ${recipeInfo.title}`}>
                    <EmailIcon size={30} round />
                  </EmailShareButton>
                </CardActions>
              }
            />
            </MuiThemeProvider>
            <Typography className={classes.subtitle} color="textSecondary">{`Servings: ${recipeInfo.servings}`}</Typography>
            {recipeInfo.preparationMinutes !== undefined || recipeInfo.preparationMinutes === 0 &&
            <Typography className={classes.subtitle}
              color="textSecondary">
              {`Prep Time: ${recipeInfo.preparationMinutes} minutes`}
            </Typography>}
            <CardMedia
              className={classes.image}
              component="img"
              alt={recipeInfo.title}
              image={recipeInfo.image}
            />
          </Card>
        </Grid>
        <Grid item xs={6}>
            <Card className={classes.ingredients}>
              <CardContent>
                <Typography variant="h6">Ingredients</Typography>
                  {recipeInfo.extendedIngredients.map(ingred => (
                  <List key={ingred.id}>
                    <ListItem disableGutters={true}>
                    {bull} <ListItemText primary={ingred.original} />
                    </ListItem>
                  </List>
                  ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.directions}>
              <CardContent>
                <Typography variant="h6">Directions</Typography>
                  {recipeInfo.analyzedInstructions.length === 0
                    ? <Typography variant="h6" component="p">
                    Sorry! We are unable to load directions on this page.
                    Please visit  {<a href={`${source}`} target="_blank">recipe website</a>} for directions.
                    </Typography>
                    : instructions.map((steps, index) => {
                     return <List key={index}>
                      <ListItem>
                        <ListItemText primary={steps.number + '. ' + steps.step} />
                      </ListItem>
                    </List>
                    })}
              </CardContent>
            </Card>
          </Grid>
      </Grid>
  )
}

export default withStyles(styles)(Instructions)
