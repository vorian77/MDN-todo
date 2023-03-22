<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let todos;
  $: todosActive = todos.filter((t) => !t.completed).length;
  $: todosCompleted = todos.filter((t) => t.completed).length;

  const setChecks = (checkAll) => dispatch("setChecks", checkAll);
  const removeCompleted = () => dispatch("removeCompleted");
</script>

<div class="btn-group">
  <button type="button" class="btn btn__primary" disabled={todosActive === 0} on:click={() => setChecks(true)}>
  Check all
  </button>
  
  <button type="button" class="btn btn__primary" disabled={(todosCompleted === 0)} on:click={() => setChecks(false)}>
  Uncheck all
  </button>
  
  <button type="button" class="btn btn__primary" disabled={todosCompleted === 0} on:click={removeCompleted}>
  Remove completed
  </button>
</div>
