import { Carousel } from 'antd';
import slide1 from '../../../../assets/img/slideKoi1.jpg'
import slide2 from '../../../../assets/img/slideKoi2.jpg'
import slide3 from '../../../../assets/img/slideKoi3.jpg'


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
              src={slide1}
              alt="slide1"
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
        {/* Slide 2 - Video */}
        <div>
          <div style={contentStyle}>
            <img
              src={slide2}
              alt="slide2"
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
        {/* Slide 3 - Hình ảnh khác */}
        <div>
          <div style={contentStyle}>
            <img
              src={slide3}
              alt="slide3"
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default GuestBanner;
