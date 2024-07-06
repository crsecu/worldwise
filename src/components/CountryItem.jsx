import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>

    // <li className={styles.countryItem}>
    //   <span>💛</span>
    //   <span>Romania</span>
    // </li>
  );
}

export default CountryItem;
