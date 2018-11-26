import React, {Component} from 'react'
import MyRecipes from '../components/my-recipes'

export default class RecipeCollection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      savedRecipes: []
    }
    this.deleteRecipe = this.deleteRecipe.bind(this)
  }

  deleteRecipe(e) {
    const { savedRecipes } = this.state
    const updateRecipes = savedRecipes.filter(item => item.id !== parseInt(e.target.id, 10))
    fetch(`/my-recipes/${e.target.id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    this.setState({ savedRecipes: updateRecipes })
  }

  componentDidMount() {
    fetch('/my-recipes')
      .then(res => res.json())
      .then(savedData => this.setState({ savedRecipes: savedData}))
  }

  render() {
    const { savedRecipes } = this.state
    return (
      <MyRecipes savedRecipes={savedRecipes}
        deleteRecipe={this.deleteRecipe}/>
    )
  }
}
