<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let todos;

  let completed = true;

  const checkAll = () => {
    dispatch("checkAll", completed);
    completed = !completed;
  };

  const removeCompleted = () => dispatch("removeCompleted");

  $: completedTodos = todos.filter((t) => t.completed).length;
</script>

<div class="btn-group">
  <button type="button" class="btn btn__primary" disabled={todos.length === 0} on:click={checkAll}>
  Check all
  </button>
  
  <button type="button" class="btn btn__primary" disabled={todos.length === 0} on:click={checkAll}>
  Uncheck all
  </button>
  
  <button type="button" class="btn btn__primary" disabled={completedTodos === 0} on:click={removeCompleted}>
  Remove completed
  </button>
</div>

