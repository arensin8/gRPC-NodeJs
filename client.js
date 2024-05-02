const grpc = require("@grpc/grpc-js");
const grpcLoader = require("@grpc/proto-loader");
const echoProto = grpcLoader.loadSync("echo.proto", {});
const echoDefinition = grpc.loadPackageDefinition(echoProto);
const serverURL = "localhost:5001"; // Change to an available port

const { echoPackage } = echoDefinition;

const requestMessage = { value: "Hello, gRPC!" };

const client = new echoPackage.EchoService(
  serverURL,
  grpc.credentials.createInsecure()
);



const dateTime = client.dateTime();
setInterval(() => {
  dateTime.write({ value: new Date().toLocaleString() });
}, 1000);
dateTime.on("data", (data) => {
  console.log("client dateTime :", data);
});
