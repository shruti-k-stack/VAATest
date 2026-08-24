"use client";

import type { Holiday } from "@/types/booking";
import styles from './holidaycards.module.css';
import { JSX } from "react/jsx-runtime";
import FallbackImage from "./fallback-image";
import { toTitleCase, truncateText } from "./utils/constants";

type HolidayCardsProps = {
  holidays: Holiday[];
  departureDate: string | undefined;
};

export default function HolidayCards({ holidays, departureDate }: HolidayCardsProps) {

  const uniqueHolidays = holidays.filter((holiday, index, self ) => {
      return index === self.findIndex((h) => h.hotel.id === holiday.hotel.id)
  })

if (uniqueHolidays && uniqueHolidays.length > 0) {
     return (
         <div className={styles.holiday_card_container}>
          {uniqueHolidays.map((holiday, index) => (
              <div className={styles.holiday_card} key={`${holiday.hotel.id}-${index}`}>
                <div className={styles.holiday_card_content}>
                    <div className={styles.holiday_card_image}>
                        <FallbackImage 
                        src={holiday.hotel.content.images[0]?.RESULTS_CAROUSEL?.url} 
                        alt={holiday.hotel.name}
                        placeholderClass={styles.image_placeholder}
                      />
                    </div>
                    <div className={styles.holiday_card_body}>
                    <div className={styles.holiday_card_details}>
                        <h3 className={styles.holiday_hotel_name}>{truncateText(holiday.hotel.name, 30)}</h3>
                        <p>Departing: {departureDate}</p>
                        <p>Rating: {holiday.hotel.content.starRating}</p>
                        <p>Location: {holiday.hotel.content.parentLocation}</p>
                        <p>{holiday.hotel.boardBasis}</p>
                        <p>{truncateText(holiday.hotel.content.hotelFacilities.map((facility) => toTitleCase(facility)).join(', '), 10)}</p>
                    </div>
                    <div className={styles.holiday_card_pricing}>
                      <h3>£{holiday.pricePerPerson}pp</h3>
                      <p>Total for 2 guests £{holiday.totalPrice}</p>
                    </div>
                    <button style= {{backgroundColor: '#33549c', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer'}}>More Details</button>
                    </div>
                </div>
              </div>
          ))}
         </div>
     )
    }
    else return (
      <h2>No Hotels Found.</h2>
    )
};

export const recommendedLabel = (Card: (props: HolidayCardsProps) => JSX.Element) => {
  return (props: HolidayCardsProps) => {
    return (
      <section className={styles.recommended_container}>
          <label className={styles.recommended_label}>
            Recommended
          </label>
          <Card {...props} />
      </section>
    )
  }
}