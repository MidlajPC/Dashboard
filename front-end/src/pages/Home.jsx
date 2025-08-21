import React from "react";
import "../css/Bg.css";
import bg from "../assets/bg/bg.jpg";
import Header from "../components/Header";
import { CiLogout } from "react-icons/ci";
const Home = () => {
  return (
    <div
      className="min-h-screen min-w-screen flex flex-col "
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Header />
      <div className="flex flex-1 pb-2 font-bold text-white ">
        <div className="bg-black/10 w-[230px] mx-2 rounded-sm backdrop-blur-2xl flex flex-col justify-between  ">
          <div className="">hh</div>
          <div className=" h-[35px] flex gap-3 items-center p-5 pb-6 ">
            <CiLogout />
            <p className="">Logout</p>
          </div>
        </div>
        <div className="relative bg-black/10 flex-1 rounded-sm backdrop-blur-2xl mr-2 ">
          <div className="relative rounded-sm bg-[#F5F5F5] shadow-lg h-full papper-effct">
            
            <div className="h-[56px] border-b-2 border-black "><div className="triangle"></div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
