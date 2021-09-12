import { UseAsyncExample } from "./usage-example/UseAsyncExample";
import { UseUpdateEffectExample } from "./usage-example/UseUpdateEffectExample";

function App() {
  return (
    <div>
    <h1>
      Custom hooks
    </h1>
    <p> Check out 'src/hooks' to use the hooks.</p>

    <h2> useAsync Example</h2>
    <UseAsyncExample />

    <h2> useUpdateEffect Example</h2>
    <UseUpdateEffectExample />

    </div>
  );
}

export default App;
