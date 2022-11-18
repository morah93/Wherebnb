import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneSpot, editASpot } from "../../store/spots";
import "./editSpot.css";
import { useParams, Redirect, NavLink, useHistory } from "react-router-dom";

const EditSpot = ({ setEditSpotModal, spot }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  // const spot = useSelector((state) => state.spot);
  console.log(spot, 'is it printing')
  const [name, setName] = useState(spot.name || '');
  const [address, setAddress] = useState(spot.address || '');
  const [city, setCity] = useState(spot.city || '');
  const [state, setState] = useState(spot.state || '');
  const [country, setCountry] = useState(spot.country || '');
  const [description, setDescription] = useState(spot.description || '');
  const [price, setPrice] = useState(spot.price || '');
  const [errors, setErrors] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmit, setHasSubmit] = useState(false);
  // const updateSpot = useSelector((state) => state.spot.spot); //useSelector for the state being used to attain info
  //how to edit
  //what to edit
  //use modal?

  useEffect(() => {
    const errors = [];
    if (!name) errors.push("Please enter a name for the spot");
    if (!address) errors.push("Please enter a valid address");
    if (!city) errors.push("Please enter a city");
    if (!state) errors.push("Please enter a state");
    if (!country) errors.push("Please enter a country");
    if (!description) errors.push("Please enter a description for the spot");
    if (!price) errors.push("Please enter a price");
    setValidationErrors(errors);
  }, [address, city, state, country, name, description, price]);

  useEffect(() => {
    dispatch(getOneSpot(spotId));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmit(true);

    const newSpot = {
      address,
      city,
      state,
      country,
      name,
      description,
      price,
    };

    if (!validationErrors.length) {
      let updatedSpot = await dispatch(editASpot(spot.id, newSpot));
      if (updatedSpot) {
        history.push(`/spots/${spot.id}`);
      }
      setEditSpotModal(false);

      setErrors([]);
      return dispatch({ name, description, price }).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors(["Whats the error"]);
  };

  // console.log('edit spot is this printing?')

  return (
    <>
      <div className='editSpotForm'>
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

          <button
            className='confirmChangesButton'
            type='submit'
            onClick={() => {setEditSpotModal(false)}}

          >
            Confirm Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default EditSpot;
