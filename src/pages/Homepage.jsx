import React from 'react'

const Homepage = () => {
  return (
 
     
    <div className="grid grid-rows-12 grid-cols-12  w-full h-screen">
      <header className="bg-blue-500 col-span-11 row-span-1 w-full">Header</header>
      <aside className="bg-green-500 col-span-1 row-span-12 h-full">Sidebar</aside>
      <main className="bg-red-500 col-span-11 row-span-11 w-full">Content</main>
    </div>
  );
};
 
 

export default Homepage