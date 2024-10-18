import React from 'react'
import ManagerCompetition from '../../../components/Manager-page/Manager-body/Competition/ManagerCompetition'
import Category from '../../../components/Manager-page/Manager-body/Competition/Category'
import KoiStandard from '../../../components/Manager-page/Manager-body/Competition/KoiStandard'

function CompetitionPage() {
  return (
    <div className='management-competition'>
      <div className='Competition'>
        <ManagerCompetition/>
      </div>
      <div className='Category'>
        <Category/>
      </div>
      <div className='KoiStandard'>
        <KoiStandard/>
      </div>
    </div>
  )
}

export default CompetitionPage 
