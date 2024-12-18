import { useDispatch } from 'react-redux'
import './App.css'
import { useEffect } from 'react';
import { todoDataLoad } from './app/features/todo/todoSlice';
import Todo from './components/todo/Todo';

function App() {
  const dispatch = useDispatch();
  // toto data load
  useEffect(()=>{
    dispatch(todoDataLoad());
  },[dispatch]);


  return (
    <>
     <Todo />
    </>
  )
}

export default App
