import React, { useState } from 'react';
import { Button, Form, Input, Select, message, InputNumber } from 'antd';

const { Option } = Select;

function BetForm({
  user,
  koiList = [],  // List of koi available for the user
  competition,  // Competition data
  matches,  // List of matches
  handlePlaceBet,  // Function to place bet
}) {
  const [betAmount, setBetAmount] = useState(0);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedKoiId, setSelectedKoiId] = useState(null); // Only store koi_id

  const handleKoiSelect = (value) => {
    setSelectedKoiId(value); // Store only koi_id
  };

  const handleMatchSelect = (value) => {
    setSelectedMatch(value);
  };

  const handleBetAmountChange = (value) => {
    setBetAmount(value);
  };

  const handleSubmitBet = () => {
    console.log("Competition Data:", competition);
    console.log("Koi Registrations:", competition.koiRegistrations);  // Display koiRegistrations array
  
    if (!selectedKoiId || !selectedMatch || betAmount <= 0) {
      message.error("Vui lòng chọn cá koi, trận đấu và số tiền đặt cược hợp lệ.");
      return;
    }
  
    if (!competition || !competition.koiRegistrations) {
      message.error("Dữ liệu cá koi không hợp lệ.");
      return;
    }
  
    // Find the corresponding KoiRegistration
    const selectedKoiRegistration = competition.koiRegistrations.find(koi => koi.koi_id === selectedKoiId);
    
    if (!selectedKoiRegistration) {
      message.error("Không tìm thấy cá koi hợp lệ.");
      return;
    }
  
    // Create bet data to send in the request
    const betData = {
      userId: user.user_id,
      registrationId: selectedKoiRegistration.registrationId,  // registrationId from selected koi registration
      competitionId: selectedKoiRegistration.competition_id,    // competitionId from selected koi registration
      matchId: selectedMatch,
      koiId: selectedKoiRegistration.koi_id,                  // koi_id from selected koi registration
      betAmount: betAmount,
    };
    console.log("Bet Data:", betData);
  
    // Call handlePlaceBet with the bet data
    handlePlaceBet(betData);
  };

  return (
    <Form layout="vertical" style={{ marginBottom: '20px' }}>
      <Form.Item label="Họ và tên" required>
        <Input value={user?.full_name} disabled />
      </Form.Item>

      {/* Koi Selection - Displaying koi registered for the competition */}
      <Form.Item label="Chọn cá koi">
        <Select
          value={selectedKoiId || undefined}
          onChange={handleKoiSelect}
          placeholder="Chọn một cá koi"
          style={{ width: '100%' }}
        >
          {competition && competition.koiRegistrations && competition.koiRegistrations.length > 0 ? (
            competition.koiRegistrations.map((registration) => (
              <Option key={registration.koi_id} value={registration.koi_id}>
                {registration.fishKoi.koi_name} 
              </Option>
            ))
          ) : (
            <Option disabled>No koi available</Option>
          )}
        </Select>
      </Form.Item>

      {/* Match Selection */}
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

      {/* Bet Amount */}
      <Form.Item label="Số tiền đặt cược" required>
        <InputNumber
          value={betAmount}
          onChange={handleBetAmountChange}
          min={1}
          max={100000}
          style={{ width: '100%' }}
        />
      </Form.Item>

      {/* Place Bet Button */}
      <Button
        type="primary"
        onClick={handleSubmitBet}
        disabled={!selectedKoiId || !selectedMatch || betAmount <= 0}
        style={{ marginTop: '10px' }}
      >
        Đặt Cược
      </Button>
    </Form>
  );
}

export default BetForm;
