export type TodoInitialState = {
  isFetching: boolean;
  isSubmitting: boolean;
  todo: any;
  data: any[];
  messageState: string;
  message: string;
  errors: any;
};

export const todoInitialState: TodoInitialState = {
  isFetching: false,
  isSubmitting: false,
  todo: null,
  data: [],
  messageState: '',
  message: '',
  errors: null,
};
