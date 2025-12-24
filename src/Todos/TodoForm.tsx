import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef,  } from "react"
import type { Todo } from "./hooks/useTodo"
import apiClient from "./service/apiClient"

 
const TodoForm = () => {
    const queryCleint = useQueryClient()
    // const [todoInput,setTodoInput]  = useState<string>("")
    const ref = useRef<HTMLInputElement>(null)
   const addTodo =  useMutation({
         mutationFn:(todo:Todo)=>apiClient.post<Todo>('/todos',todo).then(res=>res.data),
         onSuccess:(savedTodo,newTodo)=>{
             // queryCleint.invalidateQueries({
        //     queryKey:['todos']
        // })
     queryCleint.setQueryData<Todo[]>(['todos'],todos=>[savedTodo,...(todos || [])]);
    },
    onError: (error) => {
    console.error("Mutation failed:", error)
  },
    })

    // const handleFormSubmit = (event:React.FormEvent<HTMLFormElement>)=>{

    //     event.preventDefault()
    //  }
  return (
    <form onSubmit={(event) => {
  event.preventDefault()
  console.log("Form submitted")

  if (!ref.current?.value) {
    console.log("Input empty")
    return
  }

  addTodo.mutate({
    id: 0,
    userId: 1,
    title: ref.current.value,
    completed: false,
  })
}}
>
        <input type="text" name="tood" id=""  placeholder="Add Todo" ref={ref}  />
        <button type="submit">Add</button>
    </form>
  )
}

export default TodoForm