import {useContext} from 'react'
import TodoContext from '../context/Todos'

export default function useTodoContext() {
  return useContext(TodoContext)
}
