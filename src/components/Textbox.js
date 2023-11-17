import React, { useState, useEffect, useRef } from "react";

function Textbox({ initialText, onTextChange }) {
  const [text, setText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);
  const [isFirstEdit, setIsFirstEdit] = useState(true);
  const inputRef = useRef(null);

  const handleFocus = () => {
    if (isFirstEdit) {
      setText('');
      setIsFirstEdit(false);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    onTextChange(text);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
      handleFocus();
    }
  }, [isEditing]);

  return (
    <div onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
        />
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
}

export default Textbox;
