const path = require('path');

module.exports = function override(config, env) {
    // Cấu hình alias cho Webpack
    config.resolve = {
        ...config.resolve,
        alias: {
            ...config.resolve.alias,
            '~': path.resolve(__dirname, 'src'), // Alias trỏ đến thư mục 'src'
        },
    };

    // Thêm Babel plugin
    config.module.rules[2].oneOf.forEach((rule) => {
        if (rule.loader && rule.loader.includes('babel-loader')) {
            rule.options.plugins = [
                ...rule.options.plugins,
                [
                    'module-resolver',
                    {
                        alias: {
                            '~': './src',
                        },
                    },
                ],
            ];
        }
    });

    return config;
};
