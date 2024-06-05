"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const UNSPLASH_ACCESS_KEY = "DkiSn52NtYDu5S9gWLIzE4OuRlz673kKcpurWlEg8Tc";

const defaultImageUrl = "/public/images/not_found.png";

const CountryCard = ({ country, onCardClick, onImageLoad }) => {
  const { name, code, continent } = country;
  const [image, setImage] = useState(null);
  const [flagUrl, setFlagUrl] = useState(null);
  const [error, setError] = useState(null);
  const { ref, inView } = useInView();
  const [imageCache, setImageCache] = useState({});

  useEffect(() => {
    if (inView && !image && !error) {
      const fetchImage = async () => {
        try {
          if (imageCache[name]) {
            setImage(imageCache[name]);
          } else {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?query=${name}&client_id=${UNSPLASH_ACCESS_KEY}`
            );
            const data = await response.json();
            if (data.results && data.results.length > 0) {
              const imageUrl = data.results[0].urls.small;
              setImageCache((prevCache) => ({
                ...prevCache,
                [name]: imageUrl,
              }));
              setImage(imageUrl);
            } else {
              setError(
                "No se encontró ninguna imagen para este país en Unsplash."
              );
              setImage(defaultImageUrl);
            }
          }
        } catch (error) {
          setError("Hubo un error al cargar la imagen.");
          setImage(defaultImageUrl);
        }
      };

      fetchImage();
    }
  }, [name, inView, image, error, imageCache]);

  useEffect(() => {
    const fetchFlagUrl = async () => {
      try {
        const response = await fetch(
          `https://flagcdn.com/h80/${code.toLowerCase()}.png`
        );
        setFlagUrl(response.url);
      } catch (error) {
        console.error("Error fetching flag image:", error);
      }
    };

    fetchFlagUrl();
  }, [code]);

  return (
    <div
      ref={ref}
      className="border p-4 rounded-md"
      onClick={() => [onImageLoad(image, flagUrl), onCardClick(country)]}
    >
      {image && (
        <div className="relative">
          <Image
            src={image}
            alt={`${name}`}
            width={300}
            height={200}
            className="w-full h-32 object-cover rounded-md mb-4"
          />
          {flagUrl && (
            <Image
              src={flagUrl}
              alt={`${name} flag`}
              width={50}
              height={50}
              className="absolute bottom-2 right-2 border rounded-md"
              style={{ zIndex: 1 }}
            />
          )}
        </div>
      )}
      <h2 className="text-lg font-bold">{name}</h2>
      <p>{continent.name}</p>
    </div>
  );
};

export default CountryCard;
