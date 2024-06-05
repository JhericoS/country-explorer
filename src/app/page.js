"use client";
import { useState, useEffect } from "react";
import CountryCard from "@/components/country-card";
import SearchBar from "@/components/search-bar";
import { gql, useSuspenseQuery } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

const query = gql`
  query {
    continents {
      name
      code
    }
    countries {
      code
      continent {
        code
        name
      }
      capital
      currencies
      emoji
      emojiU
      languages {
        rtl
        name
        code
      }
      name
      native
      phone
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
  const [visibleCount, setVisibleCount] = useState(9);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 9);
  };

  const handleContinentChange = (e) => {
    const continent = e.target.value;
    setSelectedContinents((prevSelected) =>
      prevSelected.includes(continent)
        ? prevSelected.filter((c) => c !== continent)
        : [...prevSelected, continent]
    );
    setVisibleCount(9);
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="ml-4 relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="border py-2 px-4 rounded-md w-full max-w-xs"
          >
            Filtrar
          </button>
          {dropdownOpen && (
            <div className="absolute mt-2 bg-white border rounded-md shadow-lg z-10">
              {data?.continents?.map((continent) => (
                <label key={continent.code} className="block px-4 py-2">
                  <input
                    type="checkbox"
                    value={continent.code}
                    checked={selectedContinents.includes(continent.code)}
                    onChange={handleContinentChange}
                    className="mr-2"
                  />
                  {continent.name}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleCountries.map((country) => (
          <CountryCard key={country.code} country={country} />
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
        <button className="mt-4 p-2 border rounded" onClick={handleLoadMore}>
          Ver más
        </button>
      )}
    </div>
  );
}

export default Home;
