import './styles.css';

// import { Todo } from './classes/todo.class'
// import { TodoList } from './classes/todo-list.class';
import { Todo, TodoList } from './classes'; // index.js
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();

// todoList.todos.forEach(todo => crearTodoHtml( todo ));
todoList.todos.forEach( crearTodoHtml ); // igual que la línea de arriba, cuando es el mismo argumento (todo) y solo uno

// const newTodo = new Todo('Aprender JavaScript');
// todoList.nuevoTodo( newTodo );

// todoList.todos[0].imprimirClase();

// console.log('todos', todoList.todos );
//newTodo.imprimirClase();

// const tarea = new Todo('Aprender JavaScript');


// todoList.nuevoTodo( tarea );


// console.log( todoList );

// crearTodoHtml( tarea );