import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'

export default function Map() {
  const navigate = useNavigate() // this is very useful functionality provided by react-router
  // we use this when we want to send user to any other page without clicking on any button
  // commonly used in forms submission then we re-direct user to dashboard and in our case we will open form component

  const [ searchParams, setSearchParams] = useSearchParams() // here useSearchParams is like a state
  const lat = searchParams.get('lat') // to get the data from it we have to call the get method then name of the value => ('value')
  const lng = searchParams.get('lng')
  return (
    <div className={styles.mapContainer} onClick={()=>navigate('form')}>
        <h1>map</h1>
        <span>{lat}{lng}</span>
        <button onClick={()=>setSearchParams({lat : 23, lng: 33})}>change co-rds</button>
    </div>
  )
}
