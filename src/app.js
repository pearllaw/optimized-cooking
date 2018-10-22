import React, {Component} from 'react'
import AddIngredient from './add-ingredient'
import IngredientList from './list';

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
      .then(res => res.json())
      .then(item => this.setState({ ingredientList: [...ingredientList, item] }))
  }

  componentDidMount() {
    fetch('/ingredients')
      .then(res => res.json())
      .then(ingredients => this.setState({ ingredientList: ingredients}))
  }

  render () {
    return (
      <div>
        <AddIngredient addIngredient={this.addIngredient}/>
      </div>
    )
  }
}
