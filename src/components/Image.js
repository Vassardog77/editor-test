import React from 'react';
import '../App.css';

function Image({ src }) {
    return <img src={src} alt="Uploaded" className="importedImage" />;
}

export default Image;
