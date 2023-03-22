import { writable } from 'svelte/store'
import { localStore } from './localStore.js'

export const alert = writable('Welcome to the to-do list app!')

const initialTodos = [
  { id: 1, name: 'Visit MDN web docs', completed: true },
  { id: 2, name: 'Completed the Svelte tutorial', completed: false}
]

export const todos = localStore('mdn-svelte-todo', initialTodos)
