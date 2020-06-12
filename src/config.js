module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || "mongodb+srv://angelgarcia:e19d036j@cluster0-9ha18.mongodb.net/projetPanneaux?retryWrites=true&w=majority",
    SECRET_TOKEN: "miclavedetokens"
  };