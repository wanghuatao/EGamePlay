const path = require('path')

module.exports = {
    mode: 'development',
    entry: "./TypeScript/entry.ts",

    devtool: 'inline-source-map',
    watch: true,

    // watchOptions:{
    //     // 设置不监听的文件或文件夹，默认为空
    //     ignored:/node_modules/,
    //     // 文件改变不会立即执行，而是会等待300ms之后再去执行
    //     aggregateTimeout:300,
    //     // 原理是轮询系统文件有无变化再去更新的，默认1秒钟轮询1000次
    //     poll:1000
    // },
    output: {
        filename: 'behaviours.mjs',
        // path: __dirname + '/Assets/Resources',
        path: __dirname + '/Assets/StreamingAssets/Scripts',
        environment: { module: true },
        libraryTarget: 'module'
    },
    externalsType: "module",
    externals: {
        csharp: 'var csharp',
        puerts: 'var puerts',
    },
    experiments: {
        outputModule: true
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },

    module: {
        // 指定要加载的规则
        rules: [
            {
                // test指定的是对那些文件生效
                test:/\.ts$/, // 通过正则表达式匹配文件的名字
                loader: 'ts-loader', // 通过ts-loader处理以ts结尾的文件
                exclude: /node_modules/, // 指定要排除的文件
                options: {
                    configFile: path.resolve(__dirname, './tsconfig.json')
         }
            }
        ]
    }
}