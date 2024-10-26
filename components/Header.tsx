"use client";

import Link from "next/link";
import { useSearchWord } from "@/hooks/search-word/hooks";
import { ChangeEvent, useState } from "react";

export default function Header() {
  enum SearchType {
    Mean,
    Word,
  }
  const [searchType, setSearchType] = useState<SearchType>(SearchType.Word);

  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { searchByWord } = useSearchWord("/words.csv", 0);

  const [focus, setFocus] = useState<boolean>(false);

  function onSearchWordInputted(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    searchByWord(e.target.value).then((wordDistances) =>
      setSuggestions(wordDistances.map((v) => v.word)),
    );
  }

  return (
    <div className="bg-primary-content grid grid-cols-12 col-span-12">
      <div className="col-span-12 sm:col-span-4 sm:col-start-1 my-6">
        <Link href="/" className="text-inherit no-underline">
          <div>
            <p className="text-center text-3xl">App Name</p>
            <p className="text-center text-xl">for admins</p>
          </div>
        </Link>
      </div>
      <div className="col-span-12 mx-auto mb-4 sm:col-span-8 sm:mx-0 sm:my-auto sm:ml-auto sm:mr-4">
        <form method="GET" className="flex items-end">
          <select
            className="select select-bordered my-auto w-fit"
            onChange={(evt) => {
              switch (evt.target.value) {
                case "mean":
                  setSearchType(SearchType.Mean);
                  break;
                case "word":
                  setSearchType(SearchType.Word);
                  break;
              }
            }}
            value={searchType == SearchType.Mean ? "mean" : "word"}
          >
            <option value="word">word</option>
            <option value="mean">mean</option>
          </select>

          <div className="my-auto relative">
            <label
              className="input input-bordered ml-auto flex items-center gap-2 w-full"
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            >
              <input
                type="text"
                className="w-full grow"
                placeholder="Search"
                value={query}
                onChange={onSearchWordInputted}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            {query !== "" && focus ? (
              <div className="absolute top-full left-0 w-full bg-white rounded-lg shadow-md">
                {suggestions.slice(0, 5).map((w, index) => (
                  <button
                    key={w + index}
                    className="border-b last:border-none first:rounded-t-lg last:rounded-b-lg opacity-70 block w-full py-2 px-4 text-left hover:bg-gray-100"
                    type="button"
                    onClick={() => setQuery(w)}
                  >
                    {w}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
