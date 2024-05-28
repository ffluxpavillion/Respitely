import React from 'react'
import './MealsCard.scss'
import MealsMap from '../MealsMap/MealsMap'

export default function MealsCard () {
  return (
    <>
      <section className='meals-section' id='dropInMeals'>
        <div className='meals-section__upper'>
          <h3 className='meals-section__header'>
            Drop-In Meals in Toronto
          </h3>
        </div>
        <div className='meals-section__lower'>
          <MealsMap />
        </div>
        </section>

    </>
  )
}
