import React, { useState } from "react";
import Textbox from "./Textbox";
import ImageComponent from "./Image"; 
import ResizableImage from "./Custom Components/ResizableImage";
import ResizableTextbox from "./Custom Components/ResizableTextbos";
import DraggableImages from "./Custom Components/DraggableImages";

function EditorVisuals() {
  const [elements, setElements] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setElements([...elements, { type: "image", src: url }]);
  };

  const addTextBox = () => {
    setElements([...elements, { type: "text", text: "New Text Box" }]);
  };

  const handleTextChange = (index, newText) => {
    const newElements = [...elements];
    newElements[index].text = newText;
    setElements(newElements);
  };

  return (
    <div className="App">
      <div className="top-bar">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={addTextBox}>Add Text Box</button>
      </div>
      <div className="display-area">
        {elements.map((element, index) =>
          element.type === "image" ? (
            <DraggableImages key={index}>
                <ResizableImage src={element.src}>
                    <ImageComponent src={element.src} />
                </ResizableImage>
            </DraggableImages>
          ) : (
            <ResizableTextbox key={index}>
              <Textbox
                initialText={element.text}
                onTextChange={(newText) => handleTextChange(index, newText)}
              />
            </ResizableTextbox>
          )
        )}
      </div>
    </div>
  );
}

export default EditorVisuals;
