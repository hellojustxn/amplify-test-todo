/* src/App.js */
import React, { useLayoutEffect, useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation, PubSub } from 'aws-amplify'
import awsExports from "./aws-exports";
import Auth from '@aws-amplify/auth'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import * as subscriptions from './graphql/subscriptions';

Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

const App = () => {
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect will run again if an element in the array changes
  // Since the array is empty, effect will run only once
  useLayoutEffect(() => {
    fetchTodos();
  });

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      setTodos(todoData.data.listTodos.items)
    } catch (err) { console.log('error fetching todos') }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState }
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
      setTodos([...todos,todo])
      setFormState(initialState)      
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  async function signOut() {
    try {
      await Auth.signOut()
      window.location.reload();
    } catch (err) {
      console.log('unable to sign out', err)
    }
  }

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={signOut}>Sign out</button>
      <h2>Amplify Todos</h2>
      <input
        onChange={event => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={event => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={addTodo}>Create Todo</button>
      {
        todos.map((todo, index) => (
          <div key={todo.id ? todo.id : index} style={styles.todo}>
            <p style={styles.todoName}>{todo.name}</p>
            <p style={styles.todoDescription}>{todo.description}</p>
          </div>
        ))
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' },
}

export default App;