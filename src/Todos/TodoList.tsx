import useTodo from "./hooks/useTodo";
import TodoForm from "./TodoForm";

const TodoList = () => {
 
  const pageSize = 10;
  const { data, error, isLoading ,fetchNextPage} = useTodo(pageSize);
  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loadading ...</p>;

  return (
    <>
    <TodoForm/>
      <ul>
        <h1>Page {fetchNextPage.length}</h1>
          {data?.pages.map(page=>page.map(todo=><li key={todo.id}>{todo.title}</li>))}
      </ul>
      <button
        onClick={() => {
         fetchNextPage()
        }}
        // disabled={fetchNextPage.length < 1}
      >
        Load More
      </button>
      
    </>
  );
};

export default TodoList;


// import { useState } from "react";
// import useTodo from "./hooks/useTodo";

// const TodoList = () => {
//   const [page, setPage] = useState<number>(1);
//   const pageSize = 10;
//   const { data: todos, error, isLoading } = useTodo(page, pageSize);
//   if (error) return <p>{error.message}</p>;
//   if (isLoading) return <p>Loadading ...</p>;

//   return (
//     <>
//       <ul>
//         <h1>Page {page}</h1>
//         {todos?.map((todo) => (
//           <li key={todo.id}>
//             {todo.title}
//             <span>{todo.completed ? "Completed" : "Not Completed"}</span>
//           </li>
//         ))}
//       </ul>
//       <button
//         onClick={() => {
//           setPage(page - 1);
//         }}
//         disabled={page < 2}
//       >
//         Previous
//       </button>
//       <button
//         onClick={() => {
//           setPage(page + 1);
//         }}
//       >
//         Next
//       </button>
//     </>
//   );
// };

// export default TodoList;
