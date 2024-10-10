import React, { useRef, useState } from 'react';
import './Introduction.css';
import { ArrowRightOutlined, SoundOutlined } from '@ant-design/icons'; // Import các icon Ant Design
import koi from '../../../../assets/video/Koi Fish - 鯉 - 4K Ultra HD.mp4';
import { Button } from 'antd';

function Introduction() {
  const videoRef = useRef(null); // Tạo ref cho video
  const [isMuted, setIsMuted] = useState(true); // Trạng thái âm thanh

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted; // Đổi trạng thái âm thanh
      setIsMuted(!isMuted); // Cập nhật trạng thái
    }
  };

  return (
    <div className='introduction-koi'>
      <div className='introduce'>
        <h2 className="h2-animation">Welcome to KOI Competition</h2>
        <h4 className="h4-animation">
          Welcome to the KOI Competition – an exciting platform where everyone can participate in thrilling contests! 
          Join the competition, place your bets, and stand a chance to win amazing rewards. Showcase your skills and enjoy the adrenaline rush as you compete for glory and prizes. 
          Let the games begin!
        </h4>
        <Button href="/news" className="news-link-animationNews">
          <ArrowRightOutlined style={{ color: '#FFD700' }} /> 
          <h5>Sign up for the latest news and register for the Koi Competition!</h5>
        </Button>
        {/* Nút bật/tắt âm thanh với icon */}

      </div>
      <div className='introduce-video'>
        <video 
          ref={videoRef} // Gán ref cho video
          autoPlay 
          loop 
          muted={isMuted} // Đặt trạng thái âm thanh
          style={{ width: '100%', height: '100%', borderRadius: '8px' }} // Tùy chỉnh style nếu cần
        >
          <source src={koi} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button 
          onClick={toggleMute} 
          style={{ marginTop: '10px', border: 'none', background: '#333', color: '#FFD700', cursor: 'pointer' }}
        >
          {isMuted ? <SoundOutlined /> : <SoundOutlined />}
        </button>
      </div>
    </div>
  );
}

export default Introduction;
