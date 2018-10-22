import React, {Component} from 'react'
import IngredientList from './list'

export default class Recipes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredientList: []
    }
    this.addIngredient = this.addIngredient.bind(this)
  }

  addIngredient(ingredient) {
    const { ingredientList } = this.state
    const item = Object.assign({}, ingredient)
    this.setState({ ingredientList: [...ingredientList, item] })
  }

  render () {
    return (
      <IngredientList addIngredient={this.addIngredient}/>
    )
  }
}
