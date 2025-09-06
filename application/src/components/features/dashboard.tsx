"use client";

import { CountryItem, useDatabase } from "@/hooks/useDatabase";
import { Header } from "./header";
import { useEffect, useMemo, useState } from "react";
import { Filter } from "./filter";
import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("./worldmap"), {
   ssr: false,
});

export const Dashboard = () => {
   // hooks
   const $db = useDatabase();

   // states
   const [year, setYear] = useState<string>('');
   const [countries, setCountries] = useState<string[]>([]);

   // listener to set initial year once database is loaded
   useEffect(() => {
      if ($db.initialized) {
         setYear($db.getYears()[0] ?? '');
      }
   }, [$db.initialized]);

   useEffect(() => {
      setCountries(countryData.map(f => f.name));
   }, [year]);

   const countryData = useMemo(() => {
      if (!$db.initialized) return [];
      return $db.countryList()
         .map(country => ({
            ...country,
            mortality: $db.getFor(country.name, year, "All")
         }
         )).filter(country => country.mortality >= 0)
   }, [$db.initialized, year]);

   function handleChange(what: string, values: string | string[]) {
      if (what === "year" && typeof values === "string") {
         setYear(values);
      } else if (what === "countries" && Array.isArray(values)) {
         // handle country filter change if needed
         setCountries(values);
      }
   };

   const filteredCountryData = useMemo(() => {
      return countryData.filter(country => countries.includes(country.name));
   }, [countryData, countries]);

   return (
      <>
         <Header />
         <WorldMap data={filteredCountryData} />
         <Filter configure={{ years: $db.getYears(), countries: countryData.map((f: CountryItem) => f.name) }}
            filters={{ year, countries }}
            onChange={handleChange} />
      </>
   );
};