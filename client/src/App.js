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
                    <Link to="/" className="button-link">Submit data</Link>
                    <Link to="/data" className="button-link">My data</Link>
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










// import React, { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import FormComponent from './components/FormComponent';
// import DataComponent from './components/DataComponent';
// import EditFormComponent from './components/EditFormComponent';

// const App = () => {
//     const [activeTab, setActiveTab] = useState('form');
//     const [selectedSectors, setSelectedSectors] = useState([]);

//     const toggleSector = (sector) => {
//         setSelectedSectors(prevSelectedSectors =>
//             prevSelectedSectors.includes(sector)
//                 ? prevSelectedSectors.filter(s => s !== sector)
//                 : [...prevSelectedSectors, sector]
//         );
//     };

//     return (
//         <div className="container">
//             <div className="switch-wrapper">
//                 <button onClick={() => setActiveTab('form')} className={activeTab === 'form' ? 'active-switch' : ''}>
//                     Submit data
//                 </button>
//                 <button onClick={() => setActiveTab('data')} className={activeTab === 'data' ? 'active-switch' : ''}>
//                     My data
//                 </button>
//             </div>

//             {activeTab === 'form' && <FormComponent selectedSectors={selectedSectors} toggleSector={toggleSector} />}
//             {activeTab === 'data' && <DataComponent />}
//         </div>
//     );
// };

// export default App;