import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="myContainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500">&lt;</span>
          <span>Key</span>
          <span className="text-green-500">Vault/&gt;</span>
        </div>
        <a href="https://github.com/juniorcoder02/KeyVault">
          <button className="text-white bg-green-700 px-1 py-0.5 rounded-full flex justify-between items-center ring-1 ring-white">
            <img
              className="invert w-10 p-1"
              src="/Icons/github.png"
              alt="Github img"
            />
            <span className="font-bold px-2">GitHub</span>
          </button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
