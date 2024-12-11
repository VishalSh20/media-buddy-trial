import { useEffect, useState } from "react";
import { api } from "../../../axios.config";
import { MdArrowBack, MdArrowForward, MdErrorOutline } from "react-icons/md";
import PropTypes from "prop-types";
import Loading from "../Loader";

ImageGallery.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

function ImageGallery({ page, setPage }) {
  const [limit, setLimit] = useState(10);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const requestURL = `${import.meta.env.VITE_BACKEND_URL}/images?page=${page}&limit=${limit}`;
    api
      .get(requestURL)
      .then((response) => {
        setImages(response.data?.contents);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, limit]);

  return (
    <div className="w-full flex flex-col gap-6 p-4 bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg shadow-neon">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center text-white neon-text">
        Image Gallery
      </h1>

      {/* Pagination */}
      <section
        className={`flex flex-wrap items-center justify-between rounded-lg p-4 bg-gradient-to-r from-purple-900 to-indigo-900 ${
          loading ? "hidden" : ""
        }`}
      >
        <div className={`flex items-center gap-2`}>
          <button
            disabled={loading || page === 1}
            onClick={() => setPage((page) => page - 1)}
            className={`p-3 rounded-md text-white transition-transform ${
              loading || page === 1
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-blue-500 hover:scale-110 hover:bg-blue-600"
            }`}
          >
            <MdArrowBack size={20} />
          </button>
          <input
            type="number"
            step={1}
            disabled={loading}
            value={page}
            onChange={(e) => {
              setPage(Number(e.target.value));
            }}
            className="w-16 p-2 text-center text-white bg-transparent border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            disabled={loading}
            onClick={() => setPage(page + 1)}
            className="p-3 rounded-md text-white transition-transform bg-blue-500 hover:scale-110 hover:bg-blue-600"
          >
            <MdArrowForward size={20} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-white">Limit:</span>
          <input
            type="number"
            value={limit}
            min={5}
            max={20}
            step={5}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="w-16 p-2 text-center text-white bg-transparent border border-pink-500 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </section>

      {/* Images */}
      <section>
        {images.length ? (
          <div className="flex flex-wrap justify-center gap-6">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative max-w-[300px] max-h-[300px] rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={img?.url}
                  alt={`image ${index + 1}`}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center text-white text-xl">
            {error ? (
              <div className="flex flex-col items-center gap-4 text-red-500">
                <MdErrorOutline size={50} />
                <span>{error}</span>
              </div>
            ) : (
              <Loading />
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default ImageGallery;
