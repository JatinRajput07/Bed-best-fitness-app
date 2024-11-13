import { PhotoIcon } from '@heroicons/react/24/solid';

const FileUpload = ({ label, name, preview, progress, onChange, error, type ,accept}) => {
    return (
        <div className="col-span-full">

            <label htmlFor={name} className="block text-sm font-medium text-gray-900">
                {label}
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                    {preview ? (
                        ( type === 'image' ? <img src={preview} alt='' className="mx-auto h-16 w-32 object-cover" /> : <video src={preview} className="mx-auto h-16 w-32 object-cover" /> )
                    ) : (
                    <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                    )}
                    {progress > 0 && progress < 100 && (
                        <div>
                            <progress value={progress} max="100"></progress>
                        </div>
                    )}
                    <div className="mt-4 flex text-sm text-gray-600">
                        <label htmlFor={`${name}-upload`} className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                            <span>Upload a file</span>
                            <input
                                id={`${name}-upload`}
                                name={name}
                                type="file"
                                accept={accept}
                                className="sr-only"
                                onChange={onChange}
                            />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    {error && <p className="text-red-500 text-xs mt-1 italic">{error}</p>}
                </div>
            </div>
        </div>
    )
};
export default FileUpload;
