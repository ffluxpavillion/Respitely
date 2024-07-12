import './Dashboard.scss';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';

export default function Dashboard () {
    const {user} = useContext(UserContext)
    console.log('DASHBOARDUSER==========', user)

  return (
    <div>
      <h1 className='dashboard-header'>Dashboard</h1>
      {!!user ? (<h2 className='dashboard-header'>Hi {user.name}!</h2>) : (<h2 className='dashboard-header'>Loading...</h2>)}
    </div>
  )
}
