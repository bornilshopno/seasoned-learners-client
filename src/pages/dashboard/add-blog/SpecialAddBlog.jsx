import React, { useState } from 'react';

const SpecialAddBlog = () => {
    const [heading, setHeading] = useState("");
    const [tagline, setTagline] = useState("");

    const [contentBlocks, setContentBlocks] = useState([]);
   const addTextBlock = () => {
  setContentBlocks((prev) => [
    ...prev,
    {
      id: Date.now(),
      type: "text",
      value: "",
    },
  ]);
};
   const addImageBlock = () => {
  setContentBlocks((prev) => [
    ...prev,
    {
      id: Date.now(),
      type: "image",
      file: null,
      preview: "",
    },
  ]);
};
const updateTextBlock = (id, value) => {
  setContentBlocks((prev) =>
    prev.map((block) =>
      block.id === id
        ? { ...block, value }
        : block
    )
  );
};
const updateImageBlock = (id, file) => {
  const preview = URL.createObjectURL(file);

  setContentBlocks((prev) =>
    prev.map((block) =>
      block.id === id
        ? {
            ...block,
            file,
            preview,
          }
        : block
    )
  );
};

const removeBlock = (id) => {
  setContentBlocks((prev) =>
    prev.filter((block) => block.id !== id)
  );
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const blogData = {
    heading,
    tagline,
    content: contentBlocks,
  };

  console.log(blogData);
};

    return (
        <div>

        </div>
    );
};

export default SpecialAddBlog;