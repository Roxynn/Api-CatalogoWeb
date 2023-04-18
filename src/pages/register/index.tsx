import { Fetch } from "@/utils";
import { FormEvent, ReactElement, useState } from "react";

export default function RegisterPage(): ReactElement {
  const [us, setUs] = useState({} as { username: string; password: string });

  async function doSmrh(e: FormEvent) {
    e.preventDefault();
    const dd = await (await Fetch("", "POST", JSON.stringify(us))).json();
    console.log(dd);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col max-w-md px-4 py-8 bg-white shadow-md sm:px-6 md:px-8 lg:px-10 rounded-3xl w-50">
        <div className="self-center text-xl font-medium text-gray-800 sm:text-3xl">
          Join us Now
        </div>
        <div className="self-center mt-4 text-xl text-gray-800 sm:text-sm">
          Enter your credentials to get access account
        </div>

        <div className="mt-10">
          <form onSubmit={doSmrh}>
            <div className="flex flex-col mb-5">
              <label htmlFor="email" className="mb-1 text-xs tracking-wide text-gray-600">
                Nombre:
              </label>
              <div className="relative">
                <div className="absolute top-0 left-0 inline-flex items-center justify-center w-10 h-full text-gray-400 ">
                  <i className="text-blue-500 fas fa-at"></i>
                </div>

                <input
                  type="text"
                  name="username"
                  value={us.username}
                  onChange={({ target: { value } }) => setUs({ ...us, username: value })}
                  className="w-full py-2 pl-10 pr-4 text-sm placeholder-gray-500 border border-gray-400 rounded-2xl focus:outline-none focus:border-blue-400"
                  placeholder="Enter your username"
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="password"
                className="mb-1 text-xs tracking-wide text-gray-600 sm:text-sm"
              >
                Password:
              </label>
              <div className="relative">
                <div className="absolute top-0 left-0 inline-flex items-center justify-center w-10 h-full text-gray-400 ">
                  <a>
                    <i className="text-blue-500 fas fa-lock"></i>
                  </a>
                </div>

                <input
                  id="password"
                  type="password"
                  name="password"
                  className="w-full py-2 pl-10 pr-4 text-sm placeholder-gray-500 border border-gray-400 rounded-2xl focus:outline-none focus:border-blue-400"
                  placeholder="Enter your password"
                  value={us.password}
                  onChange={({ target: { value } }) => setUs({ ...us, password: value })}
                />
              </div>
            </div>

            <div className="flex w-full">
              <button
                type="submit"
                className="flex items-center justify-center w-full py-2 mt-2 text-sm text-white transition duration-150 ease-in bg-blue-500 focus:outline-none sm:text-base hover:bg-blue-600 rounded-2xl"
              >
                <span className="mr-2 uppercase">Sign Up</span>
                <span>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex items-center justify-center mt-6">
        <a
          href="#"
          target="_blank"
          className="inline-flex items-center text-xs font-medium text-center text-gray-700 "
        >
          <span className="ml-2">
            You have an account?
            <a href="#" className="ml-2 text-xs font-semibold text-blue-500">
              Login here
            </a>
          </span>
        </a>
      </div>
    </div>
  );
}
