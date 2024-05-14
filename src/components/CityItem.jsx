import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CityContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

  // web RTC ? 

export default function CityItem({ city }) {
  const {currentCity} = useCities()
  const {cityName, emoji, date, id, position} = city

  // to={`${id}?lat=${position.lat}&lng=${position.lng}`} do in this line we are sending data as a query string 
  // it can be accessed via any component now. So now we can use this like global state without drilling prop check map component

  // className={`${styles.cityItem} ${currentCity.id === id ? styles['cityItem--active'] : ''}`}  another trick to access active class in modules css

function handleDelete(){
  const currentCity = {
    cityName, 
    id,
  }
  }

  return (
    <li>
      <Link className={`${styles.cityItem} ${currentCity.id === id ? styles['cityItem--active'] : ''}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`} >
      <span className={styles.emoji}>{city.emoji}</span>
      <h3 className={styles.name}>{city.cityName}</h3>
      <time className={styles.date}>{formatDate(city.date)}</time>
      <button className={styles.deleteBtn} onClick={handleDelete}>&times;</button>
      </Link>
    </li>
  );
}
