import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 h-15.5 text-white flex flex-col justify-center items-center fixed w-full bottom-0">
      <div className="logo font-bold text-white text-2xl">
        <span className="text-green-500">&lt;</span>
        <span>Key</span>
        <span className="text-green-500">Vault/&gt;</span>
      </div>
      <div className="flex justify-center items-center">
        Created with
        <img className="w-7 mx-2" src="/Icons/heart.png" alt="heart image" />
        By <a href="https://github.com/juniorcoder02"><span className="font-bold mx-1 underline"> Adnan Qureshi</span></a>
      </div>
    </div>
  );
};

export default Footer;
