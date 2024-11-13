


import { useEffect, useState } from 'react';
import axios from 'axios';
import { socket } from '../../socket';
import TextInput from '../Others/TextInput';
import TextArea from '../Others/TextArea';
import FileUpload from '../Others/FileUpload';
import TagsInputComponent from '../Others/TagsInputComponent';


const AddRoutine = () => {
    const [formData, setFormData] = useState({
        title: '',
        about: '',
        cast: [],
        genres: [],
        isSeries: false,
        underAge: false,
        poster: null,
        video: [],
        videoTrailer: null,
    });
    const [errors, setErrors] = useState({});

    const [state, setState] = useState({
        posterPreview: null,
        videoPreview: null,
        videoTrailerPreview: null,
        posterProgress: 0,
        videoProgress: 0,
        videoTrailerProgress: 0,
    });

    useEffect(() => {
        const handleConnect = () => console.log('Connected to Socket.IO server');
        const handleDisconnect = (reason) => console.log(`Disconnected: ${reason}`);
        const handleTranscodingProgress = (data) => {
            const { progress } = data;
            setState((prevState) => ({ ...prevState, videoProgress: progress }));
        };

        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        socket.on('transcoding-progress', handleTranscodingProgress);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            socket.off('transcoding-progress', handleTranscodingProgress);
        };
    }, []);

    const uploadFile = async (file, type) => {
        const formData = new FormData();
        formData.append(type, file);

        try {
            const response = await axios.post(`http://localhost:5000/api/videos/upload-file`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    setState((prevState) => ({
                        ...prevState,
                        [`${type}Progress`]: progress,
                    }));
                },
            });

            const videoUrls = response.data.videoUrls;
            if (type === 'poster' && videoUrls.poster) {
                setFormData((prevState) => ({ ...prevState, poster: videoUrls.poster }));
                setState((prevState) => ({ ...prevState, posterPreview: videoUrls.poster }));
            } else if (type === 'videoTrailer' && videoUrls.trailer) {
                setFormData((prevState) => ({ ...prevState, videoTrailer: videoUrls.trailer }));
                setState((prevState) => ({ ...prevState, videoTrailerPreview: videoUrls.trailer }));
            } else if (type === 'video') {
                const duration = videoUrls.duration;
                const videoResolutions = Object.entries(videoUrls)
                    .filter(([key]) => key !== 'duration')
                    .map(([resolution, details]) => ({
                        resolution,
                        url: details.url,
                    }));
                setFormData((prevState) => ({ ...prevState, video: videoResolutions, duration }));
                console.log(videoResolutions,'===videoResolutions===')
                setState((prevState) => ({ ...prevState, videoPreview: videoResolutions[0]?.url })); // Preview first resolution

            }
        } catch (error) {
            console.error(`Error uploading ${type}:`, error);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.about) newErrors.about = "About is required";
        if (!formData.poster) newErrors.poster = "Poster is required";
        if (!formData.video.length === 0) newErrors.video = "Video file is required";
        if (!formData.videoTrailer) newErrors.videoTrailer = "Trailer file is required";
        if (formData.cast.length === 0) newErrors.cast = "Please add at least one cast member.";
        if (formData.genres.length === 0) newErrors.genres = "Please add at least one genre.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const dataToSubmit = formData
        console.log(formData)
        try {
            const response = await axios.post('http://localhost:5000/api/videos/upload', dataToSubmit);
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    const handleFileChange = async (e, type) => {
        const file = e.target.files?.[0];
        if (file) {
            await uploadFile(file, type);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div className="mx-auto max-w-2xl">
            <form onSubmit={onSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold text-gray-900">Upload Video</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <TextInput
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                error={errors.title}
                            />
                            <TextArea
                                label="About"
                                name="about"
                                value={formData.about}
                                onChange={handleChange}
                                error={errors.about}
                            />
                            <FileUpload
                                label="Poster"
                                name="poster"
                                type='image'
                                accept="image/*"
                                preview={state.posterPreview}
                                progress={state.posterProgress}
                                onChange={(e) => handleFileChange(e, 'poster')}
                                error={errors.poster}
                            />
                            <FileUpload
                                label="Upload Video"
                                name="video"
                                type='video'
                                accept="video/*"
                                preview={state.videoPreview}
                                progress={state.videoProgress}
                                onChange={(e) => handleFileChange(e, 'video')}
                                error={errors.video}
                            />
                            <FileUpload
                                label="Upload Video Trailer"
                                name="videoTrailer"
                                type='video'
                                accept="video/*"
                                preview={state.videoTrailerPreview}
                                progress={state.videoTrailerProgress}
                                onChange={(e) => handleFileChange(e, 'videoTrailer')}
                                error={errors.videoTrailer}
                            />
                        </div>
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold text-gray-900">Other Information</h2>

                            <TagsInputComponent
                                label="Cast"
                                value={formData.cast}
                                onChange={(newCast) => setFormData((prevState) => ({ ...prevState, cast: newCast }))}
                                error={errors.cast}
                            />
                            <TagsInputComponent
                                label="Genres"
                                value={formData.genres}
                                onChange={(newGenres) => setFormData((prevState) => ({ ...prevState, genres: newGenres }))}
                                error={errors.genres}
                            />

                            <div className="col-span-full mt-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="isSeries"
                                        checked={formData.isSeries}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                                    />
                                    <label className="ml-2 block text-sm text-gray-900">Is this a series?</label>
                                </div>
                            </div>
                            <div className="col-span-full mt-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="underAge"
                                        checked={formData.underAge}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                                    />
                                    <label className="ml-2 block text-sm text-gray-900">For underage audience?</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Upload
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddRoutine;

