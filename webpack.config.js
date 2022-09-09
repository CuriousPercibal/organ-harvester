const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


module.exports = {
    experiments: {
        topLevelAwait: true,
    },
    module: {
        rules: [
            {
                test: /.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ],
        minimize: true,
    },
    plugins: [
        new MiniCssExtractPlugin()
    ],
    stats: {
        children: true
    }
};