<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import type { TodoType } from "../types/todo.type";

  export let todos: TodoType[];
  $: todosActive = todos.filter((t: TodoType) => !t.completed).length;
  $: todosCompleted = todos.filter((t: TodoType) => t.completed).length;

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
