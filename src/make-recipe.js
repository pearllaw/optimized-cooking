import React, { Component } from 'react'
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
    if (steps === null) return null
    return (
      <Steps title={title}
      steps={steps}
      currentIndex={currentIndex}/>
    )
  }
}
