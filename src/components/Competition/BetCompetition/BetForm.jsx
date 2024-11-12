import React from 'react';
import { Button, Form, Input, Select, message } from 'antd';

const { Option } = Select;

function BetForm({ user, koiList, selectedKoi, setSelectedKoi, handlePlaceBet, canBet, countdown }) {
  const handleKoiSelect = (value) => {
    const selectedFish = koiList.find(koi => koi.koi_id === value);
    setSelectedKoi(selectedFish);
  };

  // Since userId, registrationId, koiId are hidden, we are not displaying them
  return (
    <Form layout="vertical" style={{ marginBottom: '20px' }}>
      {/* Only display full name of user */}
      <Form.Item label="Họ và tên" required>
        <Input value={user?.full_name} disabled />
      </Form.Item>

      {/* Display koi selection, without koiId */}
      <Form.Item label="Chọn cá koi">
        <Select 
          value={selectedKoi?.koi_id || undefined} 
          onChange={handleKoiSelect} 
          placeholder="Chọn một cá koi" 
          style={{ width: '100%' }}
        >
          {koiList.map((koi) => (
            <Option key={koi.koi_id} value={koi.koi_id}>
              {koi.koi_name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Button to place bet */}
      <Button 
        type="primary" 
        onClick={handlePlaceBet} 
        disabled={!canBet || !selectedKoi} 
        style={{ marginTop: '10px' }}
      >
        Bet Koi
      </Button>

      {/* Countdown display */}
      <p style={{ color: canBet ? 'green' : 'red', marginTop: '10px' }}>
        {countdown}
      </p>
    </Form>
  );
}

export default BetForm;
