import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, logged } from "../store/actions/actions";
import Posts from "./Posts";

const ReduxExample = () => {
  const counter = useSelector((state) => state.counter);
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <h1>Counter {counter}</h1>
      <button onClick={() => dispatch(increment(1))}>+</button>
      <button onClick={() => dispatch(decrement(1))}>-</button>
      <Posts />
      <hr />
      <button onClick={() => dispatch(logged())}>Log in</button>
      {isLogged ? <h2>Happy Hacking!</h2> : ""}
    </div>
  );
};

export default ReduxExample;
