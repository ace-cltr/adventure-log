import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

export default function CountryList({ cities, loading }) {
  if (loading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add your first city by clicking on the map" />;

  // so this is confusing let's break it down first we reduce cities array to some value which does not have duplicate country
  // in that we check for if the current val of arr does not contain country as the cities arr then we add those value to arr
  // and if does contain them  then simply return the array unchanged so we won't duplicate country
  // it's hard I know so look it up on chatGPT or somewhere...
    
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((countries) => (
        <CountryItem country={countries} key={countries.country} />
      ))}
    </ul>
  );
}
