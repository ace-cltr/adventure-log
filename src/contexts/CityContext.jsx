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

  return (
    <CitiesContext.Provider value={{ cities, loading, currentCity, getCity }}>
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
