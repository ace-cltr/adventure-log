import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../contexts/CityContext";
import { useEffect } from "react";
import Spinner from "./Spinner";
import Button from "./Button";
import ButtonBack from "./ButtonBack";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // useParams is used for accessing dynamic parameters from the URL path,
  //  useSearchParams is used for accessing query parameters from the URL query string.

  // const [ searchParams, setSearchParams] = useSearchParams() // here useSearchParams is like a state
  // const lat = searchParams.get('lat') // to get the data from it we have to call the get method then name of the value => ('value')
  // const lng = searchParams.get('lng')

  const { id } = useParams();
  const { currentCity, getCity, loading } = useCities();

  useEffect(() => {
    getCity(id);
  }, [id]);

  // so in this example we got and changed the co-ords that is very useful to set the state in the url and when we share this to someone else
  // it will simply re-direct them to that page because of the state values

  const { cityName, emoji, date, notes } = currentCity;

  if (loading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
}

export default City;
