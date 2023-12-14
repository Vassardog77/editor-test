import React, { useState } from "react";
import html2canvas from 'html2canvas';
import Textbox from "./Textbox";
import ImageComponent from "./Image"; 
import ResizableImage from "./Custom Components/ResizableImage";
import ResizableTextbox from "./Custom Components/ResizableTextbox";
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

  const saveImage = () => {
    const displayArea = document.querySelector('.display-area');
    const resizableElements = document.querySelectorAll('.resizable-element');
    const resizeHandles = document.querySelectorAll('.resize-handle');
    const rotateHandles = document.querySelectorAll('.rotate-handle');

    // Hide resize and rotate handles
    resizeHandles.forEach(handle => handle.style.display = 'none');
    rotateHandles.forEach(handle => handle.style.display = 'none');

    html2canvas(displayArea).then((canvas) => {
      // Show resize and rotate handles again
      resizeHandles.forEach(handle => handle.style.display = '');
      rotateHandles.forEach(handle => handle.style.display = '');

      const image = canvas.toDataURL('image/png', 1.0);
      downloadImage(image, 'my-canvas.png');
    });
  };

  const downloadImage = (blob, filename) => {
    const fakeLink = window.document.createElement('a');
    fakeLink.href = blob;
    fakeLink.download = filename;
    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);
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
        <button onClick={saveImage}>Save as Image</button>
      </div>
      <div className="display-area">
        {elements.map((element, index) =>
          element.type === "image" ? (
            <DraggableImages key={index}>
                <ResizableImage className="resizable-element" src={element.src}>
                    <ImageComponent src={element.src} />
                </ResizableImage>
            </DraggableImages>
          ) : (
            <DraggableTextbox key={index}>
            <ResizableTextbox className="resizable-element">
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
