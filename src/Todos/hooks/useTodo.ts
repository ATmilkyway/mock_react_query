import { useQuery } from "@tanstack/react-query";
import apiClient from "../service/apiClient";

interface Todo {
  userId: string;
  id: number;
  title: string;
  completed: boolean;
}

const useTodo = (page: number, pageSize: number) => {
  return useQuery<Todo[]>({
    queryKey: ["todos", page],
    queryFn: () =>
      apiClient
        .get("/todos", {
          params: {
            _start: (page - 1) * pageSize,
            _limit: pageSize,
          },
        })
        .then((res) => res.data),
    staleTime: 1000 * 60 * 1,
    gcTime: 1000 * 60 * 1,
  });
};

export default useTodo;
