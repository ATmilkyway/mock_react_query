
  import apiClient from "../service/apiClient";

  export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }

  // const useTodo = (page: number, pageSize: number) => {
  //   return useQuery<Todo[]>({
  //     queryKey: ["todos", page],
  //     queryFn: () =>
  //       apiClient
  //         .get("/todos", {
  //           params: {
  //             _start: (page - 1) * pageSize,
  //             _limit: pageSize,
  //           },
  //         })
  //         .then((res) => res.data),
  //     staleTime: 1000 * 60 * 1,
  //     gcTime: 1000 * 60 * 1,
  //   });
  // };

  // export default useTodo;

  import { keepPreviousData, useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
  
  // export interface Todo {
  //   userId: string;
  //   id: number;
  //   title: string;
  //   completed: boolean;
  // }
  
  const useTodo = (pageSize:number) => {
    // const [pageNumber,setPageNumber]=useState(1)
    return useInfiniteQuery<Todo[], Error, InfiniteData<Todo[], number>, ["todos"], number>({
      queryKey: ["todos"],
      initialPageParam: 1, 

      queryFn: ({ pageParam }) =>
        apiClient
          .get<Todo[]>("/todos", {
            params: { 
              _start:(pageParam-1)*pageSize,
              _limit:pageSize
            },
          })
          .then(res => res.data),

      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 0
          ? undefined
          : allPages.length + 1
      },
    placeholderData: keepPreviousData, 

    });
  };

  export default useTodo;
