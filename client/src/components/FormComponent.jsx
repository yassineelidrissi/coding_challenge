import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
// import sectors from '../sectors';
import { listSectors, createUserData } from './../redux/user/userAcions';

const FormComponent = ({ selectedSectors, toggleSector }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedSectorIds, setSelectedSectorIds] = useState([]); // Store selected sector IDs
    const [sectorError, setSectorError] = useState('');
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
  
    const dispatch = useDispatch();
  
    const sectorsList = useSelector((state) => state.sectorsList);
    const { sectors } = sectorsList;
  
    useEffect(() => {

      dispatch(listSectors());

    }, [dispatch]);
  
    const handleDropdownClick = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    const handleSectorClick = (sector) => {
      if (selectedSectorIds.includes(sector._id)) {
        setSelectedSectorIds(selectedSectorIds.filter((id) => id !== sector._id));
      } else {
        setSelectedSectorIds([...selectedSectorIds, sector._id]);
      }
    };
  
    const handleRemoveSector = (sectorId) => {
      setSelectedSectorIds(selectedSectorIds.filter((id) => id !== sectorId));
    };
  
    const handleSubmitForm = (data) => {
      if (selectedSectorIds.length === 0) {
        setSectorError('Please select at least one sector.');
        return;
      }
  
      const formData = {
        name: data.name,
        sectors: selectedSectorIds,
      };
  
      dispatch(createUserData(formData));

      reset();

      setSelectedSectorIds([]);

    };

  return (
    <form className="form-wrapper is-active" onSubmit={handleSubmit(handleSubmitForm)}>
      <h3>Enter name and select sectors involved.</h3>
      <div className="inputs-wrapper">
        <div className="name-wrapper">
          <label htmlFor="name-input">Name</label>
          <input id="name-input" type="text" className="name-input" placeholder="ex: John" {...register('name', { required: 'Name is required' })} />
        </div>
        {errors.name && <p className="error-message">{errors.name.message}</p>}

        <div className="sectors-wrapper">
          <div className="search-wrapper" onClick={handleDropdownClick}>
            <div>
              <label>Sectors</label>
              <div className="selected-options">
                {/* Display the selected sectors */}
                {selectedSectorIds.map((id, index) => {
                    const sector = sectors.find((sector) => sector._id === id);
                    return (
                      <span key={id} className="selected">
                        {sector?.name}
                        <span onClick={() => handleRemoveSector(id)} className="remove-sector">×</span>
                      </span>
                    );
                  })}
                {selectedSectors.length === 0 && (
                  <p className="placeholder">Select your options</p>
                )}
              </div>
            </div>

            <div className={`arrow-down ${isDropdownOpen ? 'open' : ''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502" stroke="black" stroke-opacity="0.75" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
          </div>
          {isDropdownOpen && (
            <div className='items-wrapper open'>
              {sectors && sectors?.map((sector) => (
                <div key={sector._id} className={`item`} onClick={() => handleSectorClick(sector)}>
                  {sector.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {sectorError && <p className="error-message">{sectorError}</p>}

        <div className="privacy-checkbox">
          <input type="checkbox" id="privacy-checkbox" {...register('termsAccepted', { required: 'You must accept the terms' })} />
          <label htmlFor="privacy-checkbox">I agree to the terms</label>
        </div>
        {errors.termsAccepted && <p className="error-message">{errors.termsAccepted.message}</p>}

        <button type="submit" className="submit-btn">Save</button>
      </div>
    </form>
  );
};

export default FormComponent;