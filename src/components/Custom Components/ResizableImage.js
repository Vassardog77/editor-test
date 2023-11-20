import React, { useState, useEffect, useRef } from 'react';
import '../../App.css';

function ResizableImage({ children, src }) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const imageContainerRef = useRef(null);

    // Set the image's initial dimensions
    useEffect(() => {
        if (src) {
            const img = new Image();
            img.onload = () => {
                const initialWidth = img.height > 600 ? (img.width / img.height) * 600 : img.width;
                const initialHeight = img.height > 600 ? 600 : img.height;
                setDimensions({ width: initialWidth, height: initialHeight });
            };
            img.src = src;
        }
    }, [src]);

    const startResizing = (e) => {
        e.preventDefault();
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResizing);
    };

    const resize = (e) => {
        const dimensions = imageContainerRef.current.getBoundingClientRect();
        setDimensions({
            width: e.clientX - dimensions.left,
            height: e.clientY - dimensions.top
        });
    };

    const stopResizing = () => {
        window.removeEventListener('mousemove', resize);
        window.removeEventListener('mouseup', stopResizing);
    };

    return (
        <div ref={imageContainerRef} className="image-container" style={{ width: dimensions.width, height: dimensions.height }}>
            {React.cloneElement(children, { width: dimensions.width, height: dimensions.height })}
            <div 
                onMouseDown={startResizing} 
                className="resize-handle" 
            />
        </div>
    );
}

export default ResizableImage;
