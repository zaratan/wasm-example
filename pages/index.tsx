import { FormEvent, useRef, useState } from 'react';

import styles from '../styles/page_index.module.css';

export default function Home() {
  const inputRef = useRef(null);
  const [sum, setSum] = useState(0);
  const [operation, setOperation] = useState('');

  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    const inputValues = inputRef.current.value
      .split(/\s*,\s*/)
      .map((v) => Number(v.replace(/\s+/g, '')))
      .map((v) => (Number.isNaN(v) ? 0 : v));
    setOperation(`${inputValues.join(' + ')} = `);
    setSum(inputValues.reduce((res, next) => res + next));
  };

  return (
    <div className={styles.main}>
      <p className={styles.title}>This is a basic Sum app.</p>
      <form onSubmit={formSubmit}>
        <input type="text" ref={inputRef} />
        <button type="submit">SUM !</button>
      </form>
      <p className={styles.result}>
        Result: {operation} {sum}
      </p>
    </div>
  );
}
