import type { Holiday } from "@/types/booking";
import styles from './holidaycards.module.css';

export default function HolidayCards({ holidays, departureDate }: { holidays: Holiday[]; departureDate: string | undefined }) {
  

     return (
         <div>
          {holidays.map((holiday) => (
            <div className={styles.holiday_card} key={holiday.hotel.id}>
              <div>
              <div className={styles.holiday_card_image}>
              {/* <img src={holiday.hotel.content.images[0].RESULTS_CAROUSEL.url} alt={holiday.hotel.name} /> */}
              </div>
              <div className={styles.holiday_card_details}>
              <h3>{holiday.hotel.name}</h3>
              <p>Departure Date: {departureDate}</p>
              </div>
              <button>Find Details</button>
              <button>Hotel Details</button>
              <button>Reviews</button>
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