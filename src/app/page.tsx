import Link from "next/link";
import { fetchCharacters, fetchLocations } from "./utils/api";

async function HomePage({ searchParams }: any) {
  const status = searchParams.status || "";
  const locationId = searchParams.location || "";
  const page = parseInt(searchParams.page) || 1;
  const itemsPerPage = 20;

  const allCharacters = await fetchCharacters({ status });
  const allLocations = await fetchLocations();

  const filteredCharacters = allCharacters.filter((character) => {
    const matchesStatus =
      !status || character.status.toLowerCase() === status.toLowerCase();
    const matchesLocation =
      !locationId || character.location.url.includes(`/location/${locationId}`);
    return matchesStatus && matchesLocation;
  });

  const displayedCharacters = filteredCharacters.slice(0, page * itemsPerPage);
  const loadMore = displayedCharacters.length < filteredCharacters.length;
  console.log(loadMore);

  return (
    <div className="flex min-h-screen justify-center m-4">
      <div className="p-4">
        <div className="mb-4 text-3xl font-bold">
          <Link href="/">Rick And Morty Characters</Link>
        </div>

        <form method="GET">
          <div className="text-black">
            <h1 className="text-white font-bold mb-2">Status</h1>
            <select id="status" name="status" defaultValue={status}>
              <option value="">All</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div className="mt-4 text-black">
            <h1 className="text-white font-bold mb-2">Last Known Location</h1>
            <select id="location" name="location" defaultValue={locationId}>
              <option value="">All</option>
              {allLocations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 py-2 px-8 bg-green-500 font-bold text-white rounded"
          >
            Apply Filters
          </button>
        </form>
      </div>

      <div className="p-4 max-w-[1280px]">
        {!displayedCharacters.length ? (
          <p>No characters found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {displayedCharacters.map((character) => (
              <div
                key={character.id}
                className="border p-4 rounded-md shadow-md hover:scale-110 transition-all"
              >
                <Link href={`/character/${character.id}`}>
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full mb-2 rounded-md"
                  />
                  <h3 className="text-lg font-semibold">{character.name}</h3>
                  <p
                    className={
                      character.status === "Alive"
                        ? "text-green-500"
                        : character.status === "Dead"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }
                  >
                    {character.status}
                  </p>
                  <p className="text-gray-500">
                    <strong>Origin:</strong> {character.origin.name}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}

        {loadMore && (
          <div className="flex justify-center items-center">
            <Link
              href={{
                pathname: "/",
                query: { ...searchParams, page: page + 1 },
              }}
              scroll={false}
              className="py-2 px-8 mt-4 bg-blue-500 text-lg font-bold text-white rounded"
            >
              Load More
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
