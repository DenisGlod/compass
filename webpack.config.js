const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;
const filenameImg = (ext) => isDev ? `[name]${ext}` : `[name].[contenthash]${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src/gui'),
    entry: './js/index.js',
    output: {
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'app'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: 'assets', to: path.resolve(__dirname, 'app')}
            ]
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: "index.html",
            minify: {
                collapseWhitespace: isProd,
                removeComments: isProd,
            }
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(?:|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: `./img/${filenameImg('[ext]')}`
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'app'),
        },
        open: true,
        compress: true,
        hot: true,
        port: 3000,
    }
};