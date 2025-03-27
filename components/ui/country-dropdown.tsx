"use client";
import React, { useState, useEffect, useCallback, forwardRef } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, CheckIcon } from "lucide-react";
import { countries } from "country-data-list";
import { cn } from "@/lib/utils";

export interface Country {
  alpha2: string;
  alpha3: string;
  name: string;
  countryCallingCodes: string[];
}

interface CountryDropdownProps {
  onChange?: (countryCode: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
}

const CountryDropdownComponent = (
  {
    onChange,
    defaultValue,
    disabled = false,
    placeholder = "Select country code",
  }: CountryDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined);

  useEffect(() => {
    if (defaultValue) {
      const initialCountry = countries.all.find((c) => c.alpha2 === defaultValue);
      if (initialCountry) {
        setSelectedCountry(initialCountry);
      }
    }
  }, [defaultValue]);

  const handleSelect = useCallback(
    (country: Country) => {
      setSelectedCountry(country);
      onChange?.(country.countryCallingCodes[0]);
      setOpen(false);
    },
    [onChange]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        ref={ref}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-lg border px-4 py-3 text-sm bg-white shadow-sm hover:shadow-md transition-all"
        )}
        disabled={disabled}
      >
        {selectedCountry ? (
          <div className="flex items-center gap-2">
            <span className="font-semibold">{selectedCountry.countryCallingCodes[0]}</span>
          </div>
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
        <ChevronDown size={18} className="text-gray-600" />
      </PopoverTrigger>
      <PopoverContent className="min-w-[250px] p-2 border-none rounded-lg shadow-lg bg-white">
        <Command>
          <CommandInput placeholder="Search country..." className="px-3 py-2 border rounded-lg focus:ring-2" />
          <CommandEmpty>No country found</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {countries.all.map((country,index) => (
                <CommandItem
                  key={index}
                  onSelect={() => handleSelect(country)}
                  className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  <span>{country.countryCallingCodes[0]}</span>
                  {selectedCountry?.alpha2 === country.alpha2 && (
                    <CheckIcon className="h-4 w-4 text-green-500" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

CountryDropdownComponent.displayName = "CountryDropdownComponent";
export const CountryDropdown = forwardRef(CountryDropdownComponent);
