"use client";

import { useMemo, useState } from 'react';
import styles from './search-filter-menu.module.css';
import { Holiday } from '@/types/booking';
import { DATE_FORMATS } from '@/utils/constants';
import { DateTime } from 'luxon';
import HolidayCards, { recommendedLabel } from './holiday-cards';

type SortType = "recommended" | "price" | "rating" | null;

const HolidayCardRecommended: React.ComponentType<React.ComponentProps<typeof HolidayCards>> =
    recommendedLabel(HolidayCards);

const PRICE_RANGES = [
    { id: 'low', label: 'Under 500', min: 0, max: 499.99 },
    { id: 'mid', label: '500 - 1000', min: 500, max: 1000 },
    { id: 'high', label: 'Over 1000', min: 1000.01, max: Infinity },
];

export default function SearchFilterMenu({ holidays }: { holidays: Holiday[] }) {
    const [searchHotelName, setSearchHotelName] = useState("");
    const [starRating, setStarRating] = useState("");
    const [active, setActive] = useState<SortType>(null);

    const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
    const [appliedPriceRanges, setAppliedPriceRanges] = useState<string[]>([]);

    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [appliedSelectedFacilities, setAppliedSelectedFacilities] = useState<string[]>([]);


    const departureDate = DateTime.now().plus({ days: 7, months: 1 }).toFormat(DATE_FORMATS.URL_DATE);
    
    const toTitleCase = (str: string): string => {
        return str
        .toLowerCase()
        .split(' ')
        .map((word: string): string => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    const availableFacilities = useMemo(() => {
    const allFacilities = holidays.flatMap(
            (holiday) => holiday.hotel.content.hotelFacilities || []
        );
        const uniqueFacilities = new Set(allFacilities.map(f => f.toLowerCase()));
            return Array.from(uniqueFacilities).sort();
    }, [holidays]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchHotelName(e.target.value);
    };

    const handleStarRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStarRating(e.target.value);
    }

    const handleReset = () => {
        setSearchHotelName("");
        setStarRating("");
        setActive(null);
        setSelectedPriceRanges([]);
        setAppliedPriceRanges([]);
    }

    const handleApplyPrices = () => {
        setAppliedPriceRanges(selectedPriceRanges);
    }
    
    const handleApplyFacilities = () => {
        setAppliedSelectedFacilities(selectedFacilities);
    }
    

    
    let filteredHolidays = holidays.filter((holiday) => {
        const hotelNameMatch = holiday.hotel.name.toLowerCase().includes(searchHotelName.toLowerCase());
        const starRatingMatch = starRating ? holiday.hotel.content.starRating.toString() === starRating : true;
        const priceMatch = appliedPriceRanges.length === 0 || appliedPriceRanges.some((rangeId) => {
            const range = PRICE_RANGES.find((r) => r.id === rangeId);
            if (!range) return false;

            return holiday.pricePerPerson >= range.min && holiday.pricePerPerson <= range.max;
        });
        const facilitiesMatch = appliedSelectedFacilities.length === 0 || appliedSelectedFacilities.every((facility) => {
            return holiday.hotel.content.hotelFacilities?.some(
                (hotelFacility) => hotelFacility.toLowerCase() === facility
            );
        });
        return hotelNameMatch && starRatingMatch && priceMatch && facilitiesMatch;
    });

    if (active === "recommended") {
        filteredHolidays = filteredHolidays.filter((holiday) => holiday.tierPoints > 40);
    } else if (active === "price") {
        filteredHolidays.sort((a, b) => a.pricePerPerson - b.pricePerPerson);
    } else if (active === "rating") {
        filteredHolidays.sort((a, b) => Number(b.hotel.content.starRating) - Number(a.hotel.content.starRating));
    }

    return(
        <>
        <section className={styles.search_container}>
        <div className={styles.sort_display}>
            <button type="button" className={styles.sort_buttons} onClick={() => setActive(active === "recommended" ? null : "recommended")}>Recommended </button>

            <button type="button" className={styles.sort_buttons} onClick={() => setActive(active === "price" ? null : "price")}>Price</button>

            <button type="button" className={styles.sort_buttons} onClick={() => setActive(active === "rating" ? null : "rating")}>Rating</button>
        </div>
        <div className={styles.search_body}>
        <aside className={styles.search_filter_menu} aria-labelledby="filter-menu">
                <section className={styles.filter_items}>
                    <div className={styles.filter_header}>
                        <h3 id="filter-menu">Filter By</h3>
                        <button type="reset" className={styles.filters_button} onClick={handleReset}> Reset </button>
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
                    <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <section className={styles.filter_price_range}>
                                <label htmlFor="price-range">Price Range</label>

                                    {PRICE_RANGES.map((price) => (
                                        <label key={price.id} style={{ fontSize: '1.25rem', fontWeight: 'normal'}}>
                                            <input
                                                type="checkbox"
                                                value={price.id}
                                                checked={selectedPriceRanges.includes(price.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedPriceRanges([
                                                            ...selectedPriceRanges,
                                                            price.id,
                                                        ]);
                                                    } else {
                                                        setSelectedPriceRanges(
                                                            selectedPriceRanges.filter(
                                                                (p) => p !== price.id
                                                            )
                                                        );
                                                    }
                                                }}
                                            />

                                            {price.label}
                                        </label>
                                    ))}
                            <button className={styles.filters_button} onClick={handleApplyPrices}> Apply </button>
                        </section>

                        <section className={styles.filter_price_range}>
                            <label htmlFor="hotel-facilities">Hotel Facilities</label>
                            {availableFacilities.map((facility) => (
                                <label key={facility} style={{ fontSize: '1.25rem', fontWeight: 'normal'}}>
                                    <input 
                                    type='checkbox' 
                                    value={facility} 
                                    checked={selectedFacilities.includes(facility)}
                                    onChange={(e) => {
                                        if(e.target.checked) {
                                            setSelectedFacilities([...selectedFacilities, facility])
                                        } else {
                                            setSelectedFacilities(selectedFacilities.filter((f)=> f !== facility))
                                        }
                                    }}
                                    />
                                    {toTitleCase(facility)}
                                </label>
                            ))}
                            
                            <button className={styles.filters_button} onClick={handleApplyFacilities}> Apply </button>
                            </section>
                        </section>
                </section>   
        </aside>
        <main className={styles.filter_holiday_results}>
            {active === "recommended" && filteredHolidays.length > 0 ? (
                <div className={styles.filter_holiday_results}>
                    <HolidayCardRecommended holidays={filteredHolidays} departureDate={departureDate} />
                </div>
            ) : (
                <div className={styles.filter_holiday_results}>
                    <HolidayCards holidays={filteredHolidays} departureDate={departureDate} />
                </div>
            )}
        </main>
        </div>
        </section> 
        </>    
    )
}
