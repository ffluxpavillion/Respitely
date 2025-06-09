import './ProviderSignupForm.scss';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef, useContext } from 'react';


export default function ProviderSignupForm() {
  const navigate = useNavigate();
  const [mealOptions, setMealOptions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
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

  const validateForm = () => {
    const errors = {};
    if (!data.firstName.trim()) errors.firstName = 'First name is required';
    if (!data.lastName.trim()) errors.lastName = 'Last name is required';
    if (!data.orgName.trim()) errors.orgName = 'Organization name is required';
    if (!data.email.trim()) errors.email = 'Email is required';
    if (!data.phone.trim()) errors.phone = 'Phone number is required';
    if (!data.mealId) errors.mealId = 'Select a meal service';
    return errors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error('Please fix the highlighted fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/toronto/provider-requests`, data, {
        headers: { 'Content-Type': 'application/json' },
        params: { city: 'toronto' }
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success('Request submitted successfully!');
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
        setFormErrors({});
        navigate('/login');
      }
    } catch (error) {
      toast.error('Failed to submit request. Please try again.');
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
          Please complete the form below to request access. Once verified, you can manage your service details.
        </p>
      </div>
      <br />

      <form className='register-form' onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type='text'
          placeholder='First name'
          className={`register-input ${formErrors.firstName ? 'input-error' : ''}`}
          value={data.firstName}
          onChange={(e) => setData({ ...data, firstName: e.target.value })}
        />
        {formErrors.firstName && <span className='error-text'>{formErrors.firstName}</span>}

        <label>Last Name:</label>
        <input
          type='text'
          placeholder='Last name'
          className={`register-input ${formErrors.firstName ? 'input-error' : ''}`}
          value={data.lastName}
          onChange={(e) => setData({ ...data, lastName: e.target.value })}
        />
        {formErrors.lastName && <span className='error-text'>{formErrors.lastName}</span>}

        <label>Organization Name:</label>
        <input
          type='text'
          placeholder='Organization name'
          className={`register-input ${formErrors.firstName ? 'input-error' : ''}`}
          value={data.orgName}
          onChange={(e) => setData({ ...data, orgName: e.target.value })}
        />
        {formErrors.orgName && <span className='error-text'>{formErrors.orgName}</span>}

        <label>Organization Email:</label>
        <input
          type='email'
          placeholder='Organization email'
          className={`register-input ${formErrors.firstName ? 'input-error' : ''}`}
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        {formErrors.email && <span className='error-text'>{formErrors.email}</span>}

        <label>Phone Number:</label>
        <input
          type='tel'
          placeholder='Phone number'
          className={`register-input ${formErrors.firstName ? 'input-error' : ''}`}
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />
        {formErrors.phone && <span className='error-text'>{formErrors.phone}</span>}

        <label>Website (if available):</label>
        <input
          type='url'
          placeholder='Website'
          className='register-input'
          value={data.website}
          onChange={(e) => setData({ ...data, website: e.target.value })}
        />

        <label>Which meal service are you affiliated with?</label>
        <select
          className={`register-input ${formErrors.firstName ? 'input-error' : ''}`}
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
        {formErrors.mealId && <span className='error-text'>{formErrors.mealId}</span>}

        <label>Additional Message (optional):</label>
        <textarea
          className='register-input'
          placeholder='Add additional details here...'
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
