const BASE_URL = "https://rickandmortyapi.com/api";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  location: {
    name: string;
    url: string;
  };
  origin: {
    name: string;
    url: string;
  };
}

interface Location {
  id: number;
  name: string;
}

interface FetchCharactersParams {
  status?: string;
  name?: string;
  species?: string;
  type?: string;
  gender?: string;
}

interface ApiResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

async function fetchCharacters(
  params: FetchCharactersParams = {}
): Promise<Character[]> {
  let allCharacters: Character[] = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const url = new URL(`${BASE_URL}/character`);
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });
    url.searchParams.append("page", page.toString());

    const response: Response = await fetch(url.toString());
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

    const data: ApiResponse<Character> = await response.json();
    allCharacters.push(...data.results);
    hasNextPage = data.info.next !== null;
    page++;
  }

  return allCharacters;
}

async function fetchLocations(): Promise<Location[]> {
  const allLocations: Location[] = [];
  let url: string | null = `${BASE_URL}/location`;

  while (url) {
    const response: Response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

    const data: ApiResponse<Location> = await response.json();
    allLocations.push(...data.results);
    url = data.info.next;
  }

  return allLocations;
}

async function fetchCharacterById(id: string): Promise<Character> {
  const response: Response = await fetch(`${BASE_URL}/character/${id}`);
  if (!response.ok)
    throw new Error(`Error fetching character: ${response.statusText}`);

  const character: Character = await response.json();
  return character;
}

export { fetchCharacters, fetchLocations, fetchCharacterById };
