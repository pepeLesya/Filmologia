import React from "react";
import { Link } from "react-router-dom";
import FilterZhanr from "./FilterZhanr";

interface FiltersProps {
  selectedGenres: string[];
  selectedRatings: string[];
  selectedYear: string[];
  setSelectedGenres: (values: string[]) => void;
  setSelectedRatings: (values: string[]) => void;
  setSelectedYear: (values: string[]) => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedGenres,
  selectedRatings,
  selectedYear,
  setSelectedGenres,
  setSelectedRatings,
  setSelectedYear,
}) => {
  const genreOptions = [
    { value: "документальный" },
    { value: "комедия" },
    { value: "музыка" },
    { value: "короткометражка" },
    { value: "драма" },
    { value: "триллер" },
    { value: "фантастика" },
    { value: "ужасы" },
  ];

  const ratingOptions = [
    { value: "5-7" },
    { value: "8" },
    { value: "9-10" },
    { value: "10" },
  ];

  const yearOptions = [
    { value: "1990-2000" },
    { value: "2000-2005" },
    { value: "2005-2010" },
    { value: "2010-2015" },
    { value: "2015-2020" },
    { value: "2023" },
    { value: "2024" },
    { value: "2025" },
    { value: "2020-2025" },
  ];

  return (
    <div className="main-content-filter">
      <FilterZhanr
        selectedValues={selectedGenres}
        onChange={setSelectedGenres}
        options={genreOptions}
        placeholder="Выберите жанры"
      />
      <FilterZhanr
        selectedValues={selectedRatings}
        onChange={setSelectedRatings}
        options={ratingOptions}
        placeholder="Выберите рейтинг"
      />
      <FilterZhanr
        selectedValues={selectedYear}
        onChange={setSelectedYear}
        options={yearOptions}
        placeholder="Выберите год"
      />
      <Link to="/movies/favorites">
        <button className="favorite-list-button">Список избранного</button>
      </Link>
    </div>
  );
};

export default Filters;