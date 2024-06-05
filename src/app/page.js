"use client";

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

  return (
    <div>
      <div>
        <SearchBar onSearch={() => {}} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.countries.map((country) => (
          <CountryCard key={country.code} country={country} />
        ))}
      </div>
    </div>
  );
}

export default Home;
