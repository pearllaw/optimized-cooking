import React, {Component} from 'react'
import RecipeList from './recipe-list'

export default class GeneratedRecipes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: []
    }
  }

  componentDidMount() {
    fetch('/ingredients')
      .then(res => res.json())
      .then(list => list.map(item => item.ingredient))
      .then(result => {
        fetch(`/recipes?ingredients=${result}`)
          .then(res => res.json())
          .then(recipes => {
            this.setState({ recipes: recipes })
          })
      })
  }

  render() {
    const { recipes } = this.state
    return (
      <RecipeList recipes={recipes}/>
    )
  }
}
