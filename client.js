const grpc = require("@grpc/grpc-js");
const grpcLoader = require("@grpc/proto-loader");
const echoProto = grpcLoader.loadSync("echo.proto", {});
const echoDefinition = grpc.loadPackageDefinition(echoProto);
const serverURL = "localhost:5000";
const { echoPackage } = echoDefinition;

const requestMessage = { value: "Hello, gRPC!" };

const client = new echoPackage.EchoService(
  serverURL,
  grpc.credentials.createInsecure()
);

client.EchoUnary(requestMessage, (error, response) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Response:", response);
  }
});

const serverStream = client.EchoServerStream();
serverStream.on("data", (data) => {
  console.log(data);
});
serverStream.on("end", (err) => {
  console.log("Error:", err);
});

const echos = [
  { value: "value1" },
  { value: "value2" },
  { value: "value3" },
  { value: "value4" },
];
const clientStream = client.EchoClinetStream();

for (let index = 0; index < echos.length; index++) {
  clientStream.write(echos[index]);
}

clientStream.on("data", (data) => {
  console.log(data);
});

clientStream.on("end", (err) => {
  console.log(err);
});
