import React, {Component} from 'react'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  title: {
    marginTop: 100,
    marginBottom: 80
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    width: 1200,
    height: 800,
    transform:'translateZ(0)'
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  }
}

function ShowRecipes({classes, recipes, getInstructions}) {
    return (
      <div>
      <Typography variant="h3" align="center" className={classes.title}>What Looks Good?</Typography>
      <div className={classes.container}>
        <GridList cols={3} cellHeight={'auto'} className={classes.gridList}>
          {recipes.map(tile => (
            <GridListTile key={tile.image}
              onClick={getInstructions}>
              <a href="#view-recipe"><img src={tile.image}
                alt={tile.title}
                id={tile.id}
                width="396px"
                height="235px"/></a>
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

export default withStyles(styles)(ShowRecipes)
