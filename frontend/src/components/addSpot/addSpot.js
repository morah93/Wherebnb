import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSpot } from "../../store/spots";
import { NavLink, useHistory, useParams } from "react-router-dom";


const AddSpot = (spot) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  const oneSpot = useSelector((state) => state.spot.spot);

  const [name, setName] = useState(spot?.name);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [lat, setLat] = useState(spot?.lat);
  const [lng, setLng] = useState(spot?.lng);
  const [country, setCountry] = useState(spot?.country);
  const [description, setDescription] = useState(spot?.description);
  const [price, setPrice] = useState(spot?.price);
  // const [url, setUrl] = useState(spot?.url);
  const [errors, setErrors] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmit, setHasSubmit] = useState(false);

  useEffect(() => {
    const errors = [];
    if (!name) errors.push("Please enter a name for the spot");
    if (!address) errors.push("Please enter a valid address");
    if (!city) errors.push("Please enter a city");
    if (!state) errors.push("Please enter a state");
    if (!country) errors.push("Please enter a country");
    if (!description) errors.push("Please enter a description for the spot");
    if (!price) errors.push("Please enter a price");
    // if (!url) errors.push("Please enter a url");

    setValidationErrors(errors);
  }, [address, city, state, country, name, description, price]);

  useEffect(() => {
    dispatch(createSpot(spot));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmit(true);
    let lat = 0
    let lng = 0
    const newSpot = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      // url
    };

    if (!validationErrors.length) {
      dispatch(createSpot(newSpot))
        .then(() => {
          history.push(`/`)
          alert("Successful")
        }).catch(() => {
        alert("Failed")
      })


      // setErrors([]);
      // return dispatch(({ name, description, price })).catch(
      //   async (res) => {
      //     const data = await res.json();
      //     if (data && data.errors) setErrors(data.errors);
      //   }
      // );
    }
    // return setErrors(["Whats the error"]);
  };

  return (
    <>
      <div className='newSpotContainer'>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            Name
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Address
            <input
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
          <label>
            City
            <input
              type='text'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <label>
            State
            <input
              type='text'
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </label>
          <label>
            Country
            <input
              type='text'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>
          <label>
            Description
            <input
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Price
            <input
              type='Number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          {/* <label>
            Url
            <input
              type='text'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </label> */}

          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddSpot
