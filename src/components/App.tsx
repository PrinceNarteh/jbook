import * as esbuild from "esbuild-wasm";
import { useEffect, useRef, useState } from "react";

const App = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState("");

  const startService = async () => {
    await esbuild.initialize({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
    ref.current = true;
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) return;

    const result = await esbuild.transform(input, {
      loader: "jsx",
      target: "es2015",
    });
    setCode(result.code);
  };

  return (
    <div>
      <textarea
        name=""
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

export default App;
