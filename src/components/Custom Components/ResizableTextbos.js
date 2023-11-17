import React, { useState, useRef } from 'react';
import '../../App.css';

function ResizableTextbox({ children }) {
  const [size, setSize] = useState({ width: 200, height: 200 }); // Default size
  const resizeRef = useRef(null);

  const startResizing = (e) => {
    e.preventDefault();
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
  };

  const resize = (e) => {
    const dimensions = resizeRef.current.getBoundingClientRect();
    setSize({
      width: e.clientX - dimensions.left,
      height: e.clientY - dimensions.top
    });
  };

  const stopResizing = () => {
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResizing);
  };

  return (
    <div className="textbox" ref={resizeRef} style={{ width: size.width, height: size.height, position: 'relative', zIndex: 1, outlineStyle: "solid" }}>
      {children}
      <div onMouseDown={startResizing} style={{ position: 'absolute', bottom: 0, right: 0, cursor: 'nwse-resize', background: '#333', width: '20px', height: '20px', zIndex: 2 }} />
    </div>
  );
}

export default ResizableTextbox;
