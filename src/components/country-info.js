"use client";
import Image from "next/image";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";

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
        className="bg-white rounded-xl max-w-lg w-full mx-4 overflow-auto max-h-[90vh]"
        onClick={handleContainerClick}
      >
        <button className="relative top-2 left-2" onClick={onClose}>
          <MdClose className="h-6 w-6" />
        </button>
        <div className="px-8 pb-8 pt-4">
          {imageUrl && (
            <div className="mb-4">
              <Image
                src={imageUrl}
                alt={country.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-md mb-4 shadow-sm shadow-black"
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
                  width={60}
                  height={60}
                  className="w-full shadow-sm shadow-black"
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
    </div>
  );
};
CountryInfo.propTypes = {
  country: PropTypes.object.isRequired,
  imageUrl: PropTypes.string,
  flagUrl: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
export default CountryInfo;
