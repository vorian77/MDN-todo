<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import { Filter } from "../types/filter.enum";

  let filter: Filter = Filter.ALL
  const filterTodos = (newFilterType: Filter) => {
    filter = newFilterType;
    dispatch("filterTodos", filter); 
  }
</script>

<!-- Filter -->
<div class="filters btn-group stack-exception">
  <button 
    class="btn toggle-btn" 
    class:btn__primary={filter === Filter.ALL} 
    aria-pressed={filter === Filter.ALL} 
    on:click={() => filterTodos(Filter.ALL)} >
    <span class="visually-hidden">Show</span>
    <span>All</span>
    <span class="visually-hidden">tasks</span>
  </button>

  <button 
    class="btn toggle-btn" 
    class:btn__primary={filter === Filter.ACTIVE} 
    aria-pressed={filter === Filter.ACTIVE} 
    on:click={() => filterTodos(Filter.ACTIVE)} >
    <span class="visually-hidden">Show</span>
    <span>Active</span>
    <span class="visually-hidden">tasks</span>
  </button>
  
  <button 
    class="btn toggle-btn" 
    class:btn__primary={filter === Filter.COMPLETED} 
    aria-pressed={filter === Filter.COMPLETED} 
    on:click={() => filterTodos(Filter.COMPLETED)} >
    <span class="visually-hidden">Show</span>
    <span>Completed</span>
    <span class="visually-hidden">tasks</span>
  </button>
</div>