// pages/api/execute.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NodeVM } from 'vm2';
import * as ts from 'typescript';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code } = req.body;

    try {
        // Compile TypeScript to JavaScript
        const transpiledCode = ts.transpile(code, { module: ts.ModuleKind.CommonJS });

        // Create a VM to run the code safely
        const vm = new NodeVM({
            console: 'redirect',  // Capture console.log
            sandbox: {},
        });

        // Capture console logs
        let output = '';
        vm.on('console.log', (log: string) => {
            output += log + '\n';
        });

        // Run the transpiled JavaScript code
        vm.run(transpiledCode, 'vm.js');

        res.status(200).json({ output });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
