import React from "react";
import apiDoc from "../apis.js";
import { useNavigate } from "react-router";

const Home = () => {
  let navigate = useNavigate();

  async function createDoc() {
    let docId = await fetch(apiDoc.craeteDocAPI, { method: "POST" });
    let data = await docId.json();
    console.log(data);
    navigate(`/${data}`);
  }

  return (
    <div className="w-screen flex-col h-screen flex justify-center items-center">
      <h2 className="absolute top-2 font-mono text-3xl">Googly Docs</h2>
      <button
        onClick={createDoc}
        className=" bg-blue-500 text-white p-2 rounded-md hover:bg-blue-400 cursor-pointer"
      >
        + Create a document
      </button>
    </div>
  );
};

export default Home;
