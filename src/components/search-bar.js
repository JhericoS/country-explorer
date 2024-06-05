import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [filtroNombre, setFiltroNombre] = useState("");
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                placeholder="Buscar país..."
                value={query}
                onChange={handleChange}
                className="border p-2 rounded-md w-full"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md mt-2">
                Buscar
            </button>
        </form>
    );
};

export default SearchBar;
