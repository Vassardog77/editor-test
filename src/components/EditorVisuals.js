import React, { useState } from "react";
import Textbox from "./Textbox";
import ImageComponent from "./Image"; 
import ResizableImage from "./Custom Components/ResizableImage";
import ResizableTextbox from "./Custom Components/ResizableTextbos";
import DraggableImages from "./Custom Components/DraggableImages";
import DraggableTextbox from "./Custom Components/DraggableTextbox";

function EditorVisuals() {
  const [elements, setElements] = useState([]);

  const fileInputRef = React.useRef(null);

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
    <div className="background">
      <div className="top-bar">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <button onClick={() => fileInputRef.current.click()}>Import Image</button>
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
            <DraggableTextbox key={index}>
            <ResizableTextbox>
              <Textbox
                initialText={element.text}
                onTextChange={(newText) => handleTextChange(index, newText)}
              />
            </ResizableTextbox>
          </DraggableTextbox>
          )
        )}
      </div>
    </div>
  );
}

export default EditorVisuals;
