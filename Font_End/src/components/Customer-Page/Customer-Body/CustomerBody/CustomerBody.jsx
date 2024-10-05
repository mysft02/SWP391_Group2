import React from 'react'
import CustomerBanner from '../CustomerBanner/CustomerBanner'
import CustomerNewsCompetition from '../CustomerNewsCompetition/CustomerNewsCompetition'
import CustomerCompetition from '../CustomerCompetition/CustomerCompetion'

function CustomerBody() {
  return (
    <div className='Customer-body'>
        <div className='Customer-banner'>
            <CustomerBanner/>
        </div>
        <div className='Customer-news'>
          <CustomerNewsCompetition/>
        </div>
        <div className='Customer-competition'>
          <CustomerCompetition/>
        </div>
      
    </div>
  )
}

export default CustomerBody 

