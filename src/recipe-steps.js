import React from 'react'
import { withStyles, Typography, Grid, Card, CardContent } from '@material-ui/core';

const styles = {
  container: {
    marginTop: 100
  },
  title: {
    margin: 10
  },
  card: {
    maxWidth: 800,
    maxHeight: 200,
    boxShadow: 'none',
    border: '1px solid black',
    padding: 20,
    margin: 20,
    overflow: 'scroll'
  },
  number: {
    letterSpacing: '0.1rem'
  },
  step: {
    padding: 10,
    lineHeight: '1.5rem'
  }
}

function Steps({ classes, steps, currentIndex, title }) {
  return (
    <Grid container
      alignItems="center"
      direction="column"
      spacing={40}>
      <Typography variant="h3"
        className={classes.container}>Whipping Up</Typography>
      <Typography variant="h4"
        className={classes.title}>{`${title.title}`}</Typography>
      <Grid item xs={8}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5"
              align="center"
              className={classes.number}>{'Step ' + `${steps[currentIndex].number}`}</Typography>
            <Typography component="p"
              className={classes.step}>{`${steps[currentIndex].step}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Steps)
