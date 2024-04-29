const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const echoProto = protoLoader.loadSync("echo.proto");
const echoDefinition = grpc.loadPackageDefinition(echoProto);
const serverURL = "localhost:5000";
const { echoPackage } = echoDefinition;
const server = new grpc.Server();

function EchoUnary(call, callback) {}
function EchoClinetStream(call, callback) {}
function EchoServerStream(call, callback) {}
function EchoBidiStream(call, callback) {}

server.addService(echoPackage.EchoService.service, {
  EchoUnary,
  EchoClinetStream,
  EchoServerStream,
  EchoBidiStream,
});

server.bindAsync(
  serverURL,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Failed to bind server:", err);
    } else {
      console.log("Server bound on port:", port);
    
    }
  }
);

console.log("server run on localhost:5000");

