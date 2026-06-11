import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';

const SpecialAddBlog = () => {




    const [heading, setHeading] = useState("");    //for content 
    const [tagline, setTagline] = useState("");    //for content 
    const [contentBlocks, setContentBlocks] = useState([]);     //for content 
   
       //for content 
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
        <div className='pl-4 pt-4'>
            <div className='p-2 border-2 rounded-lg'>
                <h3>Content Area: </h3>
                <div className="flex gap-3 py-2">
                    <Button
                        type="button"
                        onClick={addTextBlock}
                    >
                        + Add Text
                    </Button>

                    <Button
                        type="button"
                        onClick={addImageBlock}
                    >
                        + Add Image
                    </Button>
                </div>
                <div className="space-y-6">
                    {contentBlocks.map((block, index) => (
                        <div
                            key={block.id}
                            className="border rounded-lg p-4"
                        >
                            <div className="flex justify-between mb-3">
                                <span>
                                    Block {index + 1} ({block.type})
                                </span>

                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => removeBlock(block.id)}
                                >
                                    Remove
                                </Button>
                            </div>

                            {block.type === "text" && (
                                <Textarea
                                    rows={6}
                                    value={block.value}
                                    placeholder="Write paragraph..."
                                    onChange={(e) =>
                                        updateTextBlock(
                                            block.id,
                                            e.target.value
                                        )
                                    }
                                />
                            )}

                            {block.type === "image" && (
                                <div>
                                    {!block.preview ? (
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                updateImageBlock(
                                                    block.id,
                                                    e.target.files[0]
                                                )
                                            }
                                        />
                                    ) : (
                                        <img
                                            src={block.preview}
                                            alt=""
                                            className="rounded-lg max-h-64"
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default SpecialAddBlog;