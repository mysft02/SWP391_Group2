import React from 'react'
import GuestCompetition from '../GuestCompetition/GuestCompetion'
import { ArrowRightOutlined,TrophyOutlined} from '@ant-design/icons'; // Import các icon Ant Design
import './IntroduceCompetition.css'
import { Button } from 'antd';
function IntroduceCompetition() {
  return (
    <div className='introduce-Competition'>
        <h1 className='title-animation'>
                <TrophyOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#FFD700' }} />
                Competition
        </h1>
        <div className='content-introduce'>
        <div className='competition'>
            <h2 className='h2-animationCompetition'>
                Join in  the world of elegance and precision where the most magnificent Koi fish take center stage!
            </h2>
            <h4 className='h4-animationCompetition'>
                In this captivating competition, only the finest Koi, with their vibrant colors and graceful movements, can rise to glory. 
                Place your bets wisely, as beauty and perfection will determine the champions!
            </h4>
            <Button href="/competition" className="news-link-animationCompetition">
                <ArrowRightOutlined style={{ color: '#FFD700' }} /> 
                <h5>join in competititon and bet to get award! </h5>
            </Button>
        </div>
        <div className='competition-card'>
            <GuestCompetition/>
        </div>
        </div>
    </div>

  )
}

export default IntroduceCompetition
