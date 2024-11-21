import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import AddRoutine from "../../components/AddRoutine"
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../redux/videoSlice";

const Videos = () => {
    const dispatch = useDispatch()
    const [isListing, setIsListing] = useState(false);
    const { videos } = useSelector(state => state.videos)

    useEffect(() => {
        dispatch(fetchVideos())
    }, [dispatch])


    function convertSecondsToMinutes(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}.${(remainingSeconds).toFixed()} Minuts`;
    }

    return (
        <AdminLayout title="Videos" buttonLabel={isListing ? "Add Video" : "Go to List"} onButtonClick={() => setIsListing(!isListing)} >
            {isListing && <AddRoutine />}
            {!isListing && (
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="py-8">
                        <div>
                            <h2 className="text-2xl font-semibold leading-tight">Invoices</h2>
                        </div>
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div
                                className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                            >
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                Poster / Title
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                Cast
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                Genres
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                Movie/Series
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                UnderAge (16+)
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                Duration
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                            ></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {videos.map((item, i) => (
                                            <tr key={i + 1}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className="flex">
                                                        <div className="flex-shrink-0 w-10 h-10">
                                                            <img
                                                                className="w-full h-full rounded-full"
                                                                src={item.poster} alt=""
                                                            />
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                               {item.title}
                                                            </p>
                                                            {/* <p className="text-gray-600 whitespace-no-wrap">000004</p> */}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{item.cast.join(', ')}</p>
                                                </td>

                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{item.genres.join(', ')}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <span
                                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                    >
                                                        <span
                                                            aria-hidden
                                                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                        ></span>
                                                        <span className="relative">{item.isSeries ? "Series" : "Movie"}</span>
                                                    </span>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <span
                                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                    >
                                                        <span
                                                            aria-hidden
                                                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                        ></span>
                                                        <span className="relative">{item.underAge ? "Yes" : "No"}</span>
                                                    </span>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <span
                                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                    >
                                                        <span
                                                            aria-hidden
                                                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                        ></span>
                                                        <span className="relative">{convertSecondsToMinutes(item.duration)}</span>
                                                    </span>
                                                </td>
                                                <td
                                                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                                                >
                                                    <button
                                                        type="button"
                                                        className="inline-block text-gray-500 hover:text-gray-700"
                                                    >
                                                        <svg
                                                            className="inline-block h-6 w-6 fill-current"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            )
            }

        </AdminLayout >
    );
};

export default Videos;
