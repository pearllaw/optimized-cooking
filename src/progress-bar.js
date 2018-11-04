import React from 'react'
import { withStyles, MuiThemeProvider, createMuiTheme, Grid, Stepper, Step, StepLabel, Button } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'

const styles = theme => ({
  progress: {
    width: '65%'
  },
  button: {
    color: theme.palette,
    height: '50%'
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

function Progress({ classes, steps, activeStep, handleCompleted, id }) {
  return (
    <Grid container
      justify="center"
      direction="row"
      alignItems="center">
      <Stepper activeStep={activeStep}
        className={classes.progress}>
        {steps.map(step => (
        <Step key={step.number}>
          <StepLabel></StepLabel>
        </Step>
        ))}
    </Stepper>
    <MuiThemeProvider theme={theme}>
      {activeStep === steps.length - 1 &&
      <Button className={classes.button}
        color="primary"
        variant="contained"
        onClick={handleCompleted}
        href={`#recipe-complete?id=${id}`}>Finished</Button>
      }
    </MuiThemeProvider>
    </Grid>
  )
}

export default withStyles(styles)(Progress)
