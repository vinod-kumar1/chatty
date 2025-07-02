import React, { useRef, useState } from "react";

const Name = () => {
  let [docName, setDocName] = useState({
    disable: true,
    name: "Document name",
  });
  let nameInput: any = useRef("");

  function startEdit() {
    if (nameInput.current) nameInput.current.focus();
    setDocName((p) => ({ ...p, disable: false }));
  }
  return (
    <div className=" flex justify-center">
      <input
        type="text"
        value={docName.name}
        ref={nameInput}
        disabled={docName.disable}
        className="relative text-2xl w-[min-content] text-center outline-none underline "
        onChange={(e) => setDocName((p) => ({ ...p, name: e.target.value }))}
      />
      {docName.disable ? (
        <button
          className="cursor-pointer hover:bg-blue-400 px-2 rounded-sm"
          onClick={startEdit}
        >
          ✎
        </button>
      ) : (
        <button
          className="cursor-pointer bg-blue-400 hover:bg-blue-300 px-2 ml-2 rounded-sm"
          onClick={() => setDocName((p) => ({ ...p, disable: true }))}
        >
          Save
        </button>
      )}
    </div>
  );
};

export default Name;
