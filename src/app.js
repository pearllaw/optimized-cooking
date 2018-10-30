import React, {Component, Fragment} from 'react'
import Nav from './navbar'
import AddIngredient from './add-ingredient'
import IngredientList from './list'
import ShowRecipes from './recipe-list'
import hash from './hash'
import Instructions from './instructions'

export default class Recipes extends Component {
  constructor(props) {
    super(props)
    const { path, params } = hash.parse(location.hash)
    this.state = {
      ingredientList: [],
      savedRecipes: [],
      recipes: [],
      recipeInfo: null,
      view: { path, params }
    }
    this.addIngredient = this.addIngredient.bind(this)
    this.getRecipes = this.getRecipes.bind(this)
    this.getRecipeInfo = this.getRecipeInfo.bind(this)
    this.saveRecipe = this.saveRecipe.bind(this)
  }

  addIngredient(ingredient) {
    const { ingredientList } = this.state
    fetch('/ingredients', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    })
      .then(res => res.json())
      .then(item => this.setState({ ingredientList: [...ingredientList, item] }))
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

  saveRecipe(recipe) {
    const { savedRecipes } = this.state
    fetch('/saved-recipes', {
      method: 'POST',
      body: JSON.stringify(recipe),
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    })
    .then(res => res.json())
    .then(data => this.setState({ savedRecipes: [...savedRecipes, data]}))
  }

  componentDidMount() {
    window.onhashchange = () => {
      const { path, params } = hash.parse(location.hash)
      this.setState({ view: { path, params } })
    }

    fetch('/ingredients')
      .then(res => res.json())
      .then(ingredients => this.setState({ ingredientList: ingredients },
        () => {
        this.getRecipes()
        })
      )
  }

  renderView() {
    const { path, params } = this.state.view
    const { ingredientList, recipes, recipeInfo } = this.state
    switch (path) {
      case 'list':
        return (
        <Fragment>
          <AddIngredient addIngredient={this.addIngredient} />
          <IngredientList ingredientList={ingredientList}
            getRecipes={this.getRecipes} />
        </Fragment>
        )
      case 'get-recipes':
        return <ShowRecipes recipes={recipes} />
      case 'view-recipe':
        const { id } = params
        return <Instructions id={id}
          recipeInfo={recipeInfo}
          getRecipeInfo={this.getRecipeInfo}
          saveRecipe={this.saveRecipe} />
      default:
        return <AddIngredient addIngredient={this.addIngredient} />
    }
  }

  render () {
    return (
      <Fragment>
        <Nav/>
        {this.renderView()}
      </Fragment>
    )
  }
}
