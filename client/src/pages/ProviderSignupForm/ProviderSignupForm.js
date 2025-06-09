import './ProviderSignupForm.scss';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef, useContext } from 'react';


export default function ProviderSignupForm() {
  const navigate = useNavigate();
  const [mealOptions, setMealOptions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    orgName: '',
    email: '',
    phone: '',
    website: '',
    mealId: '',
    additionalMessage: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post((`${process.env.REACT_APP_BACKEND_URL}/api/v1/toronto/provider-requests`), data, {
        headers: { 'Content-Type': 'application/json' },
        params: { city: 'toronto'}
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success('Access request submitted successfully!');
        setData({
          firstName: '',
          lastName: '',
          orgName: '',
          email: '',
          phone: '',
          website: '',
          mealId: '',
          additionalMessage: '',
        });
        navigate('/login');
        console.log('Submitted data:', response.data)
      }
    } catch (error) {
      toast.error('Failed to submit access request. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/toronto/meals`);
        const meals = res.data.meals || res.data;
        setMealOptions(meals);
      } catch (err) {
        console.error('Failed to fetch meals', err);
      }
    };

    fetchMeals();
  }, []);


  return (
    <section className='register-section'>
      <div className='register-upper'>
        <h1 className='register-header'>PROVIDER REGISTRATION PAGE</h1>
        <p className='register-text'>
          Please complete the form below to request access. Once verified, you can add or manage your service.
        </p>
      </div>

      <form className='register-form' onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type='text'
          className='register-input'
          value={data.firstName}
          onChange={(e) => setData({ ...data, firstName: e.target.value })}
        />

        <label>Last Name:</label>
        <input
          type='text'
          className='register-input'
          value={data.lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
        />

        <label>Organization Name:</label>
        <input
          type='text'
          className='register-input'
          value={data.orgName}
          onChange={(e) => setData({ ...data, orgName: e.target.value })}
        />

        <label>Organization Email:</label>
        <input
          type='email'
          className='register-input'
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <label>Phone Number:</label>
        <input
          type='tel'
          className='register-input'
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />

        <label>Website (if available):</label>
        <input
          type='url'
          className='register-input'
          value={data.website}
          onChange={(e) => setData({ ...data, website: e.target.value })}
        />

        <label>Which meal service are you affiliated with?</label>
        <select
          className='register-input'
          value={data.mealId}
          onChange={(e) => setData({ ...data, mealId: e.target.value })}
        >
          <option value=''>-- Select a service --</option>
          {[...mealOptions]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((meal) => (
              <option key={meal.id} value={meal.id}>
                {meal.name} – {meal.address.street}
              </option>
          ))}
        </select>

        <label>Additional Message (optional):</label>
        <textarea
          className='register-input'
          value={data.additionalMessage}
          onChange={(e) => setData({ ...data, additionalMessage: e.target.value })}
        />

        <button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>

      </form>
    </section>
  );
}
