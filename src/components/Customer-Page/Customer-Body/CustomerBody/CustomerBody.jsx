import React from 'react'
import CustomerBanner from '../CustomerBanner/CustomerBanner'
import CustomerCompetition from '../CustomerCompetition/CustomerCompetion'
import Introduction from '../../../Guest-HomePage/Guest-Body/Introduction/Introduction'

function CustomerBody() {
  return (
    <div className='Customer-body'>
        <div className='Customer-banner'>
            <CustomerBanner/>
        </div>
        <div className = 'customer-introduce'>
          <Introduction/>
        </div>
        <div className='Customer-competition'>
          <CustomerCompetition/>
        </div>
      
    </div>
  )
}

export default CustomerBody 

