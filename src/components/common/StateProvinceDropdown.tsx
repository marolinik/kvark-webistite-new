import React, { useState, useRef, useEffect, forwardRef } from "react";
import { stateProvinceData } from "@/utils/stateProvinceData";

// Dropdown props
interface StateProvinceDropdownProps {
  countryCode?: string;
  value?: string;
  onChange?: (state: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  name?: string;
}

const StateProvinceDropdownComponent = (
  {
    countryCode,
    value,
    onChange,
    onBlur,
    placeholder = "Select state/province",
    error = false,
    disabled = false,
    name,
  }: StateProvinceDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const states = countryCode ? stateProvinceData[countryCode] || [] : [];

  // Filter states
  const filteredStates = states.filter((state) =>
    state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearchQuery("");
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleSelect = (state: string) => {
    // Toggle selection: if clicking on already selected state, deselect it
    if (value === state) {
      onChange?.("");
    } else {
      onChange?.(state);
    }
    setOpen(false);
    setSearchQuery("");
    onBlur?.();
  };

  const handleToggle = () => {
    if (!disabled) {
      setOpen(!open);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        ref={ref}
        type="button"
        name={name}
        onClick={handleToggle}
        disabled={disabled}
        style={{ WebkitAppearance: "none", MozAppearance: "none" }}
        className={`h-10 lg:h-13 font-medium text-sm lg:text-base leading-[100%] placeholder:text-neutral-300 px-3 lg:px-5 py-2 lg:py-4 rounded-xl border w-full shadow-form-input flex items-center justify-between gap-2 bg-transparent ${
          error ? "border-red-500" : "border-neutral-100"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${
          !value ? "text-neutral-300" : "text-neutral-900"
        }`}
      >
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
          {value || placeholder}
        </span>
        <svg
          className={`w-4 h-4 shrink-0 transition-transform ${
            open ? "rotate-180 text-neutral-900" : "text-neutral-300"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-2 bg-neutral-0 border border-neutral-100 rounded-xl shadow-lg overflow-hidden">
          <div className="sticky top-0 z-10 bg-neutral-0 border-b border-neutral-100 p-3">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search state/province..."
              className="w-full px-3 py-2 text-sm border border-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="max-h-[200px] sm:max-h-[270px] overflow-y-auto">
            {filteredStates.length > 0 ? (
              <div className="py-1">
                {filteredStates.map((state) => (
                  <button
                    key={state}
                    type="button"
                    onClick={() => handleSelect(state)}
                    className="w-full flex items-center gap-3 px-3 lg:px-5 py-2.5 hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    <span className="grow text-left text-sm lg:text-base text-neutral-900 overflow-hidden text-ellipsis whitespace-nowrap">
                      {state}
                    </span>
                    {value === state && (
                      <svg
                        className="w-4 h-4 text-primary-500 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-3 lg:px-5 py-4 text-center text-sm text-neutral-300">
                No state/province found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

StateProvinceDropdownComponent.displayName = "StateProvinceDropdownComponent";

export const StateProvinceDropdown = forwardRef(StateProvinceDropdownComponent);
