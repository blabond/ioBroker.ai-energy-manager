import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { moduleFederationShared } from '@iobroker/adapter-react-v5/modulefederation.admin.config.js';
import { resolve } from 'node:path';

const sharedPackages = [
    '@emotion/react',
    '@emotion/styled',
    '@iobroker/adapter-react-v5',
    '@mui/icons-material',
    '@mui/material',
    'react',
    'react-dom',
];

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
            shared: moduleFederationShared(sharedPackages),
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
