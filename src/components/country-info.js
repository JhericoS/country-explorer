"use client";
import Image from "next/image";
import { useEffect } from "react";

const CountryInfo = ({ country, imageUrl, flagUrl, onClose }) => {
  const { continent, capital, native, languages, currencies, states } = country;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleContainerClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-md max-w-lg w-full mx-4 overflow-auto max-h-[90vh]"
        onClick={handleContainerClick}
      >
        <button className="top-0 right-0 m-4" onClick={onClose}>
          Cerrar
        </button>
        {imageUrl && (
          <div className="mb-4">
            <Image
              src={imageUrl}
              alt={country.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          </div>
        )}
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <div>
              <h2 className="text-xl font-bold">{country.name}</h2>
              <p className="text-sm">{native}</p>
            </div>
          </div>
          {imageUrl && (
            <div className="flex items-center">
              <Image
                src={flagUrl}
                alt={country.name + " flag"}
                width={50}
                height={50}
                className="w-full"
              />
            </div>
          )}
        </div>

        {continent && (
          <p>
            <strong>Continent:</strong> {continent.name}
          </p>
        )}
        {capital && (
          <p>
            <strong>Capital:</strong> {capital}
          </p>
        )}
        {languages.length > 0 && (
          <p>
            <strong>Language:</strong>{" "}
            {languages.map((lang) => lang.name).join(", ")}
          </p>
        )}
        {currencies.length > 0 && (
          <p>
            <strong>Currency:</strong> {currencies.join(", ")}
          </p>
        )}
        {states.length > 0 && (
          <div>
            <p>
              <strong>States:</strong>
            </p>
            <ul style={{ maxHeight: "200px", overflowY: "auto" }}>
              {states.map((state, index) => (
                <li key={index}>{state.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryInfo;
