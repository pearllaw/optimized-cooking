import React from 'react'
import { withStyles, Typography, Grid, Card, CardContent } from '@material-ui/core';

const styles = {
  container: {
    marginTop: 100
  },
  title: {
    margin: 20
  },
  card: {
    maxWidth: 800,
    maxHeight: 200
  }
}

function Steps({ classes, recipeInfo }) {
  const instructions = recipeInfo.analyzedInstructions.flatMap(list => list.steps)
  return (
    <Grid container
      alignItems="center"
      direction="column"
      spacing={40}>
      <Typography variant="h3"
        className={classes.container}>Whipping Up</Typography>
      <Typography variant="h4"
        className={classes.title}>{`${recipeInfo.title}`}</Typography>
      <Grid item xs={8}>
        <Card className={classes.card}>
        {instructions.map(steps => (
          <CardContent>
            <Typography variant="h5" component="h2">{'Step ' + `${steps.number}`}</Typography>
            <Typography component="p">{`${steps.step}`}</Typography>
          </CardContent>
        ))}
        </Card>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Steps)
