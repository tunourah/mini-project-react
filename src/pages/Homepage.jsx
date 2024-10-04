import React from 'react'
import Headers from '../components/Header'
import Sidebar from '../components/Sidebar';
const Homepage = () => {
  return (
 
     
    <div className="grid grid-rows-12 grid-cols-12  w-full h-screen ">
              <aside className="  col-span-1 row-span-12 h-full"><Sidebar/></aside>

      <header className="  col-span-11 row-span-1 w-full  "> <Headers></Headers></header>
      <main className="bg-red-500 col-span-11 row-span-11 w-full">Content</main>
    </div>
  );
};
 
 

export default Homepage