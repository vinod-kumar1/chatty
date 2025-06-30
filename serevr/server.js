import http from "node:http";
import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { WebSocketServer } from "ws";

let httpServer = http.createServer((req, res) => {
  if ((req.url = "/home")) res.end("Home");
});
let rl = readline.createInterface({ input, output });
let wss = new WebSocketServer({ server: httpServer });

wss.on("connection", (ws) => {
  rl.on("line", (input) => {
    wss.clients.forEach((socket) => {
      if (socket.OPEN) {
        socket.send(
          JSON.stringify({ type: "message", payload: "Server> " + input })
        );
      }
    });
  });

  ws.send(JSON.stringify({ payload: "Hi" }));

  ws.on("message", (data) => {
    let inp = JSON.parse(data);
    console.log(inp);
    wss.clients.forEach((socket) => {
      if (socket != ws) socket.send(JSON.stringify(inp));
    });
  });
});

httpServer.listen(8000, () => console.log("Listening on 8000"));
