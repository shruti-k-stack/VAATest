"use client";

import searchResults from "../../../../fixtures/search-results.json";
import type { BookingResponse } from "@/types/booking";
import styles from './search-results.module.css';
import SearchFilterMenu from "../search-filter-menu";

const fixtureResults = searchResults satisfies BookingResponse;

type SearchParams = { [key: string]: string | string[] | undefined };

const getSingleParam = (value: string | string[] | undefined) => {
  return Array.isArray(value) ? value[0] : value;
};

export default function SearchResultsComponent({
  searchParams, 
}: {
  searchParams: SearchParams;
}) {
  const location = getSingleParam(searchParams.location);
  const departureDate = getSingleParam(searchParams.departureDate);

  return (
    <section>
      <div className= {styles.search_results_component}>
        <div className={styles.search_results_header}>
          <p className={styles.search_param}>
            {fixtureResults.holidays.length} results found
          </p>
          {(location || departureDate) && (
            <>
              <p className={styles.search_param}>Going to {location ? ` for ${location}` : ""}</p>
              <p className={styles.search_param}>Departure {departureDate ? ` departing ${departureDate}` : ""}.</p>
            </>
          )}
        </div>
      </div>
      <div className={styles.search_results_content}>
        <SearchFilterMenu holidays={fixtureResults.holidays}/>
      </div>
    </section>
  );
}
