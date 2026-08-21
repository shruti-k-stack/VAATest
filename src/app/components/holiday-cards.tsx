"use client";

import type { Holiday } from "@/types/booking";
import styles from './holidaycards.module.css';
import { JSX } from "react/jsx-runtime";
import { index } from "parsimmon";

type HolidayCardsProps = {
  holidays: Holiday[];
  departureDate: string | undefined;
};

export default function HolidayCards({ holidays, departureDate }: HolidayCardsProps) {

  const uniqueHotels = Array.from(new Map(
          holidays.map((holiday) => [holiday.hotel.id, holiday])
        ).values()
        );

if (holidays && holidays.length > 0) {
     return (
         <div className={styles.holiday_card_container}>
          {holidays.map((holiday, index) => (
              <div className={styles.holiday_card} key={`${holiday.hotel.id}-${index}`}>
                <div className={styles.holiday_card_content}>
                    <div className={styles.holiday_card_image}>
                      {holiday.hotel.content.images[0]?.RESULTS_CAROUSEL.url ? (
                              <img
                                src={holiday.hotel.content.images[0]?.RESULTS_CAROUSEL?.url}
                                alt={holiday.hotel.name}
                              />
                            ) : (
                              <div className={styles.image_placeholder}>
                                No image available
                              </div>
                            )}
                    </div>
                    <div className={styles.holiday_card_body}>
                    <div className={styles.holiday_card_details}>
                        <h3>{holiday.hotel.name}</h3>
                        <p>Departure Date: {departureDate}</p>
                        <p>Star Rating: {holiday.hotel.content.starRating}</p>
                        <p>Location: {holiday.hotel.content.parentLocation}</p>
                    </div>
                    <div className={styles.holiday_card_pricing}>
                      <h3>£{holiday.pricePerPerson}pp</h3>
                      <p>Total for 2 guests £{holiday.totalPrice}</p>
                    </div>
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