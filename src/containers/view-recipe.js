import React, {Component, Fragment} from 'react'
import hash from '../hash'
import Instructions from '../components/instructions'
import GroceryButton from '../components/grocery-button'
import RecipeButton from '../components/recipe-button'
import MealPopup from '../components/meal-options'

export default class ViewRecipe extends Component {
  constructor(props) {
    super(props)
    const { path, params } = hash.parse(location.hash)
    this.state = {
      recipeInfo: [],
      isFavorited: false,
      open: false,
      mealCategory: [
        {meal: 'Breakfast', checked: false},
        {meal: 'Lunch', checked: false},
        {meal: 'Dinner', checked: false},
        {meal: 'Snack', checked: false}
      ],
      savedRecipes: [],
      view: { path, params }
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.getRecipeInfo = this.getRecipeInfo.bind(this)
    this.saveRecipe = this.saveRecipe.bind(this)
    this.deleteRecipe = this.deleteRecipe.bind(this)
    this.updateSavedRecipes = this.updateSavedRecipes.bind(this)
  }

  handleClick() {
    const { mealCategory } = this.state
    this.setState({
      isFavorited: !this.state.isFavorited,
      open: true,
    })
    const checked = mealCategory.filter(meal => meal.checked)
    if (this.state.isFavorited && checked) {
      const updateSavedMeals = mealCategory.map(meal => Object.assign({}, meal, {checked: false}))
      this.setState({ mealCategory: updateSavedMeals })
    }
  }

  handleClose() {
    const { id } = this.state.view.params
    const savedMeal = this.state.mealCategory.filter(meal => meal.checked)
    const mealType = {
      mealCategory: savedMeal[0].meal
    }
    fetch(`/my-recipes?recipeId=${id}`)
      .then(res => res.json())
      .then(data => data.map(recipe => {
        const dataId = recipe.id
        return fetch(`/my-recipes/${dataId}`, {
          method: 'PATCH',
          body: JSON.stringify(mealType),
          headers: {'Content-Type': 'application/json; charset=utf-8'}
        })
      }))
    this.setState({ open: false })
  }

  handleCheck(index) {
    const checkedMeal = this.state.mealCategory.map((meal, mealIndex) => {
      return mealIndex === index
        ? Object.assign({}, meal, {checked: !meal.checked})
        : meal
    })
    this.setState({ mealCategory: checkedMeal })
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
    const { recipeInfo, isFavorited, open, mealCategory } = this.state
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
        {isFavorited
          ? <MealPopup open={open}
            mealCategory={mealCategory}
            handleClose={this.handleClose}
            handleCheck={this.handleCheck} />
          : null
        }
        <RecipeButton />
        <GroceryButton />
      </Fragment>
    )
  }
}
