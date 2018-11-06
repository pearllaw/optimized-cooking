import React, {Component} from 'react'
import RecipeList from '../components/recipe-list'

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
        const ingred = result.toString()
        return fetch(`/recipes?ingredients=${ingred}`)
          .then(res => res.json())
          .then(recipes => {
            this.setState({ recipes: recipes })
          })
      })
  }

  render() {
    const { recipes } = this.state
    if(recipes.length === 0) return null
    return (
      <RecipeList recipes={recipes}/>
    )
  }
}
