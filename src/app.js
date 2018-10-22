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
    fetch('/ingredients', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {'Content-Type': 'application/json; charset=utf-8'}
    })
      .then(item => this.setState({ ingredientList: [...ingredientList, item] }))
  }

  render () {
    return (
      <div>
        <IngredientList addIngredient={this.addIngredient}/>
      </div>
    )
  }
}
