import React, {Component, Fragment} from 'react'
import Nav from './navbar'
import AddIngredient from './add-ingredient'
import IngredientList from './list'
import ShowRecipes from './recipe-list'
import hash from './hash'

export default class Recipes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredientList: [],
      recipeImages: [],
      view: hash.parse(location.hash)
    }
    this.addIngredient = this.addIngredient.bind(this)
    this.getRecipes = this.getRecipes.bind(this)
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
      .then(recipes => {
        const filtered = []
        recipes.map(recipe => {
          filtered.push({title: recipe.title, image: recipe.image})
        })
        return filtered
      })
      .then(result => {
        this.setState({ recipeImages: result })
      })
  }

  componentDidMount() {
    window.onhashchange = () => {
      this.setState({ view: hash.parse(location.hash) })
    }

    fetch('/ingredients')
      .then(res => res.json())
      .then(ingredients => this.setState({ ingredientList: ingredients },
        () => {
        this.getRecipes()
        }
      ))
  }

  renderView() {
    const { path } = this.state.view
    const { ingredientList, recipeImages } = this.state
    switch (path) {
      case 'list':
        return (
        <Fragment>
          <AddIngredient addIngredient={this.addIngredient} />
          <IngredientList ingredientList={ingredientList} getRecipes={this.getRecipes} />
        </Fragment>
        )
      case 'get-recipes':
        return <ShowRecipes recipeImages={recipeImages} />
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
