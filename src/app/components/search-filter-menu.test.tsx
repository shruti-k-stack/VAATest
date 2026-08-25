import { render } from "@testing-library/react";
import { it } from "@jest/globals";
import SearchFilterMenu from "./search-filter-menu";

const mockHolidays = [
    {
        hotel: {
            
        }
    }
]

it("renders all holidays initially via the real HolidayCards component", () => {
    render(<SearchFilterMenu holidays={[]} />);

});