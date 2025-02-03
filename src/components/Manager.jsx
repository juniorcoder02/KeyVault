import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef(null);
  const passwordRef = useRef(null);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      try {
        setPasswordArray(JSON.parse(passwords));
      } catch (error) {
        console.error("Error parsing passwords from localStorage:", error);
        setPasswordArray([]); // Fallback to empty array
      }
    } else {
      // Initialize localStorage with an empty array to prevent future errors
      localStorage.setItem("passwords", JSON.stringify([]));
      setPasswordArray([]);
    }
  }, []);

  const copyText = (text) => {
    toast("Copied to clip board", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("Icons/hide.png")) {
      ref.current.src = "Icons/eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "Icons/hide.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {
    if (!form.site || !form.username || !form.password) {
      toast.error("Please fill all the fields", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    } else {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log(...passwordArray, form);
      setForm({ site: "", username: "", password: "" });
      toast.success("password saved !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    console.log(" editing password", id);
    setForm(passwordArray.filter((item) => item.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id != id));
  };
  const deletePassword = (id) => {
    console.log("deleting password", id);
    let c = confirm("Are you sure you want to delete this");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id != id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id != id))
      );
    }
    toast.error("password deleted!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="p-2 md :myContainer md:p-0">
        <h1 className=" text-4xl font-bold  text-center">
          <span className=" text-green-700">&lt;</span>
          <span>Key</span>
          <span className=" text-green-700">Vault/&gt;</span>
        </h1>
        <p className=" text-green-900  text-lg  text-center">
          Protecting What Matters Most
        </p>

        <div className=" text-black flex flex-col p-4 gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website url"
            type=" text"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            name="site"
            id="site"
          />
          <div className="flex w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              type=" text"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                type="password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                name="password"
                id="password"
              />

              <span
                className="absolute right-[3px] top-[3px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1 w-8"
                  src="Icons/eye.png"
                  alt="eye icon"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center gap-2 items-center bg-green-400 hover:bg-green-300 rounded-full px-6 border border-green-900 py-2 w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/exymduqj.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#121331,secondary:#109121"
            ></lord-icon>
            Save Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="text-2xl py-4 font-bold">Your Keys</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md">
              <thead className="bg-green-800  text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center py-2 border-b-white">
                      <div className="flex justify-center items-center">
                        <a href={item.site} target="blank">
                          {item.site}
                        </a>
                        <div
                          className="lordIconCopy size-7 cursor-pointer"
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/prjooket.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className=" text-center py-2 border-b-white">
                      <div className="flex justify-center items-center">
                        {item.username}
                        <div
                          className="lordIconCopy size-7 cursor-pointer"
                          onClick={() => {
                            copyText(item.username);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/prjooket.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className=" text-center py-2 border-b-white">
                      <div className="flex justify-center items-center">
                        {"*".repeat(item.password.length)}
                        <div
                          className="lordIconCopy size-7 cursor-pointer"
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/prjooket.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className=" text-center py-2 border-b-white">
                      <span
                        className="mx-1 size-7 cursor-pointer"
                        onClick={() => {
                          editPassword(item.id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/vuiggmtc.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                      <span
                        className="mx-1 size-7 cursor-pointer"
                        onClick={() => {
                          deletePassword(item.id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/wpyrrmcq.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
