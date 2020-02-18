module.exports = {
    runtimeCompiler: true,
    productionSourceMap: true,

    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/'
}