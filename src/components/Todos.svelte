<script>
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
  }

  function removeTodo(todo) {
    todos = todos.filter((t) => t.id !== todo.id)
    todosStatus.focus()  // give focus to status heading
  }

  // filter 
  let filter = 'all';
  const filterTodos = (filter, todos) => (
    filter === 'active' ? todos.filter((t) => !t.completed) :
    filter === 'completed' ? todos.filter((t) => t.completed) :
    todos);

  function updateTodo(todo) {
    const i = todos.findIndex((t) => t.id === todo.id)
    todos[i] = {...todos[i], ...todo }
  }

  const checkAllTodos = (completed) => {
    todos = todos.map((t) => ({...t, completed }));
  }

  const removeCompletedTodos = () => todos = todos.filter((t) => !t.completed);
</script>


<!-- Todos.svelte -->
<div class="todoapp stack-large">
  <!-- NewTodo -->
  <NewTodo on:addTodo={(e) => addTodo(e.detail)} />

  <!-- filter buttons -->
  <FilterButton bind:filter />

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
    on:checkAll={(e) => checkAllTodos(e.detail)} 
    on:removeCompleted={removeCompletedTodos}
  />
</div>