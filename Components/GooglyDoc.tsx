import React, { useEffect, useState, useRef } from "react";
import Name from "./Name";
type Item = {
  payload: string;
};

type MessageType = Item[];
let wsc = new WebSocket("ws://localhost:8000");

const GooglyDoc = () => {
  let [message, setMesssage] = useState("");
  let [messages, setMessages] = useState<MessageType>([]);
  let [docs, setDocs] = useState("");
  let textContent: any = useRef(null);

  useEffect(() => {
    if (window.onbeforeunload)
      window.addEventListener("beforeunload", () => {
        // wsc.close();
        console.log("Websocket disconnected!");
      });

    wsc.onopen = () => {
      console.log("tester");
      console.log("Websocket Connected");
    };

    wsc.onmessage = (input: any) => {
      let data = JSON.parse(input.data);
      if (data.type == "DOC-CHANGE") {
        setDocs(data.payload);
      } else if (data.type == "getDoc") {
        setDocs(data.payload);
      } else setMessages((p) => [...p, data]);
    };

    wsc.send(
      JSON.stringify({
        type: "docId",
        docId: location.href.slice(location.href.lastIndexOf("/") + 1),
      })
    );

    wsc.send(
      JSON.stringify({
        type: "getDoc",
        payload: location.href.slice(location.href.lastIndexOf("/") + 1),
      })
    );
  }, []);

  function sendMessage() {
    wsc.send(JSON.stringify({ payload: message }));
    setMesssage("");
  }

  function saveDoc() {
    if (textContent.current) {
      wsc.send(
        JSON.stringify({
          type: "saveDoc",
          payload: textContent.current.value,
        })
      );
    }
  }

  return (
    <div className="relative top-10">
      <Name />
      <div className="flex justify-center w-screen">
        <textarea
          className="w-[90%] border-[0.5px] border-black outline-none relative top-10 resize-none p-2"
          placeholder="Start Typing..."
          name="docs"
          rows={30}
          ref={textContent}
          value={docs}
          onChange={(e) => {
            setDocs(e.target.value);
            wsc.send(
              JSON.stringify({ payload: e.target.value, type: "DOC-CHANGE" })
            );
          }}
        ></textarea>
        <button
          className="cursor-pointer w-max h-max -translate-x-14 right-0 relative bg-blue-400 hover:bg-blue-300 px-2 ml-2 rounded-sm"
          onClick={saveDoc}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default GooglyDoc;
