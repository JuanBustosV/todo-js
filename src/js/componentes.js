import { Todo } from "../classes";
import { todoList } from "..";

// Referencias en el HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
		<div class="view">
		<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
		<label>${ todo.tarea }</label>
		<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>
    `

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div;
}

// Eventos

txtInput.addEventListener('keyup', () => {

    //console.log(event);
    if ( event.keyCode === 13 && txtInput.value.length > 0) { // presiona Enter

        //console.log( txtInput.value );
        const nuevoTodo = new Todo( txtInput.value );

        todoList.nuevoTodo( nuevoTodo );

        //console.log(todoList);
        crearTodoHtml( nuevoTodo );
        txtInput.value = '';

    }

});

divTodoList.addEventListener('click', (event) => {

    console.log('click');
    console.log(event.target.localName);

    const nombreElemento = event.target.localName; // input, label o button
    const todoElemento   = event.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');

    console.log(todoElemento);
    console.log(todoId);

    if (nombreElemento.includes('input')) { // click en el check
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed'); // toqgle: quita/pone la clase
    }
    else if ( nombreElemento.includes('button')) { // click en el button, borrar el todo
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }        
});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    // eliminarmos en html de abajo hacia arriba

    for( let i = divTodoList.children.length-1; i >= 0; i--) {

        const elemento = divTodoList.children[i];
        console.log(elemento);
        if( elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }

});

ulFiltros.addEventListener('click', (event) => {

    console.log(event.target.text);
    const filtro = event.target.text;

    if ( !filtro ) {
        return;
    }

    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    console.log( event.target );
    event.target.classList.add('selected');

    for ( const elemento of divTodoList.children ) {
        console.log(elemento);

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch ( filtro ) {

            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }

});