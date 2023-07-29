import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [searchQuery, setsearchQuery] = useState("");
  const [location, setlocation] = useState({});
  const [map, setMap] = useState("");

  function handleSearch(event) {
    //console.log("location found")
    setsearchQuery(event.target.value);
    console.log(searchQuery);
  }

  async function getLocation(event) {
    try {
      event.preventDefault();
      event.target.input.value = "";
      const API = `GET https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=SEARCH_STRING&format=json`;
      console.log(API);
      const res = await axios.get(API);
      setlocation(res.data[0]);
      handleMap(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  }
  function handleMapData(data) {
    const API = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${data.lat},${data.lon}&zoom=9`;
    setMap(API);
  }

  return (
    <div className="App">
      <form onSubmit={getLocation}>
        <input
          type="text"
          placeholder="search for city"
          onChange={handleSearch}
          name="input"
        />
        <button className="butt1" type="submit">
          Explore
        </button>
      </form>
    </div>
  );
}

export default App;
