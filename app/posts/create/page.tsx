'use client'
import { useState, ChangeEvent, FormEvent } from 'react';

const CreatePost = () => {
const [title, setTitle] = useState<string>('');
const [bio, setBio] = useState<string>('');
const [content, setContent] = useState<string>('');

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.length > 40) {
        alert("Title must be 100 characters or less");
        return;
    }

    if (bio.length > 100) {
        alert("Bio must be 255 characters or less");
        return;
    }

    try {
    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, bio, content }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Post created successfully:', data);
        setTitle('');
        setBio('');
        setContent('');
    } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
    }
    } catch (error) {
    console.error('Error submitting form:', error);
    }
};

const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
};

const handleBioChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
};
const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
};

return (
    <form onSubmit={handleSubmit} className='bg-[#3b69de] rounded-[30px] w-[45%] h-[600px] flex flex-col items-center justify-around'>
        <div className='pt-[20px] flex flex-col w-[100%] justify-start h-[60px] items-center '>
            <label className='text-[20px]' htmlFor="title">Title</label>
            <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            maxLength={100}
            required
            className='p-[15px] h-[40px] w-[80%] rounded-[5px]'
        
            />
        </div>

        <div className='pt-[20px] flex flex-col w-[100%] justify-start h-[120px] items-center'>
            <label className='text-[20px]' htmlFor="bio">Bio</label>
            <textarea
            id="bio"
            value={bio}
            onChange={(e) => {
                handleBioChange(e);
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            maxLength={255}
            required
            className='p-[15px] w-[80%] h-[90px] rounded-[5px]'
            />
        </div>
        <div className='pt-[20px]200 flex flex-col w-[100%] justify-start h-[180px] items-center'>
            <label className='text-[20px]' htmlFor="content">Content</label>
            <textarea
            id="content"
            value={content}
            onChange={(e) => {
                handleContentChange(e);
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            maxLength={255}
            required
            className='p-[15px] w-[80%] h-[100px] rounded-[5px]'
            />
        </div>

        <button type="submit" className='justify-items-start  rounded-[10px] bg-[#ffffff] p-[15px]'>
            Create Post
        </button>
    </form>
);
};

export default CreatePost;
