import { SearchIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function Search({
  query,
  handleSearch,
  placeholder = "Search",
}: any) {
  const [value, setValue] = useState<any>("");
  const [text] = useDebounce(value, 200);
  useEffect(() => {
    handleSearch(text);
  }, [text]);

  return (
    <div className="p-1 md:p-2  ">
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <div className="py-1 md:py-1.5 relative w-full text-gray-400 focus-within:text-gray-600 space-x-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4">
          <SearchIcon className="h-4 w-4" aria-hidden="true" />
        </div>
        <input
          id="search-field1"
          className="block h-full w-96 rounded-md border-transparent py-1 md:py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
          placeholder={placeholder}
          type="text"
          // value={query}
          autoComplete="off"
          onChange={(e: any) => {
            setValue(e.target.value);
          }}
          name="search"
          defaultValue={query}
        />
      </div>
    </div>
  );
}
