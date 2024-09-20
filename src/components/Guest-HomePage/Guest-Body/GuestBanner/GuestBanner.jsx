import React from 'react';
import { Carousel } from 'antd';
import './GuestBanner.css'; // Tạo file CSS riêng nếu cần

const contentStyle = {
  height: '480px',
  color: '#fff',
  lineHeight: '480px',
  textAlign: 'center',
  background: '#364d79',
};

const GuestBanner = () => {
  return (
    <div className="guest-banner">
      <Carousel autoplay>
        {/* Slide 1 - Hình ảnh */}
        <div>
          <div style={contentStyle}>
            <img
              src="https://via.placeholder.com/480"
              alt="Product 1"
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
        {/* Slide 2 - Video */}
        <div>
          <div style={contentStyle}>
            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              controls
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
        {/* Slide 3 - Hình ảnh khác */}
        <div>
          <div style={contentStyle}>
            <img
              src="https://via.placeholder.com/480"
              alt="Product 2"
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default GuestBanner;
