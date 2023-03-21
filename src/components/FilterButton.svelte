<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let filter = 'all'
  const filterTodos = (newFilterType) => {
    filter = newFilterType;
    dispatch("filterTodos", filter); 
  }
</script>

<!-- Filter -->
<div class="filters btn-group stack-exception">
  <button 
    class="btn toggle-btn" 
    class:btn__primary={filter === 'all'} 
    aria-pressed={filter === 'all'} 
    on:click={() => filterTodos('all')} >
    <span class="visually-hidden">Show</span>
    <span>All</span>
    <span class="visually-hidden">tasks</span>
  </button>

  <button 
    class="btn toggle-btn" 
    class:btn__primary={filter === 'active'} 
    aria-pressed={filter === 'active'} 
    on:click={() => filterTodos('active')} >
    <span class="visually-hidden">Show</span>
    <span>Active</span>
    <span class="visually-hidden">tasks</span>
  </button>
  
  <button 
    class="btn toggle-btn" 
    class:btn__primary={filter === 'completed'} 
    aria-pressed={filter === 'completed'} 
    on:click={() => filterTodos('completed')} >
    <span class="visually-hidden">Show</span>
    <span>Completed</span>
    <span class="visually-hidden">tasks</span>
  </button>
</div>