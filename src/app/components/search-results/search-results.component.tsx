import searchResults from "../../../../fixtures/search-results.json";
import type { BookingResponse } from "@/types/booking";
import HolidayCards from "../holiday-cards";
import styles from './search-results.module.css';

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
      <h2>{fixtureResults.holidays.length} results found</h2>
      {(location || departureDate) && (
        <>
          <p>Going to {location ? ` for ${location}` : ""}</p>
          <p>Departure {departureDate ? ` departing ${departureDate}` : ""}.</p>
        </>
      )}
      <button> Edit Search </button>
      </div>
      <HolidayCards holidays={fixtureResults.holidays} departureDate={departureDate} />
    </section>
  );
}
