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
    this.state = {
      ingredientList: [],
      recipes: [],
      instructions: [],
      view: hash.parse(location.hash)
    }
    this.addIngredient = this.addIngredient.bind(this)
    this.getRecipes = this.getRecipes.bind(this)
    this.getInstructions = this.getInstructions.bind(this)
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

  getInstructions(e) {
    const id = parseInt(e.target.id, 10)
    fetch(`/instructions?id=${id}`)
      .then(res => res.json())
      .then(data => data.map(step => step.steps))
      .then(newArr => newArr[0])
      .then(result => this.setState({ instructions: result }))
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
        })
      )

    fetch('/recipes')
        .then(res => res.json())
        .then(recipes => this.setState({ recipes: recipes },
          () => {
            this.getInstructions
          })
        )
  }

  renderView() {
    const { path } = this.state.view
    const { ingredientList, recipes, instructions } = this.state
    switch (path) {
      case 'list':
        return (
        <Fragment>
          <AddIngredient addIngredient={this.addIngredient} />
          <IngredientList ingredientList={ingredientList} getRecipes={this.getRecipes} />
        </Fragment>
        )
      case 'get-recipes':
        return <ShowRecipes recipes={recipes} getInstructions={this.getInstructions}/>
      case 'view-recipe':
        return <Instructions instructions={instructions} />
      default:
        return <AddIngredient recipes={recipes} addIngredient={this.addIngredient} />
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
