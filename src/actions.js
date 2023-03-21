export function selectOnFocus(node) {
  if (node && typeof node.select === 'function') {  // make sure node is defined and has a select method()
    const onFocus = (event) => node.select();  // event handler
    node.addEventListener('focus', onFocus);  // when node gets focus call onFocus()
    return {
      destory: () => node.removeEventListener('focus', onFocus)  // executed when the node is removed from the DOM 
    }
  }
}