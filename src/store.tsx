import create from "zustand";
import { v4 as uuidv4 } from "uuid";

import { Todo } from "./model";

interface TodoState {
  todos: Todo[];
  addTodo: (description: string) => void;
  removeTodo: (id: string) => void;
  toggleCompletedState: (id: string) => void;
}

export const useStore = create<TodoState>((set) => ({
  //initial state
  todos: [],
  //method for manipulating state

  addTodo: (description: string) => {
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: uuidv4(),
          description,
          completed: false,
        } as Todo,
      ],
    }));
  },

  //Remove Todo
  removeTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },

  //completed Todo
  toggleCompletedState: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? ({ ...todo, completed: !todo.completed } as Todo)
          : todo
      ),
    }));
  },
}));
