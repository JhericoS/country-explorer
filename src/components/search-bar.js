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
        className="border py-2 px-4 rounded-md w-full mx-auto flex"
      />
    </div>
  );
};

export default SearchBar;