"use client";

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

   return (
      <Card className="gap-1 py-4 absolute top-16 right-4 z-10">
         <CardContent>
            <div className="flex flex-col gap-1 text-xs">
               <strong>year</strong>
               <Select value={filters.year} onValueChange={onYearChange}>
                  <SelectTrigger className="w-[180px]">
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

               <strong>countries</strong>
               {
                  configure.countries.toSorted().map((country: string) => (
                     <div className="flex items-center space-x-2" key={country}>
                        <Checkbox id={country}
                           checked={filters.countries.includes(country)}
                           onCheckedChange={() => onCountryChange(country)} />
                        <Label htmlFor={country}>
                           {country}
                        </Label>
                     </div>
                  ))
               }
            </div>
         </CardContent>
      </Card>
   );
}