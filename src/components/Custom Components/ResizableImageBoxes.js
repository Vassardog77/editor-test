import React, { useState, useEffect } from 'react';

function ResizableImage({ children, src }) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [inputWidth, setInputWidth] = useState('');
    const [inputHeight, setInputHeight] = useState('');

    // Set the image's initial dimensions
    useEffect(() => {
        if (src) {
            const img = new Image();
            img.onload = () => {
                const initialWidth = img.height > 600 ? (img.width / img.height) * 600 : img.width;
                const initialHeight = img.height > 600 ? 600 : img.height;
                setDimensions({ width: initialWidth, height: initialHeight });
                setInputWidth(initialWidth);
                setInputHeight(initialHeight);
            };
            img.src = src;
        }
    }, [src]);

    // Handle width and height changes independently
    const handleWidthChange = (newWidth) => {
        setInputWidth(newWidth);
        setDimensions({ ...dimensions, width: newWidth });
    };

    const handleHeightChange = (newHeight) => {
        setInputHeight(newHeight);
        setDimensions({ ...dimensions, height: newHeight });
    };

    return (
        <div>
            {React.cloneElement(children, { width: dimensions.width, height: dimensions.height })}
            <div>
                <input 
                    type="number" 
                    value={inputWidth} 
                    onChange={(e) => handleWidthChange(parseInt(e.target.value, 10) || 0)} 
                    placeholder="Width"
                />
                <input 
                    type="number" 
                    value={inputHeight} 
                    onChange={(e) => handleHeightChange(parseInt(e.target.value, 10) || 0)} 
                    placeholder="Height"
                />
            </div>
        </div>
    );
}

export default ResizableImage;
