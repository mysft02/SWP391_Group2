import React, { useState } from 'react';
import { Button, Form, Input, Select, message, InputNumber } from 'antd';

const { Option } = Select;

function BetForm({
  user,
  koiList = [],
  competition,
  matches,
  selectedKoi,
  setSelectedKoi,
  handlePlaceBet
}) {
  const [betAmount, setBetAmount] = useState(0);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const handleKoiSelect = (value) => {
    const selectedFish = koiList.find(koi => koi.koi_id === value);
    setSelectedKoi(selectedFish);
  };

  const handleMatchSelect = (value) => {
    setSelectedMatch(value);
  };

  const handleBetAmountChange = (value) => {
    setBetAmount(value);
  };

  const handleSubmitBet = () => {
    console.log("Competition Data:", competition);  // In ra toàn bộ đối tượng competition
    console.log("Koi Registrations:", competition.koiRegistrations);  // In ra mảng koiRegistrations
  
    if (!selectedKoi || !selectedMatch || betAmount <= 0) {
      message.error("Vui lòng chọn cá koi, trận đấu và số tiền đặt cược hợp lệ.");
      return;
    }
  
    if (!competition || !competition.koiRegistrations) {
      message.error("Dữ liệu cá koi không hợp lệ.");
      return;
    }
  
    // Tìm kiếm phần tử KoiRegistration tương ứng từ mảng koiRegistrations
    const selectedKoiRegistration = competition.koiRegistrations.find(koi => koi.koi_id === selectedKoi.koi_id);
    
    // Kiểm tra nếu tìm thấy KoiRegistration
    if (!selectedKoiRegistration) {
      message.error("Không tìm thấy cá koi hợp lệ.");
      return;
    }
  
    // Tạo dữ liệu gửi đi trong request body
    const betData = {
      userId: user.user_id,                               // Lấy userId từ user prop
      registrationId: selectedKoiRegistration.registrationId,  // Lấy registrationId từ KoiRegistration đã chọn
      competitionId: selectedKoiRegistration.competition_id,    // Lấy competitionId từ KoiRegistration
      matchId: selectedMatch,                              // Lấy matchId từ state
      koiId: selectedKoi.koi_id,                  // Lấy koi_id từ KoiRegistration
      betAmount: betAmount                                       // Số tiền đặt cược
    };
    console.log("data bet:",betData)

  
    // Gọi hàm handlePlaceBet với betData
    handlePlaceBet(betData);
  };
  
  

  // Kiểm tra và log dữ liệu của `matches`
  console.log("Matches data:", matches);

  return (
    <Form layout="vertical" style={{ marginBottom: '20px' }}>
      <Form.Item label="Họ và tên" required>
        <Input value={user?.full_name} disabled />
      </Form.Item>

      <Form.Item label="Chọn cá koi">
        <Select
          value={selectedKoi?.koi_id || undefined}
          onChange={handleKoiSelect}
          placeholder="Chọn một cá koi"
          style={{ width: '100%' }}
        >
          {koiList && koiList.length > 0 ? (
            koiList.map((koi) => (
              <Option key={koi.koi_id} value={koi.koi_id}>{koi.koi_name}</Option>
            ))
          ) : (
            <Option disabled>No koi available</Option>
          )}
        </Select>
      </Form.Item>

      <Form.Item label="Chọn trận đấu">
        <Select
          value={selectedMatch || undefined}
          onChange={handleMatchSelect}
          placeholder="Chọn trận đấu"
          style={{ width: '100%' }}
        >
          {matches && matches.length > 0 ? (
            matches.map((match) => (
              <Option key={match.match_id} value={match.match_id}>{match.match_id}</Option>
            ))
          ) : (
            <Option disabled>No matches available</Option>
          )}
        </Select>
      </Form.Item>

      <Form.Item label="Số tiền đặt cược" required>
        <InputNumber
          value={betAmount}
          onChange={handleBetAmountChange}
          min={1}
          max={100000}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Button
        type="primary"
        onClick={handleSubmitBet}
        disabled={!selectedKoi || !selectedMatch || betAmount <= 0}
        style={{ marginTop: '10px' }}
      >
        Đặt Cược
      </Button>

      {/* Bỏ countdown và phần kiểm tra canBet */}
    </Form>
  );
}

export default BetForm;
