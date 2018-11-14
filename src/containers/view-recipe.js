import React, {Component, Fragment} from 'react'
import hash from '../hash'
import Instructions from '../components/instructions'
import GroceryButton from '../components/grocery-button'
import RecipeButton from '../components/recipe-button'

export default class ViewRecipe extends Component {
  constructor(props) {
    super(props)
    const { path, params } = hash.parse(location.hash)
    this.state = {
      recipeInfo: [],
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
          const selected = (({ analyzedInstructions, extendedIngredients, preparationMinutes, servings, title, image, id, sourceUrl }) =>
            ({ analyzedInstructions, extendedIngredients, preparationMinutes, servings, title, image, id, sourceUrl }))(data)
          return selected
        })
        .then(result => this.setState({ recipeInfo: result }))
  }

  saveRecipe() {
    const { savedRecipes, recipeInfo } = this.state
    const recipe = {
      title: recipeInfo.title,
      recipeId: recipeInfo.id,
      image: recipeInfo.image,
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
      .then(data => data.map(recipe => {
        const dataId = recipe.id
        return fetch(`/my-recipes/${dataId}`, {
          method: 'DELETE'
        })
      }))
      .then(() => this.updateSavedRecipes())
  }

  updateSavedRecipes() {
    fetch('/my-recipes')
      .then(res => res.json())
      .then(updated => this.setState({ savedRecipes: updated }))
  }

  componentDidMount() {
    const { id } = this.state.view.params
    fetch('/my-recipes')
      .then(res => res.json())
      .then(data => data.map(item => item.recipeId))
      .then(result => {
        return result.filter(recipeId => recipeId.toString() === id).toString()
          ? Promise.all([
            fetch(`/ingred?id=${id}`).then(res => res.json()),
            fetch(`/my-recipes?recipeId=${id}`).then(res => res.json())
              .then(data => {
                return Boolean(data.map(id => id.saved))
              })
            ])
            .then(([data, favorited]) => this.setState({
              recipeInfo: data,
              isFavorited: favorited
            }))
          : this.getRecipeInfo()
      })

    this.updateSavedRecipes()
  }

  render() {
    const { recipeInfo, isFavorited } = this.state
    if (recipeInfo.length === 0) return null
    return (
      <Fragment>
        <Instructions handleClick={this.handleClick}
          getRecipeInfo={this.getRecipeInfo}
          recipeInfo={recipeInfo}
          isFavorited={isFavorited}
          saveRecipe={this.saveRecipe}
          deleteRecipe={this.deleteRecipe}
          updateSavedRecipes={this.updateSavedRecipes} />
          <RecipeButton />
          <GroceryButton />
      </Fragment>
    )
  }
}
