import { GET_POST } from "../actions/posts";

const initialState = {
  post: [],
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST: {
      return {
        ...state,
        post: action.payload,
      };
    }
    default:
      return state;
  }
};
export default PostReducer;
