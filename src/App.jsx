import {Appwrite} from "appwrite";
import {useState } from 'react';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState(["country"])
  const [buttons, setButtons] = useState([
    {
      name: "English",
      id: "en"
    },
    {
      name: "Arabic",
      id: "ar"
    },
    {
      name: "Chinese - China",
      id: "zh-cn"
    },
    {
      name: "Slovenian",
      id: "sl"
    },
    {
      name: "Turkish",
      id: "tr"
    },
  ])
  
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
          {
            buttons.map(({name, id}) => (
              <button id={id} onClick={getCountries}>{name}</button>

            ))
          }
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
