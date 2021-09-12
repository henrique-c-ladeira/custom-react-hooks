import React from "react";
import { useAsync } from "../hooks/useAsync";

const asyncFunctionExample = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rnd = Math.random() * 10;
      rnd <= 5
        ? resolve("Submitted successfully 🌿")
        : reject("Oh no there was an error 💩");
    }, 1000);
  });
};

export const UseAsyncExample = () => {
  const { execute, status, value, error } = useAsync(asyncFunctionExample, false);
  return (
    <div>
      {status === "idle" && <div>Start your journey by clicking a button</div>}
      {status === "success" && <div>{value}</div>}
      {status === "error" && <div>{error}</div>}
      <button onClick={execute} disabled={status === "pending"}>
        {status !== "pending" ? "Click me" : "Loading..."}
      </button>
    </div>
  );
}