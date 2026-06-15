'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from 'react';


const SortCourse = ({SORT_OPTIONS}) => {
    return (
       <Select>
            <SelectTrigger className="w-[180px] border-none !border-b focus:ring-0 focus:ring-offset-0  overflow-hidden">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter</SelectLabel>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem
                    className="cursor-pointer"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
    );
};

export default SortCourse;