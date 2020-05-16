import React from "react";
import Pet from "./Pet";

function Results({ pets }) {
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
          ></Pet>
        ))
      )}
    </div>
  );
}
export default Results;
