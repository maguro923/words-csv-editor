"use client";

import Link from "next/link";
import { useSearchWord } from '@/hooks/search-word/hooks';
import { ChangeEvent, useState } from 'react';

export default function Header() {
        enum SearchType {
          Mean,
          Word,
        }
        const [searchType, setSearchType] = useState<SearchType>(SearchType.Word);
      
        const [query, setQuery] = useState<string>('');
        const [suggestions, setSuggestions] = useState<string[]>([]);
        const { searchByWord } = useSearchWord('/words.csv', 0);
        function onSearchWordInputted(e: ChangeEvent<HTMLInputElement>) {
          setQuery(e.target.value);
          searchByWord(e.target.value).then((wordDistances) =>
            setSuggestions(wordDistances.map((v:any) => v.word)),
          );
        }
      
    return (
        <div className="bg-primary-content grid grid-cols-12 col-span-12">
            <div className='col-span-12 sm:col-span-4 sm:col-start-1 my-6'>
                <Link href='/' className='text-inherit no-underline'>
                    <div className=''>
                        <p className="text-center text-3xl">App Name</p>
                        <p className="text-center text-xl">for admins</p>
                    </div>
                </Link>
            </div>
      <div className='col-span-12 mx-auto mb-4 sm:col-span-8 sm:mx-0 sm:my-auto sm:ml-auto sm:mr-4'>
        <form method='GET' className='flex items-end'>
          <select
            className='select select-bordered my-auto w-fit'
            onChange={(evt) => {
              switch (evt.target.value) {
                case 'mean':
                  setSearchType(SearchType.Mean);
                  break;
                case 'word':
                  setSearchType(SearchType.Word);
                  break;
              }
            }}
            value={searchType == SearchType.Mean ? 'mean' : 'word'}
          >
            <option value='word'>word</option>
            <option value='mean'>mean</option>
          </select>

          <div className='my-auto'>
            <label className='input input-bordered ml-auto flex items-center gap-2'>
              <input
                type='text'
                className='w-full grow'
                placeholder='Search'
                value={query}
                onChange={onSearchWordInputted}
              />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='currentColor'
                className='size-4 opacity-70'
              >
                <path
                  fillRule='evenodd'
                  d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
                  clipRule='evenodd'
                />
              </svg>
            </label>
            <div className='table absolute w-full bg-primary-content'>
              {suggestions.slice(0, 5).map((w) => (
                <button
                  key={w}
                  className='ml-4 block py-2'
                  type='button'
                  onClick={() => setQuery(w)}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
        </div>
    );
}