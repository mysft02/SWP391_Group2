import React from 'react'
import GuestBanner from '../GuestBanner/GuestBanner'
import GuestCompetition from '../GuestCompetition/GuestCompetition'

function GuestBody() {
  return (
    <div className='guest-body'>
        <div className='guest-banner'>
            <GuestBanner/>
        </div>
        <div className='guest-news'>
          <GuestCompetition/>
        </div>
        <div className='guest-competition'>
          <h2>Competition</h2>
        </div>
      
    </div>
  )
}

export default GuestBody 

