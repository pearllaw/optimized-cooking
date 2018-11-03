import React, { Component, Fragment } from 'react'
import Steps from './recipe-steps'
import hash from './hash'

export default class MakeRecipe extends Component {
  constructor(props) {
    super(props)
    const { path, params } = hash.parse(location.hash)
    this.state = {
      steps: null,
      title: null,
      currentIndex: 0,
      view: {path, params}
    }
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
  }

  handleNext() {
    const { currentIndex, steps } = this.state
    this.setState({ currentIndex: currentIndex < steps.length - 1
      ? currentIndex + 1
      : 0 })
  }

  handlePrev() {
    const { currentIndex, steps } = this.state
    if (currentIndex < steps.length) {
      this.setState({ currentIndex: currentIndex - 1 })
    }
    if (currentIndex === 0) {
      this.setState({ currentIndex: 0})
    }
  }

  componentDidMount() {
    const { id } = this.state.view.params
    fetch(`/ingred?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const instructions = (({ analyzedInstructions }) => ({ analyzedInstructions }))(data)
        const title = (({ title }) => ({ title}))(data)
        this.setState({ title: title})
        return instructions
      })
      .then(instructions => instructions.analyzedInstructions[0].steps)
      .then(res => this.setState({ steps: res}))
  }

  render() {
    const { title, steps, currentIndex } = this.state
    if (!steps) return null
    return (
      <Fragment>
      <Steps title={title}
      steps={steps}
      currentIndex={currentIndex}
      handlePrev={this.handlePrev}
      handleNext={this.handleNext}/>
      {currentIndex === steps.length - 1 &&
        <div>Add completed button here</div>
      }
      </Fragment>
    )
  }
}
