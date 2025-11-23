import { ArrowLeft, Sparkle, TextIcon, Upload } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const bgColors = ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6'];

const StoryModel = ({ setShowModel }) => {
    const [mode, setMode] = useState('text');
    const [background, setBackground] = useState(bgColors[0]);
    const [text, setText] = useState('');
    const [media, setMedia] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [previewType, setPreviewType] = useState(null); // <-- FIXED

    const handleMediaUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMedia(file);
            setPreviewUrl(URL.createObjectURL(file));

            if (file.type.startsWith("image")) {
                setPreviewType("image");
            } else {
                setPreviewType("video");
            }
        }
    };

    const handleCreateStory = async () => {
        // Implement story creation logic here
        // This could involve uploading media to a server and saving story details
        // For now, we'll just simulate a delay
        return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    return (
        <div className="fixed inset-0 z-110 min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4">
            <div>

                {/* Header */}
                <div className="w-full flex items-center justify-around max-w-md">
                    <button onClick={() => setShowModel(false)} className="text-white p-2 cursor-pointer">
                        <ArrowLeft className="w-6 h-6" />
                    </button>

                    <h2 className="text-lg font-semibold">Create Story</h2>
                    <span className="w-10"></span>
                </div>

                {/* Story Preview */}
                <div
                    className="rounded-lg h-96 w-96 flex items-center justify-center relative ml-2 overflow-hidden"
                    style={{ backgroundColor: background }}
                >
                    {mode === "text" && (
                        <textarea
                            className="bg-transparent text-white w-full h-full p-6 text-lg resize-none focus:outline-none"
                            placeholder="What's on your mind?"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                    )}

                    {mode === "media" && previewUrl && (
                        previewType === "image" ? (
                            <img
                                src={previewUrl}
                                alt="preview"
                                className="object-contain max-h-full"
                            />
                        ) : (
                            <video
                                src={previewUrl}
                                controls
                                className="object-contain max-h-full"
                            />
                        )
                    )}
                </div>

                {/* Background colors */}
                {mode === "text" && (
                    <div className="flex ml-2 mt-4 gap-2">
                        {bgColors.map((color) => (
                            <div
                                key={color}
                                className="w-7 h-7 rounded-full cursor-pointer border-2 border-white/30"
                                style={{ backgroundColor: color }}
                                onClick={() => setBackground(color)}
                            ></div>
                        ))}
                    </div>
                )}

                {/* Buttons */}
                <div className="flex gap-2 mt-4">

                    {/* TEXT button */}
                    <button
                        onClick={() => { setMode('text'); setMedia(null); setPreviewUrl(null); }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
                            mode === 'text'
                                ? 'bg-white text-black'
                                : 'bg-transparent border-white/50 text-white'
                        }`}
                    >
                        <TextIcon size={18} />
                        Text
                    </button>

                    {/* MEDIA button */}
                    <label htmlFor="mediaInput">
                        <input
                            id="mediaInput"
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={(e) => {
                                handleMediaUpload(e);
                                setMode('media');
                            }}
                        />

                        <div
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer ${
                                mode === 'media'
                                    ? 'bg-white text-black'
                                    : 'bg-transparent border-white/50 text-white'
                            }`}
                        >
                            <Upload size={18} />
                            Photo/Video
                        </div>
                    </label>
                </div>
                <button onClick={()=> toast.promise.(handleCreateStory(),{
                    loading: 'Saving...',
                    success: <p>Story Added</p>,
                    error: e => <p>{e.message}</p>,
                })} className='flex item-center justify-center gap-2 text-white py-3 mt-4 w-full
                 rounded bg-gradient-to-r from-indigo-500 to bg-purple-600 hover:to-purple-700
                  active:scale-95 transition cursor-pointer '>
                    <Sparkle size={18} /> Create Story
                </button>

            </div>
        </div>
    );
};

export default StoryModel;
