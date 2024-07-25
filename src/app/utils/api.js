const BASE_URL = "https://rickandmortyapi.com/api";

async function fetchCharacters(params) {
  let allCharacters = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const url = new URL(`${BASE_URL}/character`);
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });
    url.searchParams.append("page", page.toString());

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

    const data = await response.json();
    allCharacters.push(...data.results);
    hasNextPage = data.info.next;
    page++;
  }

  return allCharacters;
}

async function fetchLocations() {
  const allLocations = [];
  let url = `${BASE_URL}/location`;

  while (url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

    const data = await response.json();
    allLocations.push(...data.results);
    url = data.info.next;
  }

  return allLocations;
}

async function fetchCharacterById(id) {
  const response = await fetch(`${BASE_URL}/character/${id}`);
  if (!response.ok)
    throw new Error(`Error fetching character: ${response.statusText}`);

  return await response.json();
}

export { fetchCharacters, fetchLocations, fetchCharacterById };
