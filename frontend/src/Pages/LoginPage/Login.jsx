import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="h-full p-6 w-full bg-yellow-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100">
        <h1 className="text-4xl  font-bold text-center text-black text-color-yellow">
          Login
          <span className="text-yellow-300"> Client's chat</span>
        </h1>
        <form>
          <div>
            <label className="label p-2">
              <span className="text-base text-yellow-300 label-text font-bold">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base text-yellow-300 label-text font-bold">
                Password
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your password"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <a
            href="#"
            className="text-sm text-yellow-300 hover:underline hover:text-white mt-2 inline-block"
          >
            {"Don't"} have an account?
          </a>
          <div className="flex items-center justify-center m-2">
            <button className="btn btn-active btn-neutral items-center justify-center bg-black">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
