import React from 'react'
import {useUser} from '@auth0/nextjs-auth0/client'
import { useState, useEffect } from 'react'
import {gql, useMutation, useQuery} from '@apollo/client'

  

const getTasks = gql(/* GraphQL */ `
  query getTasks($userName: String!) {
    tasks(userName: $userName) {
      id
      title
      tomatoes
    }
  }
`);

const AddTask = gql`
  mutation addTask($title: String!, $description:String, $tomatoes:Int, $dueDate: String, $userName:String ) {
    task(userName: $userName) {
      title
    }
  }
`;
                      
export default function Tasks() {
    const {user, error, isLoading} = useUser()
    const { loading, data } = useQuery(
      getTasks,
      // variables are also typed!
      { variables: { userName: user? user.name:"" } }
    );
    const [addTask, {}] = useMutation(AddTask)
    const [tasks, setTasks] = useState()
    const [description, setDescription] = useState('description')
    const [tomatoes, setTomatoes] = useState(0)
    const [dueDate, setDueDate] = useState('10/10/2013')
    const [userName, setUserName] = useState('')
    const [title, setTitle] = useState('')


    //setTasks(data)
    useEffect(() => { 
      if(data){
        console.log(data.tasks)
        setTasks(data.tasks)
      }

    }, [user, data])

    const handleSubmit =async(e)=>{
      e.preventDefault()
      const title = e.target.title.value
      console.log(title)


    }
    
  return (
    <div className='w-10/12 mx-auto pt-5 text-white flex flex-col justify-center items-center mt-10'>
        <h2>Tasks</h2>
        {tasks?.map(function(task) {
      return (
        <div key={task.id}>
          <h2> Task title:  {task.title} </h2>
          <h2> Task tomatoes:  {task.tomatoes} </h2>
        </div>
      )
    })}
    <div>
      <form onSubmit={(e) =>{
        e.preventDefault()
        addTask({variables: {title: title, description:description, tomatoes:tomatoes, dueDate:dueDate, userName:user.name}})
      }}>
        <input type="text" onChange={(e) => {setTitle(e.target.value)}} name='title' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='add a task'></input>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

      </form>
    </div>
    </div>
    
  )
}
