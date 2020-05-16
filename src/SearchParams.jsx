import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from "./Results";
import useDropdown from "./useDropdown";
import ThemeContext from "./ThemeContext";

export default function SearchParams() {
  const [location, setLocation] = useState("seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "Dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });

    setPets(animals);
  }

  useEffect(() => {
    setBreeds([]);
    setBreed("");
    pet
      .breeds(animal)
      .then(({ breeds: apiBreeds }) => {
        const breedNames = apiBreeds.map(({ name }) => name);
        setBreeds(breedNames);
      })
      .catch(console.error);
  }, [animal, setBreeds, setBreed]);

  return (
    <div className="search-params">
      <h1>{location}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">Location</label>
        <input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="location"
        />
        <AnimalDropdown />
        <BreedDropdown />
        <button style={{ backgroundColor: theme }} type="submit">
          Submit
        </button>
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="mediumorchid">Medium orchid</option>
            <option value="chartreuse">Chart Reuse</option>
          </select>
        </label>
      </form>
      <Results pets={pets}></Results>
    </div>
  );
}
