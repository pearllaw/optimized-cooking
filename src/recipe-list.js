import React, {Component} from 'react'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = {
  root: {
    padding: 50
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    padding: 50
  },
  gridList: {
    width: 500,
    height: 450,
    transform:'translateZ(0)'
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  }
}

class ShowRecipes extends Component {

  render() {
    const { classes, recipeImages } = this.props
    return (
      <div className={classes.root}>
      <Typography variant="h3" align="center">What Looks Good?</Typography>
      <div className={classes.container}>
        <GridList cols={5} cellHeight={'auto'} className={classes.gridList}>
          {recipeImages.map(tile => (
            <GridListTile key={tile.image}>
              <img src={tile.image} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                titlePosition="top"
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
      </div>
    )
  }
}

export default withStyles(styles)(ShowRecipes)
