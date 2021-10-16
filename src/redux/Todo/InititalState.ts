export type TodoInitialState = {
  isFetching: boolean;
  isSubmitting: boolean;
  data: any[];
  messageState: string;
  message: string;
  errors: any;
};

export const todoInitialState: TodoInitialState = {
  isFetching: false,
  isSubmitting: false,
  data: [],
  messageState: '',
  message: '',
  errors: null,
};
