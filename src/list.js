import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

export default function IngredientList({ingredientList}) {
  return (
    <List>
      {ingredientList.map(item => {
        return <ListItem key={item.id}>
          <ListItemText primary={item.ingredient}/>
        </ListItem>
      })}
    </List>
  )
}
