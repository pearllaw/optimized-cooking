import React, {Component} from 'react'
import RecipeList from './recipe-list'

export default class GeneratedRecipes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredientList: [],
      recipes: []
    }
    this.getRecipes = this.getRecipes.bind(this)
  }

  getRecipes() {
    const { ingredientList } = this.state
    const items = ingredientList.map(item => item.ingredient)
    fetch(`/recipes?ingredients=${items}`)
      .then(res => res.json())
      .then(result => {
        this.setState({ recipes: result })
      })
  }

  componentWillMount() {
    fetch('/ingredients')
      .then(res => res.json())
      .then(ingredients => this.setState({ ingredientList: ingredients },
        () => this.getRecipes())
      )
  }

  render() {
    const { recipes } = this.state
    return (
      <RecipeList getRecipes={this.getRecipes} recipes={recipes}/>
    )
  }
}
