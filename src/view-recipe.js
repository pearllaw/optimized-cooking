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
  }

  handleClick() {
    const { isFavorited } = this.state
    this.setState({ isFavorited: !this.state.isFavorited })
    isFavorited === !true
      ? this.saveRecipe()
      : this.deleteRecipe()
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

  deleteRecipe(e) {
    console.log(e.target.id)
    const { id } = parseInt(e.target.id, 10)
    const { savedRecipes } = this.state
    const updatedRecipeList = savedRecipes.filter(recipe => recipe.recipeId !== id)
    fetch(`/my-recipes/${e.target.id}`, {
      method: 'DELETE'
    })
    this.setState({ savedRecipes: updatedRecipeList })
  }

  componentDidMount() {
    const { id } = this.state.view.params
    Promise.all([
      this.getRecipeInfo(),
      fetch(`/my-recipes?recipeId=${id}`)
      ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data, favorited]) => this.setState({
        recipeInfo: data,
        isFavorited: favorited.saved
      }))

  }

  render() {
    const { recipeInfo, isFavorited } = this.state
    return (
      <Instructions handleClick={this.handleClick}
        getRecipeInfo={this.getRecipeInfo}
        recipeInfo={recipeInfo}
        isFavorited={isFavorited} />
    )
  }
}
