import React, { Component, Fragment } from 'react'
import Steps from '../components/recipe-steps'
import hash from '../hash'
import Progress from '../components/progress-bar'
import { Grid, Typography, withStyles } from '@material-ui/core'

const styles = {
  heading: {
    marginTop: 250,
    fontSize: '2rem'
  }
}

class MakeRecipe extends Component {
  constructor(props) {
    super(props)
    const { path, params } = hash.parse(location.hash)
    this.state = {
      steps: null,
      title: null,
      sourceUrl: null,
      currentIndex: 0,
      activeStep: 0,
      view: {path, params}
    }
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.handleCompleted = this.handleCompleted.bind(this)
  }

  handleNext() {
    const { currentIndex, activeStep, steps } = this.state
    this.setState({
      currentIndex: currentIndex < steps.length - 1
      ? currentIndex + 1
      : 0,
      activeStep: activeStep < steps.length - 1
      ? activeStep + 1
      : 0
    })
  }

  handlePrev() {
    const { currentIndex, activeStep, steps } = this.state
    if (currentIndex < steps.length) {
      this.setState({
        currentIndex: currentIndex - 1,
        activeStep: activeStep - 1
      })
    }
    if (currentIndex === 0) {
      this.setState({
        currentIndex: 0,
        activeStep: 0
      })
    }
  }

  handleCompleted() {
    const { activeStep } = this.state
    this.setState({ activeStep: activeStep + 1 })
  }

  componentDidMount() {
    const { id } = this.state.view.params
    fetch(`/ingred?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const instructions = (({ analyzedInstructions }) => ({ analyzedInstructions }))(data)
        const title = (({ title }) => ({ title }))(data)
        const source = (({ sourceUrl }) => ({ sourceUrl }))(data)
        this.setState({ title: title, sourceUrl: source })
        return instructions.analyzedInstructions.length === 0
          ? this.setState({ steps: null })
          : this.setState({ steps: instructions.analyzedInstructions[0].steps })
      })
  }

  render() {
    const { title, steps, currentIndex, sourceUrl, activeStep } = this.state
    const { id } = this.state.view.params
    const { classes } = this.props
    if (!title) return null
    return steps === null
    ? <Grid container
      justify="center">
        <Grid item xs={8}>
          <Typography variant="h5"
            className={classes.heading}>
            Sorry! Directions for {`${title.title}`} cannot be loaded on this page.
            Please visit  {<a href={`${sourceUrl.sourceUrl}`} target="_blank">recipe website</a>} for directions.
          </Typography>
        </Grid>
      </Grid>
    : <Fragment>
        <Steps title={title}
          steps={steps}
          currentIndex={currentIndex}
          handlePrev={this.handlePrev}
          handleNext={this.handleNext} />
        <Progress id={id}
          steps={steps}
          activeStep={activeStep}
          handleCompleted={this.handleCompleted}/>
      </Fragment>
  }
}

export default withStyles(styles)(MakeRecipe)
