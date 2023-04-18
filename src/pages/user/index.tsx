import { FormEvent, ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavbarAdmin from "@/components/ui/NavbarAdmin";
import { Fetch, Poster } from "@/utils";
import { byteaToSrc } from "@/components/ui/Hero";

export default function UserPage(): ReactElement {
  const { push } = useRouter();

  const [sdata, setSData] = useState([] as Array<Poster>);
  const [sdataB, setSDataB] = useState([] as Array<Poster>);
  const [searchW, setSearchW] = useState("" as string);
  const [selectedOp, setSelectedOp] = useState("" as keyof Poster);
  const [fMv, setFMv] = useState([] as Array<string>);

  const getTrailers = async () => {
    const movies = await (await Fetch("dummy", "GET")).json();

    setSData(movies);
    setSDataB(movies);
  };

  async function getLocalMovies() {
    const movi = localStorage.getItem("IsUserLikedMovies");
    if (movi === null) {
      const { mov } = await (await Fetch(`userFav?userId=${10}`, "GET")).json();
      const allMov = mov.map((x: { movieId: string }) => x.movieId);

      setFMv(allMov.split(","));
      localStorage.setItem("IsUserLikedMovies", allMov);
    } else {
      setFMv(movi.split(","));
    }
  }

  async function setFav(id: number) {
    setFMv([...fMv, id.toString()]);
  }

  async function quitFav(id: number) {
    setFMv(fMv.filter((x) => x !== id.toString()));
  }

  function search(e: FormEvent) {
    e.preventDefault();
    const f = sdataB.filter((x) => x[selectedOp].toString().toLocaleLowerCase().includes(searchW.toLocaleLowerCase()));
    setSData(f);
  }

  useEffect(() => {
    const isAdmin = localStorage.getItem("IsUser");
    const { isValid } = JSON.parse(isAdmin ?? "");

    if (!isValid) push("/");
    else getLocalMovies();

    getTrailers();
  }, []);

  return (
    <>
      <NavbarAdmin
        logout={() => {
          localStorage.removeItem("IsUser");
          localStorage.removeItem("IsUserLikedMovies");
          push("/");
        }}
      />
      <div className="max-w-2xl mx-auto pt-[30px]">
        <form className="flex items-center" onSubmit={search}>
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative flex w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>

            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[50%] pl-10 p-2.5  "
              placeholder="Search"
              onChange={({ target: { value } }) => setSearchW(value)}
            />
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] pl-10 p-2.5  "
              onChange={({ target: { value } }) => setSelectedOp(value as keyof Poster)}
            >
              {["Titulo","Director", "Genero", "Año"].map((x) => (
                <option value={x} key={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </form>
      </div>
      <div className="container px-4 mx-auto my-12 md:px-12 bg-slate-500">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {sdata.map((x, i) => {
            const isOnLike = fMv.includes(x.Id.toString());
            //   const isOnLike = false;

            return (
              <div
                className="w-full px-1 my-1 border border-white md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
                key={i}
              >
                <article className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    alt="Placeholder"
                    className="block w-full h-auto text-white"
                    src={byteaToSrc(x.Poster)}
                  />

                  <header className="flex items-center justify-between p-2 leading-tight md:p-4">
                    <h1 className="text-lg">
                      <h2 className="text-white no-underline hover:underline">
                        {x.Titulo}
                      </h2>
                    </h1>
                    <p className="text-sm text-white">{x.Año.toString()}</p>
                  </header>

                  <footer className="flex items-center justify-between p-2 leading-none md:p-4">
                    <p className="ml-2 text-sm text-white">Director : {x.Director}</p>
                    <br />
                    <p className="ml-2 text-sm text-white">Genero : {x.Genero}</p>
                    <div className="text-sm text-white">
                      {!isOnLike ? (
                        <div
                          onClick={(_) => setFav(x.Id)}
                          className="flex flex-row items-center justify-center px-3 py-1 space-x-2 text-center text-white bg-green-500 shadow-lg cursor-pointer shadow- shadow-green-600 rounded-xl"
                        >
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 1024 1024"
                            className="text-xl"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0 1 42.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z"></path>
                          </svg>
                        </div>
                      ) : (
                        <div
                          onClick={() => quitFav(x.Id)}
                          className="flex flex-row items-center justify-center px-3 py-1 space-x-2 text-center text-white bg-red-500 shadow-lg cursor-pointer shadow- shadow-red-600 rounded-xl"
                        >
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 1024 1024"
                            className="text-xl"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M885.9 490.3c3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-51.6-30.7-98.1-78.3-118.4a66.1 66.1 0 0 0-26.5-5.4H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h129.3l85.8 310.8C372.9 889 418.9 924 470.9 924c29.7 0 57.4-11.8 77.9-33.4 20.5-21.5 31-49.7 29.5-79.4l-6-122.9h239.9c12.1 0 23.9-3.2 34.3-9.3 40.4-23.5 65.5-66.1 65.5-111 0-28.3-9.3-55.5-26.1-77.7zM184 456V172h81v284h-81zm627.2 160.4H496.8l9.6 198.4c.6 11.9-4.7 23.1-14.6 30.5-6.1 4.5-13.6 6.8-21.1 6.7a44.28 44.28 0 0 1-42.2-32.3L329 459.2V172h415.4a56.85 56.85 0 0 1 33.6 51.8c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0 1 19.6 43c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0 1 19.6 43c0 9.7-2.3 18.9-6.9 27.3l-14 25.5 21.9 19a56.76 56.76 0 0 1 19.6 43c0 19.1-11 37.5-28.8 48.4z"></path>
                          </svg>
                        </div>
                      )}
                    </div>
                  </footer>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
