import React, {Component, Fragment} from 'react'
import GroceryList from './grocery-list'
import hash from './hash'
import { Typography } from '@material-ui/core'

export default class ViewGroceries extends Component {
  constructor(props) {
    super(props)
    const { path, params } = hash.parse(location.hash)
    this.state = {
      groceries: [],
      view: { path, params}
    }
  }

  componentDidMount() {
    const { id } = this.state.view.params
    Promise.all([
      fetch('/ingredients')
        .then(res => res.json())
        .then(list => list.map(item => item.ingredient)),
      fetch(`/ingred?id=${id}`)
        .then(res => res.json())
        .then(data => {
          const ingred = (({ extendedIngredients }) => ({ extendedIngredients }))(data)
          return ingred
        })
        .then(result => result.extendedIngredients.map(item => item.name))
    ])
    .then(([result, ingredients]) => {
      const lowerResult = result.map(word => word.toLowerCase())
      const lowerIngredients = ingredients.map(word => word.toLowerCase())
      return ([lowerResult, lowerIngredients])
    })
    .then(([res1, res2]) => {
      const mismatch = res2.filter(item => !res1.includes(item))
      return mismatch
    })
    .then(data => {
      const newArr = data.map(word => word.charAt(0).toUpperCase() + word.substr(1))
      return newArr
      })
    .then(res => this.setState({ groceries: res }))
  }

  render() {
    const { groceries } = this.state
    return (
      <GroceryList groceries={groceries} />
    )
  }
}
