// Define types for actions
interface CitiesAllRequestAction {
    type: string;
  }
  
  interface CitiesAllSuccessAction {
    type: string;
    payload: any; // Replace 'any' with the actual data type
  }
  
  interface CitiesAllErrorAction {
    type: string;
    payload: any; // Replace 'any' with the actual error type
  }
  
  // Define other action types as needed
  
  // Combine all action types
  export type DataAction =
    | CitiesAllRequestAction
    | CitiesAllSuccessAction
    | CitiesAllErrorAction