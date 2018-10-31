import React, {Component} from 'react'
import hash from './hash'
import Instructions from './instructions'

export default class ViewRecipe extends Component {
  constructor(props) {
    super(props)
    const { path, params } = hash.parse(location.hash)
    this.state = {
      recipeInfo: null,
      isFavorited: false,
      savedRecipes: [],
      view: { path, params }
    }
    this.handleClick = this.handleClick.bind(this)
    this.getRecipeInfo = this.getRecipeInfo.bind(this)
    this.saveRecipe = this.saveRecipe.bind(this)
    this.deleteRecipe = this.deleteRecipe.bind(this)
    this.updateSavedRecipes = this.updateSavedRecipes.bind(this)
  }

  handleClick() {
    this.setState({ isFavorited: !this.state.isFavorited })
  }

  getRecipeInfo() {
    const { id } = this.state.view.params
    fetch(`/ingred?id=${id}`)
        .then(res => res.json())
        .then(data => {
          const selected = (({ analyzedInstructions, extendedIngredients, preparationMinutes, servings, title, image, id }) =>
            ({ analyzedInstructions, extendedIngredients, preparationMinutes, servings, title, image, id }))(data)
          return selected
        })
        .then(result => this.setState({ recipeInfo: result }))
  }

  saveRecipe() {
    const { savedRecipes, recipeInfo } = this.state
    const recipe = {
      title: recipeInfo.title,
      recipeId: recipeInfo.id,
      saved: true
    }
    fetch('/my-recipes', {
        method: 'POST',
        body: JSON.stringify(recipe),
        headers: {'Content-Type': 'application/json; charset=utf-8'}
      })
      .then(res => res.json())
      .then(data => this.setState({ savedRecipes: [...savedRecipes, data] })
      )
  }

  deleteRecipe() {
    const { id } = this.state.view.params
    fetch(`/my-recipes?recipeId=${id}`)
      .then(res => res.json())
      .then(data => {
        const dataId = data[0].id
        return fetch(`/my-recipes/${dataId}`, {
          method: 'DELETE'
        })
      })
      .then(() => this.updateSavedRecipes())
  }

  updateSavedRecipes() {
    fetch('my-recipes')
      .then(res => res.json())
      .then(updated => this.setState({ savedRecipes: updated }))
  }

  componentDidMount() {
    const { id } = this.state.view.params
    const { savedRecipes } = this.state

    if (savedRecipes.length > 0) {
      Promise.all([
      fetch(`/ingred?id=${id}`).then(res => res.json()),
      fetch(`/my-recipes?recipeId=${id}`).then(res => res.json())
      ])
      .then(([data, favorited]) => this.setState({
        recipeInfo: data,
        isFavorited: favorited[0].saved
      }))
    }
    else {
      this.getRecipeInfo()
    }

    fetch('/my-recipes')
      .then(res => res.json())
      .then(recipes => this.setState({ savedRecipes: recipes }))
  }

  render() {
    const { recipeInfo, isFavorited } = this.state
    return (
      <Instructions handleClick={this.handleClick}
        getRecipeInfo={this.getRecipeInfo}
        recipeInfo={recipeInfo}
        isFavorited={isFavorited}
        saveRecipe={this.saveRecipe}
        deleteRecipe={this.deleteRecipe}
        updateSavedRecipes={this.updateSavedRecipes} />
    )
  }
}
