module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        sourceType: 'module',
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"]
    }
};

module.exports = {
    // Other Webpack configuration...
    devServer: {
      setupMiddlewares: (middlewares, devServer) => {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }

        // Example middleware
        devServer.app.use((req, res, next) => {
          console.log('Before middleware');
          next();
        });

        // Example middleware
        devServer.app.use((req, res, next) => {
          console.log('After middleware');
          next();
        });

        return middlewares;
      },
    },
  };