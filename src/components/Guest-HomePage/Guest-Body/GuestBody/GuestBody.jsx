import React from 'react'
import GuestBanner from '../GuestBanner/GuestBanner'

function GuestBody() {
  return (
    <div className='guest-body'>
        <div className='guest-banner'>
            <GuestBanner/>
        </div>
        <div className='guest-news'>
          <h2>News of Competition</h2>
        </div>
        <div className='guest-competition'>
          <h2>Competition</h2>
        </div>
      
    </div>
  )
}

export default GuestBody 

