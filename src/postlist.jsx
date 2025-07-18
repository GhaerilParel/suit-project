import React, { useEffect, useState } from "react";
import postsData from "../data/posts.json";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SolidDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-gray-500"
  >
    <path d="M7 10l5 5 5-5z" />
  </svg>
);

const PostList = () => {
  const [sortOrder, setSortOrder] = useState("newest");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(localStorage.getItem("currentPage")) || 1;
  });
  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    const sorted = [...postsData].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    setSortedPosts(sorted);
  }, [sortOrder]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const indexOfLastPost = currentPage * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / perPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="py-10 px-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 text-sm text-gray-700">
        <div className="mb-4 md:mb-0">
          Showing {indexOfFirstPost + 1} - {Math.min(indexOfLastPost, sortedPosts.length)} of {sortedPosts.length}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <label htmlFor="perPage" className="mr-2">Show per page:</label>
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
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <SolidDownIcon />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="sortBy" className="mr-2">Sort by:</label>
            <select
              id="sortBy"
              className="appearance-none border pl-3 pr-16 py-[6px] rounded-full text-sm bg-white text-gray-700 focus:outline-none text-left"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <SolidDownIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <img
              src={post.thumbnail}
              alt={post.title}
              loading="lazy"
              className="w-full h-48 object-cover object-center"
            />
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-1">{post.date}</p>
              <h3
                className="text-sm font-semibold h-[4.5em] overflow-hidden text-ellipsis line-clamp-3"
                style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
              >
                {post.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

        {/* Pagination */}
      <div className="flex flex-col items-center gap-2 mt-8">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            className="p-2 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} />
          </button>

          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num + 1}
              onClick={() => handlePageChange(num + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === num + 1 ? "bg-orange-500 text-white" : "bg-gray-100"
              }`}
            >
              {num + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            className="p-2 disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
      </div>
    </section>
  );
};

export default PostList;