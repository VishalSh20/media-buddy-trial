import { useEffect, useState } from "react";
import { api } from "../../../axios.config";
import { MdArrowBack, MdArrowForward, MdErrorOutline } from "react-icons/md";
import { Spinner } from "flowbite-react";
import PropTypes from "prop-types"

VideoGallery.propTypes = {
    page: PropTypes.number.isRequired, 
    setPage: PropTypes.func.isRequired
  };

function VideoGallery({ page, setPage }) {
  const [limit, setLimit] = useState(10);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const requestURL = `${import.meta.env.VITE_BACKEND_URL}/videos?page=${page}&limit=${limit}`;
    api
      .get(requestURL)
      .then((response) => {
        setVideos(response.data?.contents);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, limit]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Pagination */}
      <section
        className={`flex flex-wrap items-center justify-between rounded-md p-2 bg-violet-400 ${
          loading ? "hidden" : ""
        }`}
      >
        <div className="flex gap-2 rounded-md">
          <button
            disabled={loading || page == 1}
            onClick={() => setPage((page) => page - 1)}
          >
            <MdArrowBack />
          </button>
          <input
            type="number"
            step={1}
            disabled={loading}
            value={page}
            onChange={(e) => {
              setPage(e.target.value);
            }}
            className="p-2 max-w-10 text-center bg-blue-200"
          />
          <button disabled={loading} onClick={() => setPage(page + 1)}>
            <MdArrowForward />
          </button>
        </div>

        <div className="flex gap-2">
          <span>Limit: </span>
          <input
            type="number"
            value={limit}
            min={0}
            max={20}
            step={5}
            onChange={(e) => setLimit(e.target.value)}
          />
        </div>
      </section>

      {/* Videos */}
      <section>
        {videos ? (
          <div className="flex flex-wrap gap-4">
            {
            videos.map((video, index) => (
              <div
                key={index}
                className="max-w-[40%] max-h-[80%] rounded-md overflow-hidden"
              >
                <video
                  src={video?.url}
                  controls
                  className="object-cover w-full rounded-lg"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        ) 
        : 
        (
            <div>{
                error
                ?
                <div className="w-full p-8 flex flex-col items-center text-red-700 text-2xl">
                    <MdErrorOutline/>
                    <span>{error}</span>
                </div>
                :
                <Spinner color="purple" className="w-20 h-20"/>

            }</div>
        )}
      </section>
    </div>
  );
}

export default VideoGallery;
