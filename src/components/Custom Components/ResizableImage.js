import React, { useState, useRef, useEffect } from 'react';

function ResizableImage({ children }) {
  const [size, setSize] = useState({ width: 200, height: 200 });
  const resizeRef = useRef(null);
  const [resizing, setResizing] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });

  const startResizing = (e) => {
    e.preventDefault();
    setResizing(true);
    setInitialMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
  };

  const resize = (e) => {
    if (!resizing) return;

    const deltaX = e.clientX - initialMousePosition.x;
    const deltaY = e.clientY - initialMousePosition.y;
    setSize(prevSize => ({
      width: Math.max(100, prevSize.width + deltaX),
      height: Math.max(100, prevSize.height + deltaY)
    }));
    setInitialMousePosition({ x: e.clientX, y: e.clientY });
  };

  const stopResizing = () => {
    setResizing(false);
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResizing);
  };

  useEffect(() => {
    if (resizeRef.current && resizeRef.current.firstChild) {
      const img = resizeRef.current.firstChild;
      const updateSize = () => {
        setSize({ width: img.offsetWidth, height: img.offsetHeight });
      };
      if (img.complete) {
        updateSize();
      } else {
        img.onload = updateSize;
      }
    }
  }, [children]);

  // Apply the size to the image
  const imageStyle = { width: size.width + 'px', height: size.height + 'px' };

  return (
    <div ref={resizeRef} style={{ width: size.width, height: size.height, position: 'relative', zIndex: 1 }}>
      {React.cloneElement(children, { style: imageStyle })}
      <div 
        onMouseDown={startResizing} 
        style={{
          position: 'absolute', 
          bottom: 0, 
          right: 0, 
          cursor: 'nwse-resize', 
          background: 'white',
          outline: "solid", 
          width: '20px', 
          height: '20px', 
          zIndex: 2 
        }} 
      />
    </div>
  );
}

export default ResizableImage;
