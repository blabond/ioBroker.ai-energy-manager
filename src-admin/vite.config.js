import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { resolve } from 'node:path';

const sharedPackages = [
    '@emotion/react',
    '@emotion/styled',
    '@mui/icons-material',
    '@mui/material',
    'react',
    'react-dom',
];

const makeShared = packages =>
    Object.fromEntries(
        packages.map(packageName => [
            packageName,
            {
                requiredVersion: '*',
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
        react(),
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
