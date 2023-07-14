import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSpot, addSpotImg } from "../../store/spots";
import { NavLink, useHistory, useParams } from "react-router-dom";
import "./addSpot.css";
const AddSpot = ({ setCreateSpotModal }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  // const [lat, setLat] = useState(0);
  // const [lng, setLng] = useState(0);
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [previewImage, setPreviewImage] = useState("");
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
    if (description && description.length < 20) {
      errors.push("Please enter more than 20 characters");
    }
    if (!price) errors.push("Please enter a price");
    if (!previewImage) errors.push("Please enter a url");

    setValidationErrors(errors);
  }, [name, address, city, state, country, description, price, previewImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmit(true);
    let lat = 0;
    let lng = 0;
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
      previewImage,
    };

    console.log(validationErrors);

    if (!validationErrors.length) {
      return dispatch(createSpot(newSpot))
        .then(() => {
          alert("Successful");
          setCreateSpotModal(false);
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
          console.log(errors);
        });
    }
  };

  return (
    <>
      <div className='newSpotForm'>
        <form
          className='newSpotContainer'
          onSubmit={handleSubmit}
        >
          <div className='errorList'>
            <ul>
              {validationErrors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
          <h2 className='h2'>Create Spot</h2>
          <label id='label'>
            Name
            <input
              id='nameTextBox'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label id='label'>
            Address
            <input
              id='addressTextBox'
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
          <label id='label'>
            City
            <input
              id='cityTextBox'
              type='text'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <label id='label'>
            State
            <input
              id='stateTextBox'
              type='text'
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </label>
          <label id='label'>
            Country
            <input
              id='countryTextBox'
              type='text'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>

          <label id='label'>
            Price
            <input
              id='priceTextBox'
              type='Number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>

          <label id='label'>
            Image Url
            <input
              id='urlTextBox'
              type='url'
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
              required
            />
          </label>
          <label id='label'>
            Description
            <input
              id='descriptionbox'
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <div className="buttonDiv">
            <button
              className='submitButton'
              type='submit'
              // onClick={() => history.push("/")}
            >
              Submit
            </button>

            <button
              className='cancelButton'
              onClick={() => {
                setCreateSpotModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddSpot;
