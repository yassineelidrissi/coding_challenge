import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FormComponent from './components/FormComponent';
import DataComponent from './components/DataComponent';
import EditFormComponent from './components/EditFormComponent';

const App = () => {
    const [selectedSectors, setSelectedSectors] = useState([]);

    const toggleSector = (sector) => {
        setSelectedSectors(prevSelectedSectors =>
            prevSelectedSectors.includes(sector)
                ? prevSelectedSectors.filter(s => s !== sector)
                : [...prevSelectedSectors, sector]
        );
    };

    return (
        <Router>
            <div className="container">
                <div className="switch-wrapper">
                    <Link style={{ textDecoration: 'none', textAlign: 'center' }} to="/" className="button-link submit-data">Submit data</Link>
                    <Link style={{ textDecoration: 'none', textAlign: 'center' }} to="/data" className="button-link my-data">My data</Link>
                </div>

                <Routes>
                    <Route path="/" element={<FormComponent selectedSectors={selectedSectors} toggleSector={toggleSector} />} />
                    <Route path="/data" element={<DataComponent />} />
                    <Route path="/:id" element={<EditFormComponent selectedSectors={selectedSectors} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;