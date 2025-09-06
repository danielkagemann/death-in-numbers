"use client";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Props = {
   configure: { years: string[]; countries: string[] };
   filters: { year: string; countries: string[] };
   onChange: (what: string, values: string | string[]) => void;
};

export const Filter = ({ configure, filters, onChange }: Props) => {
   const onYearChange = (value: string) => {
      onChange("year", value);
   };

   const onCountryChange = (value: string) => {
      const newCountries = [...filters.countries];
      if (filters.countries.includes(value)) {
         const index = newCountries.indexOf(value);
         if (index > -1) {
            newCountries.splice(index, 1);
         }
      } else {
         newCountries.push(value);
      }
      onChange("countries", newCountries);
   };

   const onSelectAll = (all: boolean) => () => {
      if (all) {
         onChange("countries", [...configure.countries]);
      } else {
         onChange("countries", []);
      }
   };

   return (
      <Card className="gap-1 py-4 absolute top-16 bottom-4 right-4 z-10 w-60">
         <CardContent className="overflow-auto">
            <div className="flex flex-col gap-1 text-xs">
               <strong>year</strong>
               <Select value={filters.year} onValueChange={onYearChange}>
                  <SelectTrigger className="w-full">
                     <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                     {
                        configure.years.map((value: string) => (
                           <SelectItem key={value} value={value}>{value}</SelectItem>
                        ))
                     }
                  </SelectContent>
               </Select>

               <div className="my-2 -ml-6 bg-gray-300 h-[1px] w-[calc(100%+4rem)]" />

               <strong>countries</strong>
               <div className="flex gap-1 justify-between">
                  <Button variant="outline" size="sm" className="cursor-pointer" onClick={onSelectAll(true)}>select all</Button>
                  <Button variant="outline" size="sm" className="cursor-pointer" onClick={onSelectAll(false)}>select none</Button>
               </div>
               {
                  configure.countries.toSorted().map((country: string) => (
                     <div className="flex items-center space-x-2" key={country}>
                        <Checkbox id={country}
                           className="cursor-pointer"
                           checked={filters.countries.includes(country)}
                           onCheckedChange={() => onCountryChange(country)} />
                        <Label htmlFor={country}
                           className="cursor-pointer w-full">
                           {country}
                        </Label>
                     </div>
                  ))
               }
            </div>
         </CardContent>
      </Card >
   );
}