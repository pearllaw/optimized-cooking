import React, {Component, Fragment} from 'react'
import Nav from './navbar'
import hash from './hash'
import Ingredients from './ingredients'
import GeneratedRecipes from './generated-recipes'
import ViewRecipe from './view-recipe'
import RecipeCollection from './view-recipe-collection'
import ViewGroceries from './view-grocery-list'
import MakeRecipe from './make-recipe'
import CompletedMessage from './completed-message'
import { CircularProgress } from '@material-ui/core'

export default class Recipes extends Component {
  constructor(props) {
    super(props)
    const { path, params } = hash.parse(location.hash)
    this.state = {
      loaded: 0,
      view: { path, params }
    }
    // this.progress = this.progress.bind(this)
  }

  // progress() {
  //   const { loaded } = this.state
  //   this.setState({ loaded: loaded >= 100 ? 0 : loaded + 1 })
  // }

  componentDidMount() {
    window.onhashchange = () => {
      const { path, params } = hash.parse(location.hash)
      this.setState({ view: { path, params } })
    }

    // this.timer = setInterval(this.progress, 20)
  }

  // componentWillUnmount() {
  //   clearInterval(this.timer)
  // }

  renderView() {
    const { path, params } = this.state.view
    const { id } = params
    switch (path) {
      case 'list':
        return <Ingredients />
      case 'get-recipes':
        return <GeneratedRecipes />
      case 'view-recipe':
        return <ViewRecipe id={id} />
      case 'recipe-collection':
        return <RecipeCollection />
      case 'grocery-list':
        return <ViewGroceries />
      case 'instructions':
        return <MakeRecipe />
      case 'recipe-complete':
        return <CompletedMessage id={id}/>
      default:
        return <Ingredients />
    }
  }

  render () {
    // const { loaded } = this.state
    return (
      <Fragment>
        <Nav/>
        {this.renderView()}
        {/* <CircularProgress size={50}
          variant="determinate"
          value={loaded} /> */}
      </Fragment>
    )
  }
}
