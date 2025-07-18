import React from 'react';
import './Banner.css'; 

const Banner = ({ imageUrl }) => {
  return (
    <section className="relative h-[300px] overflow-hidden">
  <div
    className="parallax-bg"
    style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${imageUrl})`,
    }}
  ></div>


      {/* Overlay Text */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
        <h1 className="text-[32px] font-semibold">Ideas</h1>
        <p className="text-sm font-normal tracking-normal">Where all our great things begin</p>
      </div>

      {/* Shape bawah miring */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-white clip-slant z-20"></div>
    </section>
  );
};

export default Banner;
