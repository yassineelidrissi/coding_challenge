import React from 'react';

const SectorItem = ({ sector, toggleSector, isSelected }) => {
    return (
        <option className={`item ${isSelected ? 'selected' : ''}`} onClick={() => toggleSector(sector)}>
            {sector}
        </option>
    );
};

export default SectorItem;