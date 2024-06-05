const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mb-4 w-full">
      <input
        type="text"
        placeholder="Buscar país..."
        value={searchTerm}
        onChange={handleSearch}
        className="border py-2 px-4 rounded-md w-full max-w-xl mx-auto flex"
      />
    </div>
  );
};

export default SearchBar;