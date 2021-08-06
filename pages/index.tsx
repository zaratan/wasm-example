import { FC, FormEvent, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import styles from '../styles/page_index.module.css';

const WasmComponent = dynamic(
  () =>
    import('../wasm/pkg/wasm_bg').then((wasmMod) => {
      const WasmLoadedComponent: FC<{ numbers: Array<number> }> = ({
        numbers,
      }) => {
        const wasmResult: { result: number; operation: string } = wasmMod.sum({
          numbers,
        });

        return (
          <p className={styles.result}>
            Result: {wasmResult.operation} = {wasmResult.result}
          </p>
        );
      };
      return WasmLoadedComponent;
    }),
  { ssr: false }
);

export default function Home() {
  const inputRef = useRef(null);
  const [numbers, setNumbers] = useState([]);

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    const inputValues = inputRef.current.value
      .split(/\s*,\s*/)
      .map((v) => Number(v.replace(/\s+/g, '')))
      .map((v) => (Number.isNaN(v) ? 0 : v));
    setNumbers(inputValues);
  };

  return (
    <div className={styles.main}>
      <p className={styles.title}>This is a basic Sum app.</p>
      <form onSubmit={formSubmit}>
        <input type="text" ref={inputRef} />
        <button type="submit">SUM !</button>
      </form>
      <WasmComponent numbers={numbers} />
    </div>
  );
}
