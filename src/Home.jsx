import React from 'react';

const articles = [
  {
    id: 1,
    date: '5 SEPTEMBER 2022',
    title: 'Kenali Tingkatan Influencers berdasarkan Jumlah Followers',
    image: 'https://picsum.photos/seed/idea1/300/200'
  },
  {
    id: 2,
    date: '5 SEPTEMBER 2022',
    title: 'Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer ...',
    image: 'https://picsum.photos/seed/idea2/300/200'
  },
];

// Icon panah solid segitiga bawah
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

const Home = () => {
  const dummyArticles = Array.from({ length: 8 }, (_, index) => articles[index % articles.length]);

  return (
    <div className="font-sans bg-white min-h-screen">
      {/* Navbar */}
      <header className="bg-[#F26522] py-5 text-white flex justify-between items-center px-10">
        <div>
          <img src="img/PT.Kreasi_online_indonesia_logo.png" alt="Logo Kreasi Online" className="h-10 invert brightness-0" />
        </div>
        <nav className="space-x-6 hidden md:block text-sm">
          <a href="#" className="hover:underline hover:underline-offset-8">Work</a>
          <a href="#" className="hover:underline hover:underline-offset-8">About</a>
          <a href="#" className="hover:underline hover:underline-offset-8">Services</a>
          <a href="#" className="underline underline-offset-8 font-semibold">Ideas</a>
          <a href="#" className="hover:underline hover:underline-offset-8">Careers</a>
          <a href="#" className="hover:underline hover:underline-offset-8">Contact</a>
        </nav>
      </header>

      {/* Banner */}
      <section className="relative h-[300px] bg-gray-800 text-white flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://picsum.photos/seed/bgideas/1200/300')" }}></div>
        <div className="relative text-center pt-8">
          <h1 className="text-[32px] font-semibold">Ideas</h1>
          <p className="text-sm font-normal tracking-normal">Where all our great things begin</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[1200px] mx-auto px-4 py-12">
        {/* Top Control */}
        <div className="flex justify-between items-center mb-8 text-sm text-gray-700">
          <span>Showing 1 - 10 of 100</span>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <label htmlFor="perPage" className="mr-2">Show per page:</label>
              <select id="perPage" className="appearance-none border pl-3 pr-16 py-[6px] rounded-full text-sm bg-white text-gray-700 focus:outline-none text-left">
                <option>10</option>
                <option>20</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <SolidDownIcon />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="sortBy" className="mr-2">Sort by:</label>
              <select id="sortBy" className="appearance-none border pl-3 pr-16 py-[6px] rounded-full text-sm bg-white text-gray-700 focus:outline-none text-left">
                <option>Newest</option>
                <option>Oldest</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <SolidDownIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dummyArticles.map((article, index) => (
            <div key={index} className="rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-lg transition duration-300 bg-white">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-[160px] object-cover"
              />
              <div className="p-4">
                <p className="text-[11px] text-gray-500 mb-1">{article.date}</p>
                <h2 className="text-[13px] font-normal leading-snug text-gray-800">
                  {article.title}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-10 space-x-2 text-sm">
          <button className="px-2 py-1 border rounded hover:bg-gray-100">&laquo;</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">1</button>
          <button className="px-3 py-1 border bg-[#F26522] text-white rounded">2</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">3</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">4</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">5</button>
          <button className="px-2 py-1 border rounded hover:bg-gray-100">&raquo;</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
