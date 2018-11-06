import React, {Component} from 'react'
import GroceryList from '../components/grocery-list'
import hash from '../hash'

export default class ViewGroceries extends Component {
  constructor(props) {
    super(props)
    const { path, params } = hash.parse(location.hash)
    this.state = {
      groceries: [],
      view: { path, params}
    }
    this.handleCheck = this.handleCheck.bind(this)
  }

  handleCheck(index) {
    const checked = this.state.groceries.map((item, itemIndex) =>
      itemIndex === index
        ? Object.assign({}, item, { checked: !item.checked })
        : item
    )
    this.setState({ groceries: checked })
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
          const ingred = (({ extendedIngredients }) => Object.values({ extendedIngredients }))(data)
          return ingred[0].map(item => item.name)
        })
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
    .then(list => list.map(item => Object.assign({}, {item: item}, {checked: false})))
    .then(groceryItem => this.setState({ groceries: groceryItem }))
  }

  render() {
    const { groceries } = this.state
    if (groceries.length === 0) return null
    return (
      <GroceryList groceries={groceries}
        handleCheck={this.handleCheck} />
    )
  }
}
