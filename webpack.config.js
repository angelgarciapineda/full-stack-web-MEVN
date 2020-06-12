//Archivo de configuración para traducir todo el código de vue js
const { VueLoaderPlugin } = require("vue-loader");
module.exports = {
  entry: "./src/app/index.js",
  output: {
    path: __dirname + "/src/public",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/, //tiene que leer todos los archivos que terminen con extension .js
        exclude: /node_modules/, //que ignore la carpeta node modules
        use: {
          loader: "babel-loader" //encargado de traducir código moderno a código que cualquier puede entender
        },
      },
      {
        test: /\.vue$/, //que lea todos los archivos tipo vue
        loader: "vue-loader",
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
