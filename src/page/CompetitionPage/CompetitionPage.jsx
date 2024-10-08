import React from 'react'
import { TrophyOutlined} from '@ant-design/icons';
import Competition from '../../components/Competition/Competion';

function CompetitionPage() {
  return (
    <div className='competition-page'>
        <div className='title-competition'>
            <h2>
            <TrophyOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#FFD700' }} />
            Competition
            </h2>
        </div>
        <div className='competition'>
            <Competition/>
        </div>
    </div>
  )
}

export default CompetitionPage
