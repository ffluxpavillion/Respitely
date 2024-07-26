import './Profile.scss';
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AddMealForm from '../../forms/AddMealForm';

export default function Profile() {
  const { user, isAuthenticated } = useAuth0();

  console.log('USER=========', user);
  return (
    <>
      <div className='profile-section'>
      <h1 className='dashboard-header'>PROFILE</h1>

      {isAuthenticated && (
        <div>
          { user.picture && <img src={user.picture} alt={user.name} />}
          <h2>Welcome, {user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
      <AddMealForm />
      </div>
    </>
  );
}
