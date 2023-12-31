import React, { useState } from 'react';
import FormComponent from './components/FormComponent';
import DataComponent from './components/DataComponent';

const App = () => {
    const [activeTab, setActiveTab] = useState('form');
    const [selectedSectors, setSelectedSectors] = useState([]);

    const toggleSector = (sector) => {
        setSelectedSectors(prevSelectedSectors =>
            prevSelectedSectors.includes(sector)
                ? prevSelectedSectors.filter(s => s !== sector)
                : [...prevSelectedSectors, sector]
        );
    };

    return (
        <div className="container">
            <div className="switch-wrapper">
                <button onClick={() => setActiveTab('form')} className={activeTab === 'form' ? 'active-switch' : ''}>
                    Submit data
                </button>
                <button onClick={() => setActiveTab('data')} className={activeTab === 'data' ? 'active-switch' : ''}>
                    My data
                </button>
            </div>

            {activeTab === 'form' && <FormComponent selectedSectors={selectedSectors} toggleSector={toggleSector} />}
            {activeTab === 'data' && <DataComponent />}
        </div>
    );
};

export default App;