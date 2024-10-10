import React from 'react'
import GuestBanner from '../GuestBanner/GuestBanner'
import GuestNewsCompetition from '../GuestNewsCompetition/GuestNewsCompetition'
import GuestCompetition from '../GuestCompetition/GuestCompetion'
import Introduction from '../Introduction/Introduction'

function GuestBody() {
  return (
    <div className='guest-body'>
        <div className='guest-banner'>
            <GuestBanner/>
        </div>
        <div className='guest-news'>
          <Introduction/>
        </div>
        <div className='guest-competition'>
          <GuestCompetition/>
        </div>
      
    </div>
  )
}

export default GuestBody 

