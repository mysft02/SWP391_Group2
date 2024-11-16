import React from "react";
import { Table } from "antd";

function HistoryBet() {
  // Dữ liệu mẫu
  const dataSource = [
    {
      key: "1",
      date: "2024-11-10",
      game: "Poker",
      amount: "$100",
      result: "Win",
    },
    {
      key: "2",
      date: "2024-11-12",
      game: "Roulette",
      amount: "$50",
      result: "Lose",
    },
    {
      key: "3",
      date: "2024-11-13",
      game: "Blackjack",
      amount: "$75",
      result: "Win",
    },
  ];

  // Cấu trúc các cột
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Game",
      dataIndex: "game",
      key: "game",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
      render: (text) => (
        <span style={{ color: text === "Win" ? "green" : "red" }}>{text}</span>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>History Bet</h2>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default HistoryBet;
