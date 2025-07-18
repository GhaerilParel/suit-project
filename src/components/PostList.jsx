import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SolidDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-gray-500">
    <path d="M7 10l5 5 5-5z" />
  </svg>
);

const PostList = () => {
  const [ideas, setIdeas] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(() => parseInt(localStorage.getItem("currentPage")) || 1);
  const [sortOrder, setSortOrder] = useState("-published_at");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  useEffect(() => {
    const fetchIdeas = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/suitapi/ideas", {
          params: {
            "page[number]": currentPage,
            "page[size]": perPage,
            append: ["small_image", "medium_image"],
            sort: sortOrder,
          },
        });

        setIdeas(response.data.data);
        setTotalItems(response.data.meta.total);

        console.log("✅ Fetched ideas:", response.data.data);
      } catch (error) {
        console.error("❌ Error fetching ideas:", error);
        if (error.response) {
          console.error("🔻 API Response Error:", error.response.data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [currentPage, perPage, sortOrder]);

  const totalPages = Math.ceil(totalItems / perPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="py-10 px-4 max-w-6xl mx-auto">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 text-sm text-gray-700">
        <div className="mb-4 md:mb-0">
          Showing {(currentPage - 1) * perPage + 1} - {Math.min(currentPage * perPage, totalItems)} of {totalItems}
        </div>

        <div className="flex items-center space-x-4">
          {/* Items per page */}
          <div className="relative">
            <label htmlFor="perPage" className="mr-2">
              Show per page:
            </label>
            <select
              id="perPage"
              className="appearance-none border pl-3 pr-16 py-[6px] rounded-full text-sm bg-white text-gray-700 focus:outline-none text-left"
              value={perPage}
              onChange={(e) => {
                setPerPage(parseInt(e.target.value));
                setCurrentPage(1);
              }}
            >
              {[10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <SolidDownIcon />
            </div>
          </div>

          {/* Sort Order */}
          <div className="relative">
            <label htmlFor="sortBy" className="mr-2">
              Sort by:
            </label>
            <select
              id="sortBy"
              className="appearance-none border pl-3 pr-16 py-[6px] rounded-full text-sm bg-white text-gray-700 focus:outline-none text-left"
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="-published_at">Newest</option>
              <option value="published_at">Oldest</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <SolidDownIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Loading / No Data / Data */}
      {loading ? (
        <div className="text-center py-10">Loading ideas...</div>
      ) : ideas.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No ideas found.</div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {ideas.map((idea) => {
            // Helper untuk cek apakah url sudah absolut
            const getImageUrl = (imgArr) => {
              const url = imgArr?.[0]?.url;
              if (!url) return null;
              if (url.startsWith("http://") || url.startsWith("https://")) return url;
              return `https://suitmedia-backend.suitdev.com${url}`;
            };

            const imageUrl =
              getImageUrl(idea.small_image) ||
              getImageUrl(idea.medium_image) ||
              "https://via.placeholder.com/400x300";

            console.log("🖼️ Image for:", idea.title);
            console.log("📦 small_image:", idea.small_image);
            console.log("🔗 imageUrl used:", imageUrl);

            return (
              <div key={idea.id} className="bg-white shadow rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt={idea.title}
                  loading="lazy"
                  className="w-full h-48 object-cover object-center"
                  onError={(e) => {
                    e.target.src = "/placeholder.jpg";
                  }}
                />
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1">
                    {new Date(idea.published_at).toLocaleDateString()}
                  </p>
                  <h3
                    className="text-sm font-semibold h-[4.5em] overflow-hidden text-ellipsis line-clamp-3"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {idea.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center space-x-1 text-sm">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="px-2 py-1 text-gray-600 disabled:text-gray-300"
          >
            «
          </button>
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 text-gray-600 disabled:text-gray-300"
          >
            ‹
          </button>

          {/* Windowed Pagination */}
          {(() => {
            let start = Math.max(
              1,
              Math.min(
                currentPage - 2,
                totalPages - 4
              )
            );
            let end = Math.min(totalPages, start + 4);
            let pages = [];
            for (let i = start; i <= end; i++) {
              pages.push(i);
            }
            return pages.map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`w-8 h-8 rounded-full ${
                  currentPage === num
                    ? "bg-orange-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ));
          })()}

          <button
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-gray-600 disabled:text-gray-300"
          >
            ›
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-gray-600 disabled:text-gray-300"
          >
            »
          </button>
        </div>
      </div>
    </section>
  );
};

export default PostList;
