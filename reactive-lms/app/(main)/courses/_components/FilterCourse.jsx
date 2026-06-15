'use client'
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Checkbox } from "@/components/ui/checkbox";



const FilterCourse = ({CATEGORY_OPTIONS,filter,PRICE_OPTIONS,applyArrayFilter}) => {
    return (
        <div className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl border bg-white p-6 shadow-sm">
            <Accordion defaultValue={["categories"]} type="multiple">
              {/* Categories filter */}
              <AccordionItem value="categories">
                <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">Categories</span>
                </AccordionTrigger>

                <AccordionContent className="pt-6 animate-none">
                  <ul className="space-y-4">
                    {CATEGORY_OPTIONS.map((option, optionIdx) => (
                      <li key={option.value} className="flex items-center">
                        <Checkbox
                          type="checkbox"
                          id={`category-${optionIdx}`}
                          onCheckedChange={() => {
                            applyArrayFilter({
                              type: "categories",
                              value: option.value,
                            });
                          }}
                          checked={filter.categories.includes(option.value)}
                        />
                        <label
                          htmlFor={`category-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600 cursor-pointer"
                        >
                          {option.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              {/* Price filter */}
              <AccordionItem value="price">
                <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">Price</span>
                </AccordionTrigger>

                <AccordionContent className="pt-6 animate-none">
                  <ul className="space-y-4">
                    {PRICE_OPTIONS.map((option, optionIdx) => (
                      <li key={option.value} className="flex items-center">
                        <Checkbox
                          type="checkbox"
                          id={`price-${optionIdx}`}
                          onCheckedChange={() => {
                            applyArrayFilter({
                              type: "price",
                              value: option.value,
                            });
                          }}
                          checked={filter.price.includes(option.value)}
                        />
                        <label
                          htmlFor={`price-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600 cursor-pointer"
                        >
                          {option.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            </div>
          </div>
    );
};

export default FilterCourse;