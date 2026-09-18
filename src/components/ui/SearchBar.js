import { Search, X } from "lucide-react";
export const SearchBar = ({
  value,
  onChange,
  placeholder = "Search documents...",
  className = "",
  onClear,
  autoFocus = false
}) => {
  return <div className={`relative flex items-center w-full ${className}`}>
      <Search className="absolute left-3 w-4 h-4 text-neutral-400 pointer-events-none" />
      <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    autoFocus={autoFocus}
    className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-neutral-200 rounded-lg text-neutral-800 placeholder-neutral-400 shadow-2xs transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
  />
      {value && <button
    onClick={() => {
      onChange("");
      onClear?.();
    }}
    className="absolute right-2.5 p-1 rounded-md text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
    title="Clear search"
    aria-label="Clear search"
  >
          <X className="w-3.5 h-3.5" />
        </button>}
    </div>;
};
