import React from 'react'
import { Typography, Button, ButtonBase, MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/'
import blue from '@material-ui/core/colors/blue'

const styles = theme => ({
  heading: {
    marginTop: 100,
    marginBottom: 80
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 350,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
    height: 350
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    height: 350
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.3,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  subtitle: {
    marginTop: 40,
    marginBottom: 70
  },
  button: {
    color: theme.palette,
    marginRight: 100,
    marginBottom: 50,
    float: 'right'
  }
})

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: {
    useNextVariants: true,
  }
})

function MealsByCal({ classes, recipes, reload, getInstructions }) {
    return (
    <div>
      <Typography variant="h3" align="center" className={classes.heading}>Customized Meals Just For You</Typography>
      <div className={classes.root}>
        {recipes['meals'].map(meal => (
          <ButtonBase key={meal.id}
            id={meal.id}
            focusRipple
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{ width: 100/3 + '%'}}
            href={`#view-recipe?id=${meal.id}`}>
            <span className={classes.imageSrc}
              style={{ backgroundImage: `url(https://spoonacular.com/recipeImages/${meal.image})` }} />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}>
                {meal.title}
                <span className={classes.imageMarked} />
              </Typography>
            </span>
          </ButtonBase>
        ))}
      </div>
      <div className={classes.subtitle}>
        <Typography variant="h5" align="center">Want different recipes?
          <MuiThemeProvider theme={theme}>
            <Button className={classes.button}
              color="primary"
              variant="contained"
              onClick={reload}>Shake It Up</Button>
          </MuiThemeProvider>
        </Typography>
      </div>
    </div>
    )
}

export default withStyles(styles)(MealsByCal)
