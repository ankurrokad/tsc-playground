// pages/index.tsx
import Head from 'next/head';
import CodeEditor from '../components/CodeEditor';

export default function Home() {
  return (
    <div>
      <Head>
        <title>TypeScript Playground</title>
      </Head>
      <main>
        <h1>TypeScript Playground</h1>
        <CodeEditor />
      </main>
    </div>
  );
}
