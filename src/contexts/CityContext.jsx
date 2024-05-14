import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();
function CityContext({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/city`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("there was an error fetching data");
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/city/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("there was an error fetching data");
    } finally {
      setLoading(false);
    }
  }

  async function addNewCity(newCity) {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/city`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch {
      alert("there was an error adding new city");
    } finally {
      setLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/city/${id}`, {
        method: "DELETE",
      });
      await res.json();
      setCities((cities) => cities.filter((city)=>city.id !== id));
    } catch {
      alert("there was an while deleting city");
    } finally {
      setLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, loading, currentCity, getCity, addNewCity, deleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// custom hook so we don't have to import or write useContext again and again
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Context custom hook is being used in wrong place");
  return context;
}

export { CityContext, useCities };
