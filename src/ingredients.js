import React, { Component, Fragment } from 'react'
import IngredientForm from './ingredient-form'
import IngredientList from './ingredient-list'

export default class Ingredients extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredientList: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addIngredient = this.addIngredient.bind(this)
    this.deleteIngredient = this.deleteIngredient.bind(this)
    this.handleClick = this.handleClick.bind(this)
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

  handleClick() {
    this.props.getRecipes()
  }

  componentDidMount() {
    fetch('/ingredients')
      .then(res => res.json())
      .then(ingredients => this.setState({ ingredientList: ingredients }))
  }

  render() {
    const { ingredientList } = this.state
    return (
      <Fragment>
        <IngredientForm handleSubmit={this.handleSubmit} />
        <IngredientList ingredientList={ingredientList}
          handleClick={this.handleClick}
          deleteIngredient={this.deleteIngredient} />
      </Fragment>
    )
  }
}
