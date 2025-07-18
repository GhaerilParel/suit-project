import React from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import PostList from './components/PostList';

const App = () => {
  return (
    <div className="font-sans bg-white min-h-screen">
      <Header />
      <main className="pt-20">
        <Banner imageUrl="https://picsum.photos/seed/bgideas/1200/300" />
        <PostList />
      </main>
    </div>
  );
};

export default App;
