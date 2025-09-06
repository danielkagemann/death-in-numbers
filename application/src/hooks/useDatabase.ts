import { useEffect, useState } from "react";

type Regions = Record<string, string[]>;
type DeathItem = Record<string, number>;
type GenderData = Record<string, DeathItem>;
type YearData = Record<string, GenderData>;
type DeathData = Record<string, YearData>;
export type CountryItem = {
  name: string;
  code: string;
  lat: number;
  lon: number;
};
type Database = {
  countries: CountryItem[];
  data: DeathData;
};

export const useDatabase = () => {
  const [json, setJson] = useState<Database | null>(null);
  const [initialized, setInitialized] = useState(false);

  /**
   * listen for database.json and load it once
   */
  useEffect(() => {
    fetch("/database.json")
      .then((response) => response.json())
      .then((data) => {
        setJson(data);
        setInitialized(true);
      });
  }, []);

  /**
   *
   * @returns get list of all countries for a given region
   */
  function countryList(): CountryItem[] {
    if (json === null) return [];
    return json.countries;
  }

  /**
   * get all available years in the database in ascending order
   * @returns
   */
  function getYears(): string[] {
    if (json === null) return [];

    return [
      ...new Set(
        Object.values(json.data)
          .map((item) => Object.keys(item))
          .flat()
      ),
    ]
      .sort()
      .reverse();
  }

  /**
   * get data for a given country, year, gender and age group
   * @param country
   * @param year
   * @param gender
   * @param ageGroup
   * @returns
   */
  function getFor(
    country: string,
    year: string,
    gender: string,
    ageGroup: string = "all"
  ): number {
    if (json === null) return -1;

    const countryData: YearData = json.data[country];
    if (!countryData) return -1;

    const yearData: GenderData = countryData[year];
    if (!yearData) return -1;

    const genderData: DeathItem = yearData[gender];
    if (!genderData) return -1;

    return genderData[ageGroup] ?? -1;
  }

  return {
    // hook related
    initialized,

    // country related
    countryList,

    // data related
    getYears,
    getFor,
  };
};
