import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { resolve } from 'node:path';

const sharedPackages = {
    '@emotion/react': '^11.14.0',
    '@emotion/styled': '^11.14.1',
    '@mui/material': '^6.5.0',
    react: '^18.3.1',
    'react-dom': '^18.3.1',
};

const makeShared = packageVersions =>
    Object.fromEntries(
        Object.entries(packageVersions).map(([packageName, requiredVersion]) => [
            packageName,
            {
                import: false,
                requiredVersion,
                singleton: true,
            },
        ]),
    );

export default defineConfig({
    base: './',
    root: resolve(__dirname),
    plugins: [
        federation({
            manifest: true,
            name: 'ConfigCustomAiEnergyManager',
            filename: 'customComponents.js',
            dts: false,
            exposes: {
                './Components': './main.jsx',
            },
            remotes: {},
            shared: makeShared(sharedPackages),
        }),
        react({ jsxRuntime: 'classic' }),
    ],
    build: {
        target: 'chrome89',
        outDir: resolve(__dirname, '../admin/custom'),
        emptyOutDir: true,
        rollupOptions: {
            output: {
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash][extname]',
            },
        },
    },
});
