import React from 'react'
import { Grid, Typography, List, ListItemText, ListItem } from '@material-ui/core';


export default function Instructions({instructions}) {
  return (
    <Grid container>
      <Grid item>
        <Typography variant="h6">&#9755; Directions</Typography>
      </Grid>
      <Grid item>
        {instructions.map((instruction, index) => (
          <List key={index}>
            <ListItem>
              <ListItemText primary={`${instruction.number}. ` + `${instruction.step}`}/>
            </ListItem>
          </List>
        ))}
      </Grid>
    </Grid>
    )
}
