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
        <div key={user._id} className="flex items-center gap-4 py-2 hover:bg-gray-50 px-2 rounded">
          <Checkbox
            checked={selectedUsers.includes(user._id)}
            onChange={() => handleToggleUserSelection(user._id)}
          />
          <div className="flex items-center gap-3">
            <Avatar src={user.profilePicture || "https://www.gravatar.com/avatar/?d=mp"} alt={user.name || user.email} size="sm" />
            <div>
              <Typography variant="small" color="blue-gray" className="font-medium">
                {user.name ? user.name : user.email.split('@')[0]}
              </Typography>
              <Typography variant="small" color="gray" className="text-xs">
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
          <div className="w-full h-48 relative overflow-hidden rounded-t-lg group">
            <img
              src={thumbnail || 'http://43.204.2.84:7200/uploads/images/1735548006312-film-596009_640.jpg'}
              alt="video thumbnail"
              className="w-full h-full object-cover rounded-t-lg transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer" onClick={() => handlePlayMedia(file)}>
              <PlayIcon className="h-12 w-12 text-white" />
            </div>
          </div>
        );
      case "audio":
        return (
          <div className="w-full h-48 relative overflow-hidden rounded-t-lg group">
            <img
              src={audioThumbnail || 'http://43.204.2.84:7200/uploads/images/1735547802817-vinyl-4808792_640.jpg'}
              alt="audio thumbnail"
              className="w-full h-full object-cover rounded-t-lg transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer" onClick={() => handlePlayMedia(file)}>
              <PlayIcon className="h-12 w-12 text-white" />
            </div>
          </div>
        );
      case "image":
        return (
          <div className="w-full h-48 relative overflow-hidden rounded-t-lg">
            <img src={path} alt="media" className="w-full h-full object-cover rounded-t-lg" />
          </div>
        );
      case "pdf":
        return (
          <div className="w-full h-48 bg-gray-100 flex flex-col items-center justify-center rounded-t-lg p-4">
            <div className="text-5xl text-red-500 mb-2">PDF</div>
            <Typography variant="small" className="text-center px-2 line-clamp-2">
              {file.title || 'Document'}
            </Typography>
            <Button
              size="sm"
              variant="text"
              color="blue"
              className="mt-2 flex items-center gap-1"
              onClick={() => window.open(path, '_blank')}
            >
              View PDF
            </Button>
          </div>
        );
      default:
        return (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-lg">
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
    <div className="mt-8 mb-8 flex flex-col gap-8">
      <Card className="shadow-sm">
        <div className="rounded-none pt-0 px-4 mt-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <Typography variant="h5" color="blue-gray">
              Media Library
            </Typography>

            <div className="w-full md:w-72">
              <Input
                label="Search by title or tag"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-gray-600" />
              <Typography variant="small" color="gray">
                Filters:
              </Typography>
            </div>

            <div className="w-full md:w-auto md:flex-1">
              <Select
                label="Category"
                value={filters.category}
                onChange={(value) => handleFilterChange('category', value)}
                className="!border !border-blue-gray-50 focus:!border-blue-500 rounded-md"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                menuProps={{ className: "z-[9999]" }}
              >
                {categoryOptions.map((cat) => (
                  <Option key={cat.value} value={cat.value}>
                    {cat.label}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="w-full md:w-auto md:flex-1">
              <Select
                label="File Type"
                value={filters.filetype}
                onChange={(value) => handleFilterChange('filetype', value)}
                className="!border !border-blue-gray-50 focus:!border-500 rounded-md"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                menuProps={{ className: "z-[9999]" }}
              >
                {fileTypeOptions.map((type) => (
                  <Option key={type.value} value={type.value}>
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
                className="flex items-center gap-1 min-w-max"
              >
                <XMarkIcon className="h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        <CardBody className="p-4">
          {videos.length === 0 && !videoLoading ? (
            <div className="text-center py-12">
              <Typography variant="h6" color="gray" className="mb-2">
                No media found
              </Typography>
              <Typography color="gray" className="mb-4">
                Try adjusting your search or filters.
              </Typography>
              <Button variant="outlined" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {videos.map((media) => (
                <Card key={media.id} className="shadow-sm hover:shadow-md transition-shadow duration-200">
                  {renderMediaPreview(media)}

                  <div className="p-4">
                    <Typography variant="h6" className="text-md mb-1 line-clamp-1" title={media.title || "Untitled"}>
                      {media.title || "Untitled"}
                    </Typography>

                    <div className="flex items-center justify-between mb-2">
                      <Chip
                        value={media.filetype.charAt(0).toUpperCase() + media.filetype.slice(1)}
                        size="sm"
                        color={media.filetype === 'video' ? 'blue' : media.filetype === 'audio' ? 'purple' : media.filetype === 'image' ? 'green' : 'gray'}
                        className="rounded-full"
                      />
                      <Typography variant="small" color="gray" className="text-xs">
                        {new Date(media.createdAt).toLocaleDateString()}
                      </Typography>
                    </div>

                    {media.category && (
                      <Typography variant="small" color="blue-gray" className="text-xs mb-3 line-clamp-1">
                        Category: {media.category.replace(/-/g, " ")}
                      </Typography>
                    )}

                    <div className="flex justify-between items-center mt-4">
                      {media.filetype === 'pdf' ? (
                          <Button
                          size="sm"
                          variant="outlined"
                          className="flex items-center gap-1"
                          onClick={() => window.open(media.path, '_blank')}
                          >
                            View PDF
                          </Button>
                      ) : (media.filetype === 'video' || media.filetype === 'audio') ? (
                        <Button
                          size="sm"
                          variant="outlined"
                          className="flex items-center gap-1"
                          onClick={() => handlePlayMedia(media)}
                        >
                          <PlayIcon className="h-4 w-4" />
                          Play
                        </Button>
                      ) : (
                        <div>{/* Empty div to maintain spacing if no action */}</div>
                      )}


                      <div className="flex gap-1">
                        {isRecommendedCategory(media.category) && (
                          <Button
                            size="sm"
                            variant="text"
                            color="blue"
                            onClick={() => {
                              setSelectedVideoToAssign(media.id); // Use media.id here
                              setRecommendationDialogOpen(true);
                            }}
                            title="Assign to users"
                          >
                            <StarIcon className="h-4 w-4" />
                          </Button>
                        )}
                        {role === "admin" && (
                          <Button
                            size="sm"
                            variant="text"
                            color="red"
                            onClick={() => handleDeleteVideo(media.id)} // Use media.id here
                            title="Delete"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
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
        </CardBody>
      </Card>

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
    </div>
  );
}

export default Videos;