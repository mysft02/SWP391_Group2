import React from 'react'
import CustomerBanner from '../CustomerBanner/CustomerBanner'
import Introduction from '../../../Guest-HomePage/Guest-Body/Introduction/Introduction'
import IntroduceCompetition from '../../../Guest-HomePage/Guest-Body/IntroduceCompetition/IntroduceCompetition'

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
          <IntroduceCompetition/>
        </div>
      
    </div>
  )
}

export default CustomerBody 

