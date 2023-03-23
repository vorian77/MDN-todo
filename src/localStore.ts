import { writable } from 'svelte/store';
import type { JsonValue } from './types/JsonValue.type';

export const localStore = (key: string, initial: JsonValue) => {  // receives the key of the local storage and an initial value
  const toString = (value: JsonValue) => JSON.stringify(value, null, 2)
  const toObj = JSON.parse

  if (localStorage.getItem(key) === null) {                // item not present in local store
    localStorage.setItem(key, toString(initial))           // initialize local storage with initial value
  }

  const saved = toObj(localStorage.getItem(key))           // convert to object

  const { subscribe, set, update } = writable(saved)      // create the underlying writable store

  return {
    subscribe,
    set: (value: JsonValue) => {
      localStorage.setItem(key, toString(value))           // save to local storage as a string 
      return set(value)
    },
    update
  }
}