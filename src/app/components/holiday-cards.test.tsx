import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/jest-globals";
import { describe, expect, it, jest } from "@jest/globals";
import HolidayCards, { recommendedLabel } from "./holiday-cards";
import { Holiday } from "@/types/booking";

jest.mock("./fallback-image", () => {
  return function MockFallbackImage({ src, alt, placeholderClass }: any) {
    return (
      <img 
        src={src || "fallback-url"} 
        alt={alt} 
        data-testid="mock-fallback-image"
        className={placeholderClass}
      />
    );
  };
});

const mockHolidays = [
  {
    hotel: {
      id: "hotel-1",
      name: "Sunny Beach Resort",
      content: {
        starRating: 4,
        parentLocation: "Majorca, Spain",
        images: [
          {
            RESULTS_CAROUSEL: {
              url: "https://example.com/sunny-beach.jpg",
            },
          },
        ],
      },
    },
    pricePerPerson: 499,
    totalPrice: 998,
  },
] as unknown as Holiday[]; 

  const mockDepartureDate = "24th Aug 2026";

  it("renders a list of holiday cards when data is provided", () => {
    render(<HolidayCards holidays={mockHolidays} departureDate={mockDepartureDate} />);

    expect(screen.getByText("Sunny Beach Resort")).toBeInTheDocument();
    expect(screen.getByText(`Departure Date: ${mockDepartureDate}`)).toBeInTheDocument();
    expect(screen.getByText("Star Rating: 4")).toBeInTheDocument();
    expect(screen.getByText("Location: Majorca, Spain")).toBeInTheDocument();

    expect(screen.getByText("£499pp")).toBeInTheDocument();
    expect(screen.getByText("Total for 2 guests £998")).toBeInTheDocument();

    const image = screen.getByTestId("mock-fallback-image");
    
    expect(image).toHaveAttribute("src", "https://example.com/sunny-beach.jpg");
    expect(image).toHaveAttribute("alt", "Sunny Beach Resort");
  });

  it("renders 'No Hotels Found.' when the holidays array is empty", () => {
    render(<HolidayCards holidays={[]} departureDate={mockDepartureDate} />);
    
    expect(screen.getByText("No Hotels Found.")).toBeInTheDocument();
    expect(screen.queryByText("Sunny Beach Resort")).not.toBeInTheDocument();
  });

  it("renders 'No Hotels Found.' when holidays is undefined", () => {
    // @ts-ignore - explicitly testing invalid input just in case
    render(<HolidayCards holidays={undefined} departureDate={mockDepartureDate} />);
    
    expect(screen.getByText("No Hotels Found.")).toBeInTheDocument();
  });


  it("wraps the component with a 'Recommended' label", () => {
    const RecommendedHolidayCards = recommendedLabel(HolidayCards);
    
    render(<RecommendedHolidayCards holidays={mockHolidays} departureDate="24th Aug 2026" />);

    expect(screen.getByText("Recommended")).toBeInTheDocument();
    expect(screen.getByText("Sunny Beach Resort")).toBeInTheDocument();
  });