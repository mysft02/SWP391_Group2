import React, { useEffect, useState } from "react";
import { Button, Card, Tag } from "antd";
import {
  CalendarOutlined,
  InfoCircleOutlined,
  TagOutlined,
  BgColorsOutlined,
  PictureOutlined,
  ColumnWidthOutlined,
  LineHeightOutlined,
  ManOutlined,
  WomanOutlined,
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { api } from "../../../config/AxiosConfig";
import './CompetitionDisplay.css';

function CompetitionDisplay() {
  const [filteredCompetitions, setFilteredCompetitions] = useState([]);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await api.get("/api/CompetitionKoi/Get all CompetitionKoi");
        setFilteredCompetitions(response.data); // Cập nhật state với dữ liệu nhận được từ API
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };

    fetchCompetitions();
  }, []); // Chạy hàm chỉ một lần khi component được mount

  const handleJoin = (competitionId) => {
    console.log(`Joining competition with ID: ${competitionId}`);
  };

  return (
    <div className="competition-container">
      {filteredCompetitions.length > 0 ? (
        <div className="competition-row">
          {filteredCompetitions.map((comp) => (
            <Card
              key={comp.competitionId}
              title={comp.competitionName}
              extra={
                comp.statusCompetition === "Active" ? (
                  <Tag icon={<CheckCircleOutlined />} color="success">
                    Active
                  </Tag>
                ) : (
                  <Tag icon={<StopOutlined />} color="error">
                    Inactive
                  </Tag>
                )
              }
              className="competition-card"
            >
              <p>
                <InfoCircleOutlined /> {comp.competitionDescription}
              </p>
              <p>
                <CalendarOutlined /> Start: {new Date(comp.startTime).toLocaleString()}
              </p>
              <p>
                <CalendarOutlined /> End: {new Date(comp.endTime).toLocaleString()}
              </p>
              <p>
                <TagOutlined /> Category: {comp.koiCategory.category_name}
              </p>
              <p>
                <BgColorsOutlined /> Color Koi: {comp.koiCategory.standard.color_koi}
              </p>
              <p>
                <PictureOutlined /> Pattern Koi: {comp.koiCategory.standard.pattern_koi}
              </p>
              <p>
                <ColumnWidthOutlined /> Size Koi: {comp.koiCategory.standard.size_koi}
              </p>
              <p>
                <LineHeightOutlined /> Bodyshape Koi: {comp.koiCategory.standard.bodyshape_koi}
              </p>
              <p>
                <TagOutlined /> Variety Koi: {comp.koiCategory.standard.variety_koi}
              </p>
              <p>
                {comp.koiCategory.standard.gender === "Male" ? (
                  <ManOutlined />
                ) : (
                  <WomanOutlined />
                )}{" "}
                Gender: {comp.koiCategory.standard.gender}
              </p>
              <Button type="primary" onClick={() => handleJoin(comp.competitionId)}>Join In</Button>
            </Card>
          ))}
        </div>
      ) : (
        <p>No competitions match the filter criteria.</p>
      )}
    </div>
  );
}

export default CompetitionDisplay;
