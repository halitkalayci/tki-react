import Image from 'next/image'
import styles from './page.module.css'

// Component
// Functional Component - Class Based Component
// <div class="x"> </div>

// JSX içerisinde javascript yazmak istediğimizde {} kullanıyoruz
export default function Home() {
  let name = "Halit"; // API isteği?
  // Token'i decode edip?

  let cars = ["BMW", "TOGG", "Mercedes", "Fiat"]


  let clickFunction = () => {
    alert("Butona tıklandı.")
  }
  // forEach
  // map
  // jsx içerisinde iterasyonlar her zaman map ile yapılmalı.
  return (
    <>
      <div>
        Merhaba, hoşgeldiniz {name}
        <div>
          <ul>
            {cars.map(car => <li>{car}</li>)}
          </ul>
        </div>
        <button onClick={() => {alert("Butona tıklandı.")}}>Uyarı</button>
        <button onClick={clickFunction}>Uyarı</button>
      </div>
      <div></div>
    </>
  )
}
