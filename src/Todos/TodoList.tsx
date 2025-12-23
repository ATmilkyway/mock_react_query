import { useQuery } from "@tanstack/react-query";
import apiClient from "./service/apiClient";

interface Todo {
  userId: string;
  id: number;
  title: string;
  completed: boolean;
}

const TodoList = () => {
  const {
    data: todos,
    error,
    isLoading,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () => apiClient.get("/todos").then((res) => res.data),
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 1,
  });
  if (error) return <p>{error.message}</p>;
  if (isLoading) return <p>Loadading ...</p>;

  return (
    <>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <span>{todo.completed ? 'Completed' : 'Not Completed'}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
