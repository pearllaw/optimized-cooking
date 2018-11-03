import React from 'react'
import { withStyles, Grid, Stepper, Step, StepLabel } from '@material-ui/core'

const styles = {
  progress: {
    width: '65%'
  }
}

function Progress({ classes, steps, currentIndex }) {
  return (
    <Grid container
      justify="center">
      <Stepper activeStep={currentIndex}
        className={classes.progress}>
        {steps.map(step => (
        <Step key={step.number}>
          <StepLabel></StepLabel>
        </Step>
        ))}
    </Stepper>
    </Grid>
  )
}

export default withStyles(styles)(Progress)
