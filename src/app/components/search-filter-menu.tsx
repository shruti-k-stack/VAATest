"use client";

import { useState } from 'react';
import styles from './search-filter-menu.module.css';
import { Holiday } from '@/types/booking';
import { DATE_FORMATS } from '@/utils/constants';
import { DateTime } from 'luxon';
import HolidayCards from './holiday-cards';
import SortingMenu from './sorting-menu';


export default function SearchFilterMenu({ holidays }: { holidays: Holiday[] }) {
    const [searchHotelName, setSearchHotelName] = useState("");
    const [starRating, setStarRating] = useState("");
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);

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
        const hotelNameMatch = holiday.hotel.name.toLowerCase().includes(searchHotelName.toLowerCase());
        const starRatingMatch = starRating ? holiday.hotel.content.starRating.toString() === starRating : true;
         return hotelNameMatch && starRatingMatch;
    });

    const prices = holidays.map((holiday) => holiday.pricePerPerson);

    const handlePriceRangeSet = (price: number) => {
        {holidays.filter((holiday) => (selectedPriceRanges.length === 0 || selectedPriceRanges.includes(holiday.pricePerPerson)))}
        if (selectedPriceRanges.includes(price)) {
            setSelectedPriceRanges(selectedPriceRanges.filter((p) => p !== price));
        } else {
            setSelectedPriceRanges([...selectedPriceRanges, price]);
        }
    }

    return(
        <>
        <section className={styles.search_container}>
        <SortingMenu holiday={holidays}/>
        <section className={styles.search_body}>
        <aside className={styles.search_filter_menu} aria-labelledby="filter-menu">
                <section className={styles.filter_items}>
                    <div className={styles.filter_header}>
                        <h3 id="filter-menu">Filter By</h3>
                        <button type="reset" className={styles.clear_filters_button} onClick={handleReset}> Reset </button>
                    </div>
                    <section className={styles.filter_hotel_name}>
                        <div className={styles.filter_hotel_name_content}>
                            <label htmlFor="hotel-name">Hotel Name</label>
                            <input type="text" id="hotel-name" placeholder="Enter hotel name" value={searchHotelName} onChange={handleChange} />
                        </div>
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
                        <section className={styles.filter_price_range}>
                                <label htmlFor="price-range">Price Range</label>

                                    {prices.map((price) => (
                                        <label key={price}>
                                            <input
                                                type="checkbox"
                                                value={price}
                                                checked={selectedPriceRanges.includes(price)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedPriceRanges([
                                                            ...selectedPriceRanges,
                                                            price,
                                                        ]);
                                                    } else {
                                                        setSelectedPriceRanges(
                                                            selectedPriceRanges.filter(
                                                                (p) => price !== p
                                                            )
                                                        );
                                                    }
                                                }}
                                            />

                                            {price}
                                        </label>
                                    ))}
                            <button type="reset" className={styles.clear_filters_button} onClick={() => {handlePriceRangeSet}}> Apply </button>
                            
                        </section>
                </section>   
        </aside>
        <main className={styles.filter_holiday_results}>
            {(filteredHolidays) ? (
                <HolidayCards holidays={filteredHolidays} departureDate={departureDate} />
            ) : (
                <p>No hotels found.</p>
            )}
        </main>
        </section>
        </section> 
        </>    
    )
}