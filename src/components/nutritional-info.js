import React from 'react'
import { withStyles, Typography, Grid, Table, TableCell, TableHead, TableRow, TableBody } from '@material-ui/core'

const styles = {
  container: {
    border: '1px solid silver',
    borderRadius: '0.25rem',
    width: '80%',
    marginRight: 'auto',
    marginLeft: 'auto',
    padding: 40,
    marginBottom: 50
  },
  heading: {
    paddingBottom: 10
  },
  table: {
    width: 800
  }
}

const CustomTableCell = withStyles({
  head: {
    fontSize: '0.9rem'
  },
  body: {
    fontSize: '0.9rem'
  }
})(TableCell)

function Nutrition({ classes, recipes }) {
  return (
    <Grid container
      direction="column"
      alignItems="center"
      className={classes.container}>
      <Grid item>
        <Typography variant="h5" className={classes.heading}>Nutritional Information</Typography>
      </Grid>
      <Grid item>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell></CustomTableCell>
              <CustomTableCell numeric>Calories</CustomTableCell>
              <CustomTableCell numeric>Fat (g)</CustomTableCell>
              <CustomTableCell numeric>Carbs (g)</CustomTableCell>
              <CustomTableCell numeric>Protein (g)</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <CustomTableCell component="th" scope="row">Meal Totals</CustomTableCell>
              <CustomTableCell numeric>{Math.floor(recipes['nutrients'].calories)}</CustomTableCell>
              <CustomTableCell numeric>{Math.floor(recipes['nutrients'].fat)}</CustomTableCell>
              <CustomTableCell numeric>{Math.floor(recipes['nutrients'].carbohydrates)}</CustomTableCell>
              <CustomTableCell numeric>{Math.floor(recipes['nutrients'].protein)}</CustomTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Nutrition)
