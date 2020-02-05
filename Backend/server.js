const http = require("http");
const app = require("./app");
const { config } = require("./api/config/env");
const server = http.createServer(app);
server.listen(config.PORT);

console.log("Server running");
