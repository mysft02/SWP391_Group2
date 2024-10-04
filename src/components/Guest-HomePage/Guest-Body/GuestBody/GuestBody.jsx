import React from 'react'
import GuestBanner from '../GuestBanner/GuestBanner'
import GuestNewsCompetition from '../GuestNewsCompetition/GuestNewsCompetition'
import GuestCompetition from '../GuestCompetition/GuestCompetion'

function GuestBody() {
  return (
    <div className='guest-body'>
        <div className='guest-banner'>
            <GuestBanner/>
        </div>
        <div className='guest-news'>
          <GuestNewsCompetition/>
        </div>
        <div className='guest-competition'>
          <GuestCompetition/>
        </div>
      
    </div>
  )
}

export default GuestBody 

