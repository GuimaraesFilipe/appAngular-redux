const { webp } = require("caniuse-lite/data/features");
const path = require("path")
const webpack = require("webpack");

module.exports = {
    entry: { server: './server.ts' },
    resolve: { extensions: ['.js', '.ts'] },
    target: 'node',
    mode: 'none',

    externals: [/(node_modules|main\..*\.js)/],
    output: {
        path: path.json.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    puglins: [

        new webpack.ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            path.join(__dirname, 'src'), {}
        ),
        new webpack.ContextReplacementPlugin(
            /(.+)?express(\\|\/)(.+)?/,
            path.join(__dirname, 'src'), {}
        )
    ]

}