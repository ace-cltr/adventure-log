import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

// npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev
// npm command to install eslint in vite

// these BrowserRouter are routes this is where we decide where the page wil jum to on the base of pathName
// and these are only to define where these links will ake you in the base of pathName so for UI there is NavLink and Link that
// defines where to jump based on some UI

const BASE_URL = "http://localhost:9000";

export default function App() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          {/* this index path here set the default route so it will open every time when the page opens first */}

          <Route index element={<Navigate replace to='city' />} />
          <Route path="city" element={<CityList cities={cities} loading={loading} />} />
          <Route path='city/:id' element={<City />} />
          <Route path="countries" element={<CountryList cities={cities} loading={loading} />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
