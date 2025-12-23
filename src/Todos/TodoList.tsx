import { useState } from "react";
import useTodo from "./hooks/useTodo";

const TodoList = () => {
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;
  const { data: todos, error, isLoading } = useTodo(page, pageSize);
  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loadading ...</p>;

  return (
    <>
      <ul>
        <h1>Page {page}</h1>
        {todos?.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <span>{todo.completed ? "Completed" : "Not Completed"}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          setPage(page - 1);
        }}
        disabled={page < 2}
      >
        Previous
      </button>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next
      </button>
    </>
  );
};

export default TodoList;
