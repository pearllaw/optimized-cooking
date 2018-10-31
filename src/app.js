import React, {Component, Fragment} from 'react'
import Nav from './navbar'
import AddIngredient from './add-ingredient'
import GeneratedRecipes from './generated-recipes'
import ViewRecipe from './view-recipe'
import hash from './hash'


export default class Recipes extends Component {
  constructor(props) {
    super(props)
    const { path, params } = hash.parse(location.hash)
    this.state = {
      view: { path, params }
    }
  }

  componentDidMount() {
    window.onhashchange = () => {
      const { path, params } = hash.parse(location.hash)
      this.setState({ view: { path, params } })
    }
  }

  renderView() {
    const { path, params } = this.state.view
    switch (path) {
      case 'list':
        return <AddIngredient />
      case 'get-recipes':
        return <GeneratedRecipes />
      case 'view-recipe':
        const { id } = params
        return <ViewRecipe id={id} />
      default:
        return <AddIngredient />
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
