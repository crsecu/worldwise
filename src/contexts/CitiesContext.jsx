import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = "http://localhost:9000";

// create Context
const CitiesContext = createContext();

// create Provider component
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        alert("THERE IS AN ERROR ", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      alert("THERE IS AN ERROR ", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        // Adding method type
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify(newCity),
        // Adding headers to the request
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setCities((cities) => [...cities, data]);
    } catch (err) {
      alert("THERE IS AN ERROR ", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, createCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

//Custom hook that consumes CitiesContext
function useCities() {
  //Here we pass in the context from which we want to read the data
  const citiesContextValue = useContext(CitiesContext);
  if (citiesContextValue === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return citiesContextValue;
}

export { CitiesProvider, useCities };
