/* roboto-100normal - latin */

import React, { Component } from 'react'
import 'typeface-roboto'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'


export default class IngredientList extends Component {
  render() {
    return (
      <div>
      <Grid container direction="column" justify="center">
        <Typography variant="h3">What's in Your Fridge?</Typography>

      </Grid>

      </div>
    )
  }
}
