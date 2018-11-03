import React, { Component } from 'react'
import Steps from './recipe-steps'
import hash from './hash'

export default class MakeRecipe extends Component {
  constructor(props) {
    super(props)
    const { path, params } = hash.parse(location.hash)
    this.state = {
      recipeInfo: null,
      currentIndex: 0,
      view: {path, params}
    }
  }

  componentDidMount() {
    const { id } = this.state.view.params
    fetch(`/ingred?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const instructions = (({ analyzedInstructions, title }) => ({ analyzedInstructions, title }))(data)
      return instructions
      })
      .then(result => this.setState({ recipeInfo: result}))
  }

  render() {
    const { recipeInfo } = this.state
    if (recipeInfo === null) return null
    return (
      <Steps recipeInfo={recipeInfo}/>
    )
  }
}
