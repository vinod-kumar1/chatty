import React, { useEffect, useState } from "react";
type Item = {
  payload: string;
};

type MessageType = Item[];
let wsc = new WebSocket("ws://localhost:8000");

const App = () => {
  let [message, setMesssage] = useState("");
  let [messages, setMessages] = useState<MessageType>([]);
  let [docs, setDocs] = useState("");

  useEffect(() => {
    if (window.onbeforeunload)
      window.addEventListener("beforeunload", () => {
        // wsc.close();
        console.log("Websocket disconnected!");
      });

    wsc.onopen = () => {
      console.log("Websocket Connected");
    };
    wsc.onmessage = (input: any) => {
      let data = JSON.parse(input.data);
      if (data.type == "DOC-CHANGE") {
        setDocs(data.payload);
      } else setMessages((p) => [...p, data]);
    };
  }, []);

  function sendMessage() {
    wsc.send(JSON.stringify({ payload: message }));
    setMesssage("");
  }

  return (
    <div className="relative top-10">
      <h1 className="relative top-2">Docs</h1>
      <textarea
        className="relative top-10"
        placeholder="Start Typing..."
        rows={10}
        cols={40}
        name="docs"
        value={docs}
        onChange={(e) => {
          setDocs(e.target.value);
          wsc.send(
            JSON.stringify({ payload: e.target.value, type: "DOC-CHANGE" })
          );
        }}
      ></textarea>
    </div>
  );
};

export default App;
