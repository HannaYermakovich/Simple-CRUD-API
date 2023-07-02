import webpack from 'webpack';
import path from 'path';
import Dotenv from 'dotenv-webpack';

const __dirname = process.cwd();

const config = {
    entry: './src/server.ts',
    target: 'node',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.cjs$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                type: 'javascript/auto',
            }
        ],
    },
    plugins: [
        new Dotenv({
            systemVars: true
        })
    ],
    resolve: {
        extensions: ['.ts', '.cjs'],
    },
    output: {
        filename: 'main.cjs',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    }
};

export default config;