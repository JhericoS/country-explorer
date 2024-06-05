"use client";
import { useState } from "react";
import CountryCard from "@/components/country-card";
import SearchBar from "@/components/search-bar";
import { gql, useSuspenseQuery } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

const query = gql`
  query {
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

  const filteredCountries = data.countries.filter((country) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      country.name?.toLowerCase().startsWith(searchTermLower) ||
      country.native?.toLowerCase().startsWith(searchTermLower)
    );
  });

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCountries.map((country) => (
          <CountryCard key={country.code} country={country} />
        ))}
      </div>
    </div>
  );
}

export default Home;
