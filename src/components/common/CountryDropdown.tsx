import React, { useState, useRef, useEffect, forwardRef } from "react";
import { CircleFlag } from "react-circle-flags";
import { countries } from "country-data-list";

// Country interface
interface Country {
  alpha2: string;
  alpha3: string;
  countryCallingCodes: string[];
  currencies: string[];
  emoji?: string;
  ioc: string;
  languages: string[];
  name: string;
  status: string;
}

// Dropdown props
interface CountryDropdownProps {
  value?: string;
  onChange?: (alpha2: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  name?: string;
}

const CountryDropdownComponent = (
  {
    value,
    onChange,
    onBlur,
    placeholder = "Select your country",
    error = false,
    disabled = false,
    name,
  }: CountryDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter countries
  const filteredCountries = countries.all
    .filter(
      (country: Country) =>
        country.name &&
        country.status !== "deleted" &&
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

  const selectedCountry = value
    ? countries.all.find((country: Country) => country.alpha2 === value)
    : undefined;

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

  const handleSelect = (country: Country) => {
    // Toggle selection: if clicking on already selected country, deselect it
    if (selectedCountry?.alpha2 === country.alpha2) {
      onChange?.("");
    } else {
      onChange?.(country.alpha2);
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
        className={`h-10 lg:h-13 font-medium text-sm lg:text-base leading-[100%] placeholder:text-neutral-300 px-3 lg:px-5 py-2 lg:py-4 rounded-xl border w-full shadow-form-input flex items-center justify-between gap-2 bg-transparent ${error ? "border-red-500" : "border-neutral-100"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${!selectedCountry ? "text-neutral-300" : "text-neutral-900"
          }`}
      >
        {selectedCountry ? (
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="inline-flex items-center justify-center w-5 h-5 shrink-0 overflow-hidden rounded-full">
              <CircleFlag
                countryCode={selectedCountry.alpha2.toLowerCase()}
                height={20}
              />
            </div>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {selectedCountry.name}
            </span>
          </div>
        ) : (
          <span>{placeholder}</span>
        )}
        <svg
          className={`w-4 h-4  shrink-0 transition-transform ${open ? "rotate-180 text-neutral-900" : "text-neutral-300"
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
              placeholder="Search country..."
              className="w-full px-3 py-2 text-sm border border-neutral-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="max-h-[200px] sm:max-h-[270px] overflow-y-auto">
            {filteredCountries.length > 0 ? (
              <div className="py-1">
                {filteredCountries.map((country: Country) => (
                  <button
                    key={country.alpha2}
                    type="button"
                    onClick={() => handleSelect(country)}
                    className="w-full flex items-center gap-3 px-3 lg:px-5 py-2.5 hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    <div className="inline-flex items-center justify-center w-5 h-5 shrink-0 overflow-hidden rounded-full">
                      <CircleFlag
                        countryCode={country.alpha2.toLowerCase()}
                        height={20}
                      />
                    </div>
                    <span className="grow text-left text-sm lg:text-base text-neutral-900 overflow-hidden text-ellipsis whitespace-nowrap">
                      {country.name}
                    </span>
                    {selectedCountry?.alpha2 === country.alpha2 && (
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
                No country found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

CountryDropdownComponent.displayName = "CountryDropdownComponent";

export const CountryDropdown = forwardRef(CountryDropdownComponent);
