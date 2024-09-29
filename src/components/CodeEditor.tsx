// components/CodeEditor.tsx
import { useState, useEffect, useCallback } from 'react';
import { Editor } from '@monaco-editor/react';
import debounce from 'lodash.debounce';
import styles from './CodeEditor.module.scss';

const defaultCode = `
// TypeScript Playground
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(2, 3));
`;

export default function CodeEditor() {
  const [code, setCode] = useState(defaultCode);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to run code (debounced to prevent excessive calls)
  const runCode = useCallback(debounce(async (newCode: string) => {
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: newCode }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setResult(null);
      } else {
        setResult(data.output);
        setError(null);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  }, 500), []);

  // Run the code whenever the code in the editor changes
  const handleEditorChange = (value?: string) => {
    const newCode = value || '';
    setCode(newCode);
    runCode(newCode); // Run the code after each change
  };

  useEffect(() => {
    // Run code for the initial default code on load
    runCode(defaultCode);
  }, [runCode]);

  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <Editor
          height="100%"
          defaultLanguage="typescript"
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
        />
      </div>
      <div className={styles.output}>
        <h1>Output</h1>
        {error ? <pre className={styles.errorPre}>{error}</pre> : <pre className={styles.outputPre}>{result}</pre>}
      </div>
    </div>
  );
}
