// MatchTable.js
import React from 'react';
import { Table } from 'antd';

function MatchTable({ matches, koiList }) {
  const matchColumns = [
    { title: 'Match ID', dataIndex: 'match_id', key: 'match_id' },
    {
      title: 'Koi Name 1',
      dataIndex: 'firstKoi',
      key: 'firstKoi.koi_name',
      render: (firstKoi) => firstKoi ? firstKoi.koi_name : 'Không có thông tin',
    },
    {
      title: 'Koi Name 2',
      dataIndex: 'secondKoi',
      key: 'secondKoi.koi_name',
      render: (secondKoi) => secondKoi ? secondKoi.koi_name : 'Không có thông tin',
    },
    {
      title: 'Result',
      key: 'result',
      render: (_, record) => {
        const [koiId, score] = record.result.split('_');
        const koi = koiList.find(koi => koi.koi_id === koiId);

        return (
          <>
            <p><strong>Koi Name:</strong> {koi ? koi.koi_name : 'Không có thông tin'}</p>
            <p><strong>Score:</strong> {score || 'Chưa có điểm'}</p>
          </>
        );
      },
    },
  ];

  return (
    <Table
      columns={matchColumns}
      dataSource={matches}
      pagination={false}
      style={{ marginTop: '20px' }}
      title={() => <strong>Bảng thi đấu</strong>}
    />
  );
}

export default MatchTable;
