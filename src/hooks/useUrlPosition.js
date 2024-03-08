import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {

    const [searchParams, setSearchParams] = useSearchParams(); // here useSearchParams is like a state
    
  const mapLat = searchParams.get("lat"); // to get the data from it we have to call the get method then name of the value => ('value')
  const mapLng = searchParams.get("lng");
  return [mapLat, mapLng]
}
