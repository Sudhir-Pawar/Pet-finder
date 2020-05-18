import React, { FunctionComponent } from "react";
import Pet from "./Pet";
import { Animal } from "@frontendmasters/pet";

interface IProps {
  pets: Animal[];
}

const Results: FunctionComponent<IProps> = ({ pets }) => {
  return (
    <div className="search">
      {console.log(pets)}
      {pets.length === 0 ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => (
          <Pet
            animal={pet.type}
            key={pet.id}
            name={pet.name}
            breed={pet.breeds.primary}
            media={pet.photos}
            id={pet.id}
            location={`${pet.contact.address.city}, ${pet.contact.address.state}`}
          />
        ))
      )}
    </div>
  );
};
export default Results;
