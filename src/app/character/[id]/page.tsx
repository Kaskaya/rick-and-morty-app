import { fetchCharacterById } from "@/app/utils/api";
import Link from "next/link";

export default async function CharacterPage({ params }: any) {
  const { id } = params;
  const character = await fetchCharacterById(id);

  /*   console.log(character); */

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className=" mx-auto p-4 max-w-screen-md min-h-screen flex items-center">
      <div className="bg-slate-700 rounded-lg shadow-md flex flex-col md:flex-row p-8 w-full">
        <div className="w-2/5  flex items-center justify-center">
          <Link
            href="/"
            className="mr-4 text-gray-300 hover:text-gray-500 font-bold text-xl"
          >
            {" "}
            {"<-"}{" "}
          </Link>
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-auto rounded-md max-h-96"
          />
        </div>
        <div className="pl-10">
          <h1 className="text-3xl font-bold mb-4 md:text-left text-blue-500">
            {character.name}
          </h1>
          <ul>
            <li className="flex items-center mb-2">
              <span className="font-semibold text-black mr-2">Status:</span>
              {character.status}
            </li>
            <li className="flex items-center mb-2">
              <span className="font-semibold text-black mr-2">Species:</span>
              {character.species}
            </li>
            <li className="flex items-center mb-2">
              <span className="font-semibold text-black mr-2">Gender:</span>
              {character.gender}
            </li>
            <li className="flex items-center mb-2">
              <span className="font-semibold text-black mr-2">Origin:</span>
              {character.origin.name}
            </li>
            <li className="flex items-center mb-2">
              <span className="font-semibold text-black mr-2">Location:</span>
              {character.location.name}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
