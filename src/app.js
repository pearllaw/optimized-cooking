import React, {Component, Fragment} from 'react'
import Nav from './navbar'
import AddIngredient from './add-ingredient'
import IngredientList from './list'
import hash from './hash'

export default class Recipes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredientList: [],
      view: hash.parse(location.hash)
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

  renderView() {
    const { path } = this.state.view
    const { ingredientList } = this.state
    switch (path) {
      case 'my-list':
        return (
        <Fragment>
          <AddIngredient addIngredient={this.addIngredient} />
          <IngredientList ingredientList={ingredientList} />
        </Fragment>
        )
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
