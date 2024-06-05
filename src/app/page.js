"use client";
import { useState, useEffect, useRef } from "react";
import CountryCard from "@/components/country-card";
import SearchBar from "@/components/search-bar";
import { gql, useSuspenseQuery } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import CountryInfo from "@/components/country-info";

const query = gql`
  query {
    continents {
      code
      name
    }
    countries {
      code
      name
      native
      continent {
        code
        name
      }
      capital
      languages {
        rtl
        code
        name
      }
      currencies
      states {
        name
        code
      }
    }
  }
`;

function Home() {
  loadDevMessages();
  loadErrorMessages();

  const { data } = useSuspenseQuery(query);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContinents, setSelectedContinents] = useState([]);
  const [visibleCountries, setVisibleCountries] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [selectedCountryImage, setSelectedCountryImage] = useState(null);
  const [selectedCountryFlag, setSelectedCountryFlag] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const filteredCountries = data?.countries?.filter((country) => {
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearchTerm =
        country.name?.toLowerCase().startsWith(searchTermLower) ||
        country.native?.toLowerCase().startsWith(searchTermLower);

      const matchesContinents =
        selectedContinents.length === 0 ||
        selectedContinents.includes(country.continent.code);

      return matchesSearchTerm && matchesContinents;
    });

    setVisibleCountries(filteredCountries?.slice(0, visibleCount));
  }, [data, searchTerm, selectedContinents, visibleCount]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  const handleContinentChange = (e) => {
    const continent = e.target.value;
    setSelectedContinents((prevSelected) =>
      prevSelected.includes(continent)
        ? prevSelected.filter((c) => c !== continent)
        : [...prevSelected, continent]
    );
    setVisibleCount(12);
  };

  const handleCardClick = (country) => {
    setSelectedCountry(country);
    setIsInfoOpen(true);
  };

  const handleImageLoad = (imageUrl, flagUrl) => {
    setSelectedCountryImage(imageUrl);
    setSelectedCountryFlag(flagUrl);
  };

  return (
    <div>
      <div className="flex mb-4 mx-auto items-center justify-center">
        <div className="mr-4 relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="py-2 px-4 rounded-lg w-full max-w-xs bg-gray-800 text-white"
          >
            Filtrar
          </button>
          {dropdownOpen && (
            <div className="absolute mt-2 bg-white border rounded-lg shadow-lg shadow-gray-800 z-10 w-44">
              {data?.continents?.map((continent) => (
                <label
                  key={continent.code}
                  className="px-4 py-2 flex items-center"
                >
                  <input
                    type="checkbox"
                    value={continent.code}
                    checked={selectedContinents.includes(continent.code)}
                    onChange={handleContinentChange}
                    className="mr-2 h-4 w-4"
                  />
                  {continent.name}
                </label>
              ))}
            </div>
          )}
        </div>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 w-full max-w-7xl mx-auto">
        {visibleCountries.map((country) => (
          <CountryCard
            key={country.code}
            country={country}
            onImageLoad={handleImageLoad}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
      {visibleCount <
        data?.countries?.filter((country) => {
          const searchTermLower = searchTerm.toLowerCase();
          const matchesSearchTerm =
            country.name?.toLowerCase().startsWith(searchTermLower) ||
            country.native?.toLowerCase().startsWith(searchTermLower);

          const matchesContinents =
            selectedContinents.length === 0 ||
            selectedContinents.includes(country.continent.code);

          return matchesSearchTerm && matchesContinents;
        }).length && (
        <button
          className="mt-4 p-2 border rounded-lg flex mx-auto bg-gray-800 text-white"
          onClick={handleLoadMore}
        >
          Ver más
        </button>
      )}
      {isInfoOpen && selectedCountry && (
        <CountryInfo
          country={selectedCountry}
          imageUrl={selectedCountryImage}
          flagUrl={selectedCountryFlag}
          onClose={() => setIsInfoOpen(false)}
        />
      )}
    </div>
  );
}

export default Home;
