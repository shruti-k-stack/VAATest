"use client";

import type { Holiday } from "@/types/booking";
import styles from './holidaycards.module.css';

export default function HolidayCards({ holidays, departureDate }: { holidays: Holiday[]; departureDate: string | undefined }) {


if (holidays && holidays.length > 0) {
     return (
         <div>
          {holidays.map((holiday) => (
              <div className={styles.holiday_card} key={holiday.hotel.id}>
                <div className={styles.holiday_card_content}>
                  <div className={styles.holiday_card_info}>
                    <div className={styles.holiday_card_image}>
                      <img src={holiday.hotel.content.images[0]?.RESULTS_CAROUSEL.url} alt={holiday.hotel.name} />
                  </div>
                  <div className={styles.holiday_card_details}>
                      <h3>{holiday.hotel.name}</h3>
                      <p>Departure Date: {departureDate}</p>
                      <p>Star Rating: {holiday.hotel.content.starRating}</p>
                      <p>Location: {holiday.hotel.content.parentLocation}</p>
                  </div>
                </div>
                <div className={styles.holiday_card_buttons}>
                    <button>Find Details</button>
                    <button>Hotel Details</button>
                    <button>Reviews</button>
                </div>
              </div>
              <div className={styles.holiday_card_pricing}>
                <h2>£{holiday.pricePerPerson}pp</h2>
                <p>Total for 2 guests £{holiday.totalPrice}</p>
              </div>
            </div>
          ))}
         </div>

     )
    }
}