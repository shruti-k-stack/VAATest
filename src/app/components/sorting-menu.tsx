"use client";

import { Holiday } from "@/types/booking";
import styles from "@/app/components/sorting-menu.module.css";
import {useState} from 'react';

export default function SortingMenu({holiday} : {holiday: Holiday[]}) {
    const [sortItems, setSortItems] = useState<Holiday[]>([]);
    
    const handlePriceSort = () => {
        const sorted = [...holiday].sort((x, y) => x.pricePerPerson - y.pricePerPerson);
        setSortItems(sorted);
    }

    return (
        <>
        <div className={styles.sort_buttons}>
            <button
            type="button"
            >
            Recommended
            </button>

            <button
            type="button"
            onClick= {handlePriceSort}
            >
            Price
            </button>

            <button
            type="button"
            >
            Rating
            </button>
        </div>
        </>
    )
}