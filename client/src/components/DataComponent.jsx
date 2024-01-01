import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listUsersData, deleteUserData } from './../redux/user/userAcions';

const DataComponent = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const sectorListData = useSelector(state => state.sectorListData);

    const { usersData } = sectorListData;

    useEffect(() => {
        dispatch(listUsersData());
    }, [dispatch]);

    const handleEditClick = (userId) => {
        navigate(`/${userId}`);
    };

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure')) {
            dispatch(deleteUserData(id)).then(() => {
                dispatch(listUsersData());
            });
        }
    }

    return (
        <div className="data-wrapper">
            <h3>Manage my data</h3>
            <div className="data-items">
                {usersData && usersData?.map((user) => (
                    <div key={user._id} className="data-item">
                        <div className="data-content">
                            <p className="data-name">{user?.name}</p>
                            {user?.sectors && user?.sectors.map(sector => (
                                <p className="data-sectors">{sector.name}</p>
                            ))}
                        </div>
                        <div className="data-actions">
                            <button className="edit-btn" onClick={() => handleEditClick(user._id)}>Edit</button>
                            <button className="del-btn" onClick={() => deleteHandler(user._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataComponent;