const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        app: path.join(__dirname, 'app-ui/src', 'main.tsx')
    },
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css'],
        plugins: [new TsconfigPathsPlugin({
            configFile: "app-ui/tsconfig.json"
         })]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [path.join(__dirname, 'node_modules/*'), path.join(__dirname, 'app-ui/node_modules/*')]
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app-ui/src', 'index.html'),
            title: "Development"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        })
    ]
}