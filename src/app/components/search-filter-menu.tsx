"use client";

import { useState } from 'react';
import styles from './search-filter-menu.module.css';
import { Holiday } from '@/types/booking';
import { DATE_FORMATS } from '@/utils/constants';
import { DateTime } from 'luxon';
import HolidayCards from './holiday-cards';


export default function SearchFilterMenu({ holidays }: { holidays: Holiday[] }) {
    const [searchHotelName, setSearchHotelName] = useState("");
    const [starRating, setStarRating] = useState("");

    const departureDate = DateTime.now().plus({ days: 7, months: 1 }).toFormat(DATE_FORMATS.URL_DATE);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchHotelName(e.target.value);
    };

    const handleStarRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStarRating(e.target.value);
    }

    const handleReset = () => {
        setSearchHotelName("");
        setStarRating("");
    }

    const filteredHolidays = holidays.filter((holiday) => {
        return holiday.hotel.name.toLowerCase().includes(searchHotelName.toLowerCase());
    });

    const filterByStarRating = holidays.filter((holiday) => {
        return starRating === "" || starRating ? holiday.hotel.content.starRating === parseInt(starRating) : true;
    });

    return(
        <aside className={styles.search_filter_menu} aria-labelledby="filter-menu">
            <h3 id="filter-menu">Filter By</h3>
            <section className={styles.filter_hotel_name}>
                <div className={styles.filter_hotel_name_content}>
                    <label htmlFor="hotel-name">Hotel Name</label>
                    <input type="text" id="hotel-name" placeholder="Enter hotel name" value={searchHotelName} onChange={handleChange} />
                </div>
                    <button type="reset" className={styles.clear_filters_button} onClick={handleReset}> Reset </button>
            </section>
            <section className={styles.filter_rating_content}>
                <label htmlFor="star-rating">Star Rating</label>
                   <select
                        id="star-rating"
                        value={starRating}
                        onChange={handleStarRatingChange}
                        className={styles.filter_star_rating}
                    >
                        <option value="">All Ratings</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
            </section>

            {(filteredHolidays && filterByStarRating) ? (
                <HolidayCards holidays={filteredHolidays} departureDate={departureDate} />
            ) : (
                <p>No hotels found.</p>
            )}
        </aside>
    )
}