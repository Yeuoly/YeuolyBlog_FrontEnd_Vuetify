module.exports = {
    // 去掉文件名中的 hash
    filenameHashing: false,
    // 删除 HTML 相关的 webpack 插件
    chainWebpack: config => {
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
    }
};