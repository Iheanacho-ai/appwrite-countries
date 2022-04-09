import {Appwrite} from "appwrite";
import {useState } from 'react';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState(["country"])
  const sdk = new Appwrite();

  sdk
    .setEndpoint('http://localhost/v1') // Your API Endpoint
    .setProject('6251d12c44f38f85595c') // Your project ID
  ;

  
  
  const getCountries = async (e) => {
    try {
      let buttonId = e.target.id
      sdk.setLocale(buttonId)
      let promise = await sdk.locale.getCountries()
      setCountries([])
      promise.countries.map((country)=> setCountries(prevArray => [...prevArray, country.name]))
      
    } catch (error) {
      console.log(error)
      
    }

  }


  

  return (
    <div className="App">
      <div className="app-container">
        <h2>Choose your Language</h2>
        <div className="button-container">
          <button id='en' onClick={getCountries}>English</button>
          <button id='ar' onClick={getCountries}>Arabic</button>
          <button id='zh-cn' onClick={getCountries}>Chinese - China</button>
          <button id='sl' onClick={getCountries}>Slovenian</button>
          <button id='tr' onClick={getCountries}>Turkish</button>

        </div>
        <select name="countries" id="countries-list">
          {
            countries.map((country) => (
              <option value="country">{country}</option>
            ))
          }
        </select>
      </div>
      
    </div>
  );
}

export default App;
