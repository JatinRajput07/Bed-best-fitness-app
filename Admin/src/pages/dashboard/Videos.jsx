import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchVideos } from "@/redux/videoSlice";
import { fetchUsers } from "@/redux/userSlice";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Checkbox,
  Input,
  IconButton,
  Select,
  Option,
  Chip,
  Avatar,
  Spinner, // Import Spinner for loading indicator
} from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import { TrashIcon, StarIcon, PlayIcon, FunnelIcon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Axios from "@/configs/Axios";
import ReactPlayer from 'react-player';

export function Videos() {
  const dispatch = useDispatch();
  const [selectedVideoToAssign, setSelectedVideoToAssign] = useState(null);
  const [recommendationDialogOpen, setRecommendationDialogOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Items per page
  const [filters, setFilters] = useState({
    category: '',
    filetype: '',
  });
  const [mediaPlaybackDialogOpen, setMediaPlaybackDialogOpen] = useState(false);
  const [currentPlayingMedia, setCurrentPlayingMedia] = useState(null);
  const [hasMore, setHasMore] = useState(true); // State to track if there are more items to load
  const [allCategories, setAllCategories] = useState([]); // New state for all categories
  const [allFileTypes, setAllFileTypes] = useState([]); // New state for all file types

  // Ref for the element that triggers loading more items
  const observerTarget = useRef(null);

  const { videos, loading: videoLoading, error: videoError, totalCount } = useSelector((state) => state.videos);
  const { users, loading: userLoading, error: userError } = useSelector((state) => state.users);
  const { role } = useSelector((state) => state.auth);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1); // Reset to first page on new search
      setHasMore(true); // Assume there's more data for a new search
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Fetch videos and users based on pagination and filters
  useEffect(() => {
    // Only fetch if there are potentially more items OR it's the first page load
    if (!hasMore && currentPage > 1 && !videoLoading) return; // Prevent unnecessary fetches if no more data and not initial load

    const params = {
      page: currentPage,
      limit: itemsPerPage,
      search: debouncedSearchQuery,
      category: filters.category,
      filetype: filters.filetype,
    };

    dispatch(fetchVideos(params))
      .unwrap() // Use unwrap to handle fulfilled/rejected states directly
      .then((payload) => {
        // Here, `payload.data` is the *new* videos array, and `payload.totalCount` is the total.
        // It's crucial that your Redux `videoSlice` appends the new `payload.data` to the existing `videos` array in its state.
        // If your Redux store replaces `videos` on each fetch, this infinite scroll logic won't work correctly.

        // Determine if there are more items to load
        if ((currentPage * itemsPerPage) >= payload.totalCount) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        // Also, fetch all unique categories and file types only once or when necessary
        // This could be a separate API endpoint to get all filter options,
        // or derived from the first comprehensive fetch.
        // For demonstration, let's assume we fetch them once.
        // In a real application, you might have a dedicated API endpoint for this.
        if (allCategories.length === 0 || allFileTypes.length === 0) {
          fetchUniqueFilterOptions();
        }

      })
      .catch((err) => {
        console.error("Failed to fetch videos:", err);
        // Handle error, maybe set hasMore to false if it's a persistent issue
        // toast.error("Failed to load media."); // Optionally show a toast for errors
      });

    // Fetch users, typically not paginated for assignment dialog
    dispatch(fetchUsers({}));
  }, [dispatch, currentPage, itemsPerPage, debouncedSearchQuery, filters]); // Removed hasMore from dependencies to prevent re-triggering when hasMore becomes false due to data exhaustion

  // Function to fetch all unique categories and file types
  // This should ideally hit an API endpoint that returns all unique categories and file types,
  // not just those from the current `videos` state.
  const fetchUniqueFilterOptions = useCallback(async () => {
    try {
      // Assuming your backend has an endpoint to get all unique categories/filetypes
      const categoriesResponse = await Axios.get('/admin/unique-categories'); // Replace with your actual API endpoint
      const fileTypesResponse = await Axios.get('/admin/unique-filetypes'); // Replace with your actual API endpoint

      setAllCategories(categoriesResponse.data.categories || []);
      setAllFileTypes(fileTypesResponse.data.filetypes || []);
    } catch (error) {
      console.error("Failed to fetch unique filter options:", error);
      // Fallback to deriving from current videos if API fails
      setAllCategories([...new Set(videos.map(media => media.category).filter(Boolean))]);
      setAllFileTypes([...new Set(videos.map(media => media.filetype).filter(Boolean))]);
    }
  }, [videos]); // Only re-run if videos array structure changes, though ideally it should be independent.

  // Fetch unique filter options on component mount
  useEffect(() => {
    fetchUniqueFilterOptions();
  }, [fetchUniqueFilterOptions]);


  // Intersection Observer for Infinite Scrolling
  useEffect(() => {
    if (videoLoading) return; // Don't observe if data is currently loading

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !videoLoading) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 } // Trigger when the target is fully visible
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [videoLoading, hasMore]); // Re-run effect when loading state or hasMore changes

  // Reset page and hasMore when filters change
  useEffect(() => {
    // Only reset if filters *actually* changed, not on initial mount or when debounced search updates
    if (currentPage !== 1 || !hasMore) { // This condition helps prevent unnecessary resets
      setCurrentPage(1);
      setHasMore(true);
    }
  }, [filters, debouncedSearchQuery]); // Added debouncedSearchQuery here as it also affects data fetch

  if (videoError || userError) return <div className="text-red-500 text-center py-4">Error: {videoError || userError}</div>;

  const handleDeleteVideo = (videoId) => {
    Axios
      .delete(`/admin/video-list/${videoId}`)
      .then(() => {
        toast.success("Media deleted successfully!");
        // Re-fetch the first page to reflect deletion and re-initialize pagination
        // This will trigger the main useEffect for video fetching
        setCurrentPage(1);
        setHasMore(true); // Assume there's more data after a deletion, potentially causing re-evaluation of totalCount
      })
      .catch(() => toast.error("Error deleting media."));
  };

  const handleRecommendVideo = () => {
    const recommendationPromises = selectedUsers.map((userId) =>
      Axios.post(`/api/recommendation`, {
        videoId: selectedVideoToAssign,
        userId,
      })
    );

    Promise.all(recommendationPromises)
      .then(() => {
        toast.success("Media assigned successfully!");
        setRecommendationDialogOpen(false);
        setSelectedUsers([]);
        setSearchQuery(""); // Clear search in dialog
      })
      .catch(() => toast.error("Error assigning media."));
  };

  const handleToggleUserSelection = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handlePlayMedia = (media) => {
    setCurrentPlayingMedia(media);
    setMediaPlaybackDialogOpen(true);
  };

  const renderUsers = () =>
    users
      .filter((user) => user.role === "user" && (user.name?.toLowerCase().includes(searchQuery.toLowerCase()) || user.email?.toLowerCase().includes(searchQuery.toLowerCase())))
      .map((user) => (
        <div key={user._id} className="flex items-center gap-4 p-3 hover:bg-blue-50/50 rounded-xl transition-all border border-transparent hover:border-blue-100 cursor-pointer">
          <Checkbox
            checked={selectedUsers.includes(user._id)}
            onChange={() => handleToggleUserSelection(user._id)}
            color="blue"
            className="rounded-full w-5 h-5 hover:before:opacity-0"
            containerProps={{
              className: "p-0",
            }}
          />
          <div className="flex items-center gap-4">
            <Avatar
              src={user.profilePicture || "https://www.gravatar.com/avatar/?d=mp"}
              alt={user.name || user.email}
              size="sm"
              className="border border-blue-gray-100 shadow-sm"
            />
            <div>
              <Typography variant="small" color="blue-gray" className="font-semibold text-sm">
                {user.name ? user.name : user.email.split('@')[0]}
              </Typography>
              <Typography variant="small" color="gray" className="text-xs font-normal">
                {user.email}
              </Typography>
            </div>
          </div>
        </div>
      ));

  const renderMediaPreview = (file) => {
    const { filetype, path, thumbnail, audioThumbnail } = file;

    switch (filetype) {
      case "video":
        return (
          <div className="w-full h-48 relative overflow-hidden rounded-t-xl group bg-gray-100">
            <img
              src={thumbnail || 'http://43.204.2.84:7200/uploads/images/1735548006312-film-596009_640.jpg'}
              alt="video thumbnail"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] cursor-pointer" onClick={() => handlePlayMedia(file)}>
              <div className="bg-white/20 p-3 rounded-full backdrop-blur-md border border-white/50 hover:scale-110 transition-transform duration-200">
                <PlayIcon className="h-8 w-8 text-white pl-1" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-white text-[10px] font-medium uppercase tracking-wider">
              Video
            </div>
          </div>
        );
      case "audio":
        return (
          <div className="w-full h-48 relative overflow-hidden rounded-t-xl group bg-gray-100">
            <img
              src={audioThumbnail || 'http://43.204.2.84:7200/uploads/images/1735547802817-vinyl-4808792_640.jpg'}
              alt="audio thumbnail"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center bg-purple-900/30 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] cursor-pointer" onClick={() => handlePlayMedia(file)}>
              <div className="bg-white/20 p-3 rounded-full backdrop-blur-md border border-white/50 hover:scale-110 transition-transform duration-200">
                <PlayIcon className="h-8 w-8 text-white pl-1" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-purple-900/60 backdrop-blur-sm px-2 py-0.5 rounded text-white text-[10px] font-medium uppercase tracking-wider">
              Audio
            </div>
          </div>
        );
      case "image":
        return (
          <div className="w-full h-48 relative overflow-hidden rounded-t-xl group bg-gray-100">
            <img src={path} alt="media" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        );
      case "pdf":
        return (
          <div className="w-full h-48 bg-gray-50 flex flex-col items-center justify-center rounded-t-xl p-4 gap-3 border-b border-gray-100 group">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 group-hover:shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" clipRule="evenodd" />
                <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
              </svg>
            </div>
            <Typography variant="small" className="text-center px-2 line-clamp-2 font-medium text-gray-700">
              {file.title || 'Document'}
            </Typography>
            <Button
              size="sm"
              variant="text"
              color="blue"
              className="flex items-center gap-1 hover:bg-blue-50"
              onClick={() => window.open(path, '_blank')}
            >
              View PDF
            </Button>
          </div>
        );
      default:
        return (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-t-xl">
            <Typography variant="small" color="red">
              Unsupported file type
            </Typography>
          </div>
        );
    }
  };

  const isRecommendedCategory = (category) =>
    ["Workout Video", "Recipe Video", "Knowledge Video", "Story/Podcast/Recognition"].includes(category);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
    setHasMore(true); // Assume more data when filters change
  };

  const clearFilters = () => {
    setFilters({ category: '', filetype: '' });
    setSearchQuery('');
    setDebouncedSearchQuery('');
    setCurrentPage(1);
    setHasMore(true);
  };

  // Use allCategories and allFileTypes for filter options
  const categoryOptions = [
    { label: "All Categories", value: "" },
    ...allCategories.map(category => ({
      label: category.replace(/-/g, " "),
      value: category
    }))
  ];

  const fileTypeOptions = [
    { label: "All Types", value: "" },
    ...allFileTypes.map(type => ({
      label: type.charAt(0).toUpperCase() + type.slice(1),
      value: type
    }))
  ];

  return (
    <div className="mt-8 mb-12 flex flex-col gap-8 max-w-[1600px] mx-auto w-full px-4">
      <div className="rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <Typography variant="h4" color="blue-gray" className="font-bold tracking-tight">
              Media Library
            </Typography>
            <Typography variant="small" color="gray" className="mt-1 font-normal opacity-70">
              Manage, search, and organize your digital assets.
            </Typography>
          </div>


          <div className="w-full md:w-80">
            <Input
              label="Search library..."
              icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="!border-gray-200 focus:!border-gray-900 !rounded-lg"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{
                className: "!min-w-[100px]",
              }}
              placeholder="Search library..."
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-50 rounded-lg">
              <FunnelIcon className="h-4 w-4 text-gray-700" />
            </div>
            <Typography variant="small" color="blue-gray" className="font-semibold">
              Filters:
            </Typography>
          </div>

          <div className="w-full md:w-auto md:flex-1 grid grid-cols-2 lg:flex gap-4">
            <div className="w-full lg:w-56">
              <Select
                label="Category"
                value={filters.category}
                onChange={(value) => handleFilterChange('category', value)}
                className="!border-gray-200 focus:!border-gray-900 !rounded-lg"
                labelProps={{
                  className: "text-gray-500",
                }}
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
              >
                {categoryOptions.map((cat) => (
                  <Option key={cat.value} value={cat.value} className="py-3">
                    {cat.label}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="w-full lg:w-56">
              <Select
                label="File Type"
                value={filters.filetype}
                onChange={(value) => handleFilterChange('filetype', value)}
                className="!border-gray-200 focus:!border-gray-900 !rounded-lg"
                labelProps={{
                  className: "text-gray-500",
                }}
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
              >
                {fileTypeOptions.map((type) => (
                  <Option key={type.value} value={type.value} className="py-3">
                    {type.label}
                  </Option>
                ))}
              </Select>
            </div>
            {(filters.category || filters.filetype || searchQuery) && (
              <Button
                variant="text"
                color="red"
                size="sm"
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 hover:bg-red-50 rounded-full h-[42px]"
              >
                <XMarkIcon className="h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="px-0">
        {videos.length === 0 && !videoLoading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-100 border-dashed">
            <div className="p-4 bg-gray-50 rounded-full mb-4">
              <MagnifyingGlassIcon className="h-8 w-8 text-gray-400" />
            </div>
            <Typography variant="h6" color="blue-gray" className="mb-2 font-medium">
              No media found
            </Typography>
            <Typography color="gray" className="mb-6 opacity-70">
              We couldn't find any media matching your current filters.
            </Typography>
            <Button variant="outlined" color="gray" onClick={clearFilters} className="rounded-full border-gray-300">
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((media) => (
              <Card key={media.id} className="group shadow-sm hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1">
                {renderMediaPreview(media)}

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <Typography variant="h6" className="text-[17px] font-bold text-blue-gray-900 line-clamp-1 leading-snug" title={media.title || "Untitled"}>
                      {media.title || "Untitled"}
                    </Typography>
                  </div>


                  <div className="flex items-center gap-2 mb-4">
                    <Chip
                      value={media.filetype.charAt(0).toUpperCase() + media.filetype.slice(1)}
                      size="sm"
                      variant="ghost"
                      color={media.filetype === 'video' ? 'blue' : media.filetype === 'audio' ? 'purple' : media.filetype === 'image' ? 'green' : 'gray'}
                      className="rounded-full px-3 py-1 text-[10px] capitalize font-bold leading-none"
                    />
                    <Typography variant="small" color="gray" className="text-xs font-normal opacity-70">
                      {new Date(media.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </Typography>
                  </div>

                  {media.category && (
                    <div className="flex items-center gap-1.5 mb-5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-gray-300"></div>
                      <Typography variant="small" color="blue-gray" className="text-xs font-medium opacity-80 line-clamp-1">
                        {media.category.replace(/-/g, " ")}
                      </Typography>
                    </div>
                  )}

                  <div className="flex justify-end items-center gap-2 pt-4 border-t border-gray-50">
                    {media.filetype === 'pdf' ? (
                      <></> // Button is now in preview
                    ) : (media.filetype === 'video' || media.filetype === 'audio') ? (
                      <Button
                        size="sm"
                        variant="text"
                        className="flex items-center gap-2 hover:bg-gray-50 text-gray-700 capitalize p-2 rounded-lg"
                        onClick={() => handlePlayMedia(media)}
                      >
                        <PlayIcon className="h-4 w-4" />
                        <span className="hidden sm:inline">Play</span>
                      </Button>
                    ) : null}



                    {isRecommendedCategory(media.category) && (
                      <Button
                        size="sm"
                        variant="text"
                        color="blue"
                        className="flex items-center justify-center p-2 rounded-lg hover:bg-blue-50"
                        onClick={() => {
                          setSelectedVideoToAssign(media.id);
                          setRecommendationDialogOpen(true);
                        }}
                        title="Assign to users"
                      >
                        <StarIcon className="h-5 w-5" />
                      </Button>
                    )}
                    {role === "admin" && (
                      <Button
                        size="sm"
                        variant="text"
                        color="red"
                        className="flex items-center justify-center p-2 rounded-lg hover:bg-red-50"
                        onClick={() => handleDeleteVideo(media.id)}
                        title="Delete"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </Button>
                    )}

                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Intersection Observer Target */}
        {hasMore && !videoLoading && (
          <div ref={observerTarget} className="flex justify-center items-center py-8">
            <Spinner className="h-10 w-10" />
            <Typography className="ml-2">Loading more media...</Typography>
          </div>
        )}

        {!hasMore && videos.length > 0 && !videoLoading && (
          <div className="text-center py-8">
            <Typography color="gray">You've reached the end of the list.</Typography>
          </div>
        )}

        {videoLoading && currentPage === 1 && ( // Show initial loading spinner
          <div className="flex justify-center items-center h-64">
            <Spinner className="h-12 w-12" />
            <Typography className="ml-4">Loading media...</Typography>
          </div>
        )}
      </div>


      {/* Assign Media to Users Dialog (remains mostly same) */}
      <Dialog open={recommendationDialogOpen} handler={() => setRecommendationDialogOpen(false)} size="md">
        <DialogBody className="max-h-[60vh] overflow-y-auto p-0">
          <div className="sticky top-0 z-10 bg-white p-4 border-b">
            <Typography variant="h5" color="blue-gray">
              Recommend to Users
            </Typography>
            <div className="mt-3">
              <Input
                label="Search Users"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="p-4">
            {users.filter(u => u.role === 'user').length === 0 ? (
              <Typography color="gray" className="text-center py-8">
                No users found
              </Typography>
            ) : (
              renderUsers()
            )}
          </div>
        </DialogBody>
        <DialogFooter className="border-t">
          <Button
            variant="text"
            color="red"
            onClick={() => {
              setRecommendationDialogOpen(false);
              setSelectedUsers([]);
              setSearchQuery("");
            }}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            color="blue"
            onClick={handleRecommendVideo}
            disabled={selectedUsers.length === 0}
          >
            Recommend ({selectedUsers.length})
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Media Playback Dialog (remains same) */}
      <Dialog open={mediaPlaybackDialogOpen} handler={() => setMediaPlaybackDialogOpen(false)} size="lg">
        <DialogBody className="p-0">
          {currentPlayingMedia && (
            <>
              <div className="relative w-full h-[60vh] bg-black">
                {currentPlayingMedia.filetype === "video" && (
                  <ReactPlayer
                    url={currentPlayingMedia.path}
                    controls
                    playing
                    width="100%"
                    height="100%"
                    className="absolute top-0 left-0"
                  />
                )}
                {currentPlayingMedia.filetype === "audio" && (
                  <div className="flex flex-col items-center justify-center h-full p-4">
                    <img
                      src={currentPlayingMedia.audioThumbnail || 'http://43.204.2.84:7200/uploads/images/1735547802817-vinyl-4808792_640.jpg'}
                      alt="audio thumbnail"
                      className="h-48 w-48 object-cover rounded-lg mb-4 shadow-lg"
                    />
                    <Typography variant="h5" color="white" className="mb-4 text-center">
                      {currentPlayingMedia.title || "Untitled Audio"}
                    </Typography>
                    <audio controls autoPlay className="w-full max-w-md">
                      <source src={currentPlayingMedia.path} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </div>
              <div className="p-4">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  {currentPlayingMedia.title || "Untitled"}
                </Typography>
                <Typography variant="small" color="gray">
                  Category: {currentPlayingMedia.category?.replace(/-/g, " ") || 'Uncategorized'} | Type: {currentPlayingMedia.filetype}
                </Typography>
              </div>
            </>
          )}
        </DialogBody>
        <DialogFooter className="border-t p-4">
          <Button variant="gradient" color="gray" onClick={() => setMediaPlaybackDialogOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </div >
  );
}

export default Videos;