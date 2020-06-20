import React from "react";
import Navbar from "./Navbar";

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1>Hello World</h1>
      </div>
    </>
  );
};

export default Home;
