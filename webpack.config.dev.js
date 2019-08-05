const path = require('path');
const fs = require('fs');
const srcRoot = path.resolve(__dirname, 'src');
const pageDir = path.resolve(srcRoot, 'page');
const devPath = path.resolve(__dirname, 'dev');
const mainFile = 'index.js';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function getEntry() {
    let entryMap = {};
    fs.readdirSync(pageDir).forEach((pathname) => {
        let fullPathName = path.resolve(pageDir, pathname);
        let stat = fs.statSync(fullPathName);
        let fileName = path.resolve(fullPathName, mainFile);
        if (stat.isDirectory() && fs.existsSync(fileName)) {
            entryMap[pathname] = fileName;
        }
    })
    return entryMap;
}
function getHtmlArray(entryMap) {
    let htmlArray = [];
    Object.keys(entryMap).forEach((key)=>{
        let fullPathName = path.resolve(pageDir, key);
        let fileName = path.resolve(fullPathName, key + '.html');
        if (fs.existsSync(fileName)) {
            htmlArray.push(new HtmlWebpackPlugin({
                filename: key + '.html',
                template: fileName,
                chunks: [ 'common', key]
            }));
        }
    });
    return htmlArray;
}

const entryMap = getEntry();
const htmlArray = getHtmlArray(entryMap);

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    resolve:{
        alias:{
            components: path.resolve(srcRoot, 'components')
        },
        extensions: ['.js','.jsx']
    },
    entry: entryMap,
    output:{
        path: devPath,
        filename: '[name].min.js'
    },
    devServer:{
        contentBase: devPath,
        port: 8080,
        hot: true,
        hotOnly: true
    },
    module:{
        rules:[{
            test:/\.css$/,
            use:['style-loader','css-loader']
        },{
            test:/\.scss$/,
            use:['style-loader','css-loader','sass-loader',{
                loader:'sass-resources-loader',
                options: {
                    resources: srcRoot + '/components/rem.scss'
                }
            }]
        },{
            test:/\.(png|jpg|jpeg|gif|woff|svg|eot|ttf|jpeg)$/,
            use: 'url-loader?limit=8192'
        },{
            test:/\.(js|jsx)$/,
            use:['babel-loader'],
            include: srcRoot
        }]
    },
    optimization: {
        splitChunks:{
            cacheGroups:{
                common: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'common'
                }
            }
        }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            { from: 'src/json', to: path.resolve(distPath, 'json'), force: true },
            { from: 'src/static', to: path.resolve(distPath, 'static'), force: true }
        ]),
    ].concat(htmlArray)
}