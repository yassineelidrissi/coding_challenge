import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listSectors, updateUserData, listUserDataDetails } from './../redux/user/userAcions';

const EditFormComponent = ({ selectedSectors, toggleSector }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [selectedSectorIds, setSelectedSectorIds] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [sectorError, setSectorError] = useState('');
    const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
    } = useForm();

    const sectorsList = useSelector((state) => state.sectorsList);
    const { sectors } = sectorsList;

    const sectorDetails = useSelector(state => state.sectorDetails);

    const { sector } = sectorDetails;

    useEffect(() => {
        dispatch(listSectors());
        if (!sector || sector._id !== id) {
            dispatch(listUserDataDetails(id));
        } else {
            setValue('name', sector.name);
            setSelectedSectorIds(sector.sectors.map((sector) => sector._id));
        }
    }, [dispatch, id, sector, setValue]);
  
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

    const onSubmit = data => {
        const updatedData = {
            name: data.name,
            sectors: selectedSectorIds,
            _id: id
        };
        dispatch(updateUserData(updatedData));

        reset();

        setSelectedSectorIds([]);

    };

    return (
        <form className="form-wrapper is-active" onSubmit={handleSubmit(onSubmit)}>
      <h3>Update Your Data.</h3>
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
                {selectedSectorIds.length === 0 && (
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
              {Array.isArray(sectors) && sectors?.map((sector) => (
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

        <button type="submit" className="submit-btn" style={{ width: '100%' }}><svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5166 1.66699H6.48327C4.70827 1.66699 3.2666 3.11699 3.2666 4.88366V16.6253C3.2666 18.1253 4.3416 18.7587 5.65827 18.0337L9.72493 15.7753C10.1583 15.5337 10.8583 15.5337 11.2833 15.7753L15.3499 18.0337C16.6666 18.767 17.7416 18.1337 17.7416 16.6253V4.88366C17.7333 3.11699 16.2916 1.66699 14.5166 1.66699Z" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.4917 9.16634L9.7417 10.4163L13.075 7.08301" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg> Update</button>

      </div>
    </form>
    );
};

export default EditFormComponent;