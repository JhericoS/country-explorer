const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full max-w-lg">
      <input
        type="text"
        placeholder="Buscar país..."
        value={searchTerm}
        onChange={handleSearch}
        className="border border-gray-400 py-2 px-4 rounded-lg w-full mx-auto flex"
      />
    </div>
  );
};

export default SearchBar;