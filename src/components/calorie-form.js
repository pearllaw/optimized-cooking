import React from 'react'
import { Typography, Input, withStyles } from '@material-ui/core'

const styles = {
  form: {
    fontSize: '1rem'
  },
  input: {
    marginLeft: 15,
    width: '15%'
  }
}

function CalorieForm({ classes }) {
  return (
    <Typography component="h3"
      className={classes.form}>My daily calorie maximum is:
      <span><Input placeholder="2500"
        className={classes.input} /></span>
    </Typography>
  )
}

export default withStyles(styles)(CalorieForm)
