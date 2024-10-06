import React from "react";
import SildeNav from "../components/SlideNav";




const Adminhome = () => {
    const fetchadminData = async () => {
    const initialData = await axios.get('http://localhost:3001/api/user/load-initial-data', {});
    }

  return (
    <nav className="flex w-screen bg-black  min-h-screen ">
      <SildeNav/>
    </nav>
  );
};

export default Adminhome;