import React, { Component } from 'react'
import IngredientForm from '../components/ingredient-form'
import IngredientList from '../components/ingredient-list'

export default class Ingredients extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredientList: [],
      dailyCalories: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addIngredient = this.addIngredient.bind(this)
    this.deleteIngredient = this.deleteIngredient.bind(this)
    this.setCalories = this.setCalories.bind(this)
    this.getRecipebyCal = this.getRecipebyCal.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const newIngredient = {
      ingredient: e.target['ingredient'].value
    }
    this.addIngredient(newIngredient)
    e.target.reset()
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

  deleteIngredient(e) {
    const { ingredientList } = this.state
    const updatedList = ingredientList.filter(item => item.id !== parseInt(e.target.id, 10))
    fetch(`/ingredients/${e.target.id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
    this.setState({ ingredientList: updatedList })
  }

  setCalories(e) {
    this.setState({ dailyCalories: e.target.value })
  }

  getRecipebyCal() {
    const totalCalories = {
      calories: this.state.dailyCalories
    }
    fetch('/daily-calories/1', {
      method: 'PUT',
      body: JSON.stringify(totalCalories),
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    })
  }

  componentDidMount() {
    fetch('/ingredients')
      .then(res => res.json())
      .then(ingredients => this.setState({ ingredientList: ingredients }))
  }

  render() {
    const { ingredientList, dailyCalories } = this.state
    return (
      <div>
        <IngredientForm handleSubmit={this.handleSubmit} />
        {ingredientList.length > 0 &&
        <IngredientList ingredientList={ingredientList}
          deleteIngredient={this.deleteIngredient}
          setCalories={this.setCalories}
          dailyCalories={dailyCalories}
          getRecipebyCal={this.getRecipebyCal} />
        }
      </div>
    )
  }
}
