<script>
  import { alert } from "../stores.js";
  import NewTodo from "./NewTodo.svelte";
  import FilterButton from "./FilterButton.svelte";
  import TodosStatus from "./TodosStatus.svelte";
  import Todo from "./Todo.svelte";
  import MoreActions from "./MoreActions.svelte";
  
  export let todos = [];

  let todosStatus;  // reference to TodosStatus instance
  
  function addTodo(name) {
    let newId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;  
    todos = [...todos, { id: newId, name, completed: false }];
    $alert = `Added new todo: ${name}.`;
  }

  function removeTodo(todo) {
    todos = todos.filter((t) => t.id !== todo.id)
    todosStatus.focus()  // give focus to status heading
    $alert = `Deleted todo: ${todo.name}.`;
  }

  // filter 
  let filter = 'all';
  
  const filterTodos = (filter, todos) => (
    filter === 'active' ? todos.filter((t) => !t.completed) :
    filter === 'completed' ? todos.filter((t) => t.completed) :
    todos
  )

  function setFilter(newFilterType) {
    filter = newFilterType;
    $alert = `Filter changed to: ${newFilterType}.`
  };
  
  function updateTodo(todo) {
    const i = todos.findIndex((t) => t.id === todo.id)
    
    if (todos[i].name !== todo.name) 
      $alert = `Renamed todo "${todos[i].name}" to "${todo.name}".`
    else if (todos[i].completed !== todo.completed) 
      $alert = `Marked todo "${todos[i].name}" as ${todo.completed ? 'Completed' : 'Active'}.`
   
    todos[i] = {...todos[i], ...todo }
  }

  const setChecks = (completed) => {
    todos = todos.map((t) => ({...t, completed }));
    $alert = `${completed ? 'Checked' : 'Unchecked'} ${todos.length} ${todos.length === 1 ? 'todo' : 'todos'}.`
  }

  const removeCompletedTodos = () => {
    const todosCompleted = todos.filter((t) => t.completed).length;
    todos = todos.filter((t) => !t.completed);
    $alert =`Removed ${todosCompleted} ${todosCompleted === 1 ? 'todo' : 'todos'}.`
  }
</script>

<!-- Todos.svelte -->
<div class="todoapp stack-large">
  <!-- NewTodo -->
  <NewTodo on:addTodo={(e) => addTodo(e.detail)} />

  <!-- filter buttons -->
  <FilterButton on:filterTodos={(e) => setFilter(e.detail)} />

  <!-- TodosStatus -->
  <TodosStatus {todos} bind:this={todosStatus}/>
  
  <!-- Todos -->
  <ul role="list" class="todo-list stack-large" aria-labelledby="list-heading">
    {#each filterTodos(filter, todos) as todo, index (todo.id)}
      <li class="todo">
        <Todo {todo} on:update={(e) => updateTodo(e.detail)} on:remove={(e) => removeTodo(e.detail)} />
      </li>
    {:else}
      Nothing to do here!
    {/each}
  </ul>

  <!-- horizontal rule -->
  <hr />

  <!-- MoreActions -->
  <MoreActions 
    {todos} 
    on:setChecks={(e) => setChecks(e.detail)} 
    on:removeCompleted={removeCompletedTodos}
  />
</div>