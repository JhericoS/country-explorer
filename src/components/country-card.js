const CountryCard = ({ country }) => {
    const { name, capital, population, languages, currencies } = country;

    return (
        <div className="border p-4 rounded-md">
            <h2 className="text-lg font-bold">{name}</h2>
            <p><strong>Capital:</strong> {capital}</p>
            <p><strong>Population:</strong> {population}</p>
            <p><strong>Idioma:</strong> {languages.map(lang => lang.name).join(', ')}</p>
            <p><strong>Currency:</strong> {currencies.map(curr => curr).join(', ')}</p>
        </div>
    );
};

export default CountryCard;
