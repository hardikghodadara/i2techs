import { useReducer } from "react";
import Posts from "./components/Posts";
import Profile from "./components/Profile";
import "./styles.css";

const initialState = {
  profile: {
    name: "",
    email: ""
  }
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_PROFILE":
      return { profile: action.payload };
    default:
      throw new Error();
  }
}

export default function App() {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <Profile store={store} dispatch={dispatch} />
      <Posts store={store} />
    </div>
  );
}
