import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import FilterCompetitions from "../FilterCompetition/FilterCompetition";
import CompetitionDisplay from "../CompetitionDisplay/CompetitionDisplay";
import { api } from "../../../config/AxiosConfig";

function Competition() {
  const [competitions, setCompetition] = useState([]); // Khởi tạo là một mảng rỗng
  const [filteredCompetitions, setFilteredCompetitions] = useState([]); // Khởi tạo là một mảng rỗng

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await api.get("/api/CompetitionKoi/Get all CompetitionKoi");
        setCompetition(response.data);
        setFilteredCompetitions(response.data); // Cập nhật filteredCompetitions sau khi nhận được dữ liệu
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };

    fetchCompetitions();
  }, []); // Chỉ gọi API một lần khi component mount

  return (
    <div style={{ display: "flex" }}>
      {/* Bộ lọc nằm bên trái, chiếm 1/4 chiều rộng */}
      <FilterCompetitions competitions={competitions} onFilter={setFilteredCompetitions} />

      {/* Hiển thị danh sách cuộc thi nằm bên phải, chiếm 3/4 chiều rộng */}
      <CompetitionDisplay filteredCompetitions={filteredCompetitions} />
    </div>
  );
}

export default Competition;
