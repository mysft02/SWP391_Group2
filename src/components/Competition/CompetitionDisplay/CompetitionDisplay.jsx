import React from "react";
import { Card, Tag } from "antd";
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
import './CompetitionDisplay.css'
function CompetitionDisplay({ filteredCompetitions }) {
  return (
    <div className="competition-container">
      {filteredCompetitions.length > 0 ? (
        <div className="competition-row">
          {filteredCompetitions.map((comp) => (
            <Card
              key={comp.competition_id}
              title={comp.competition_name}
              extra={
                comp.status_competition === "Active" ? (
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
                <InfoCircleOutlined /> {comp.competition_description}
              </p>
              <p>
                <CalendarOutlined /> Start: {comp.start_time}
              </p>
              <p>
                <CalendarOutlined /> End: {comp.end_time}
              </p>
              <p>
                <TagOutlined /> Category: {comp.category_name}
              </p>
              <p>
                <BgColorsOutlined /> Color Koi: {comp.color_koi}
              </p>
              <p>
                <PictureOutlined /> Pattern Koi: {comp.pattern_koi}
              </p>
              <p>
                <ColumnWidthOutlined /> Size Koi: {comp.size_koi}
              </p>
              <p>
                <LineHeightOutlined /> Bodyshape Koi: {comp.bodyshape_koi}
              </p>
              <p>
                <TagOutlined /> Variety Koi: {comp.variety_koi}
              </p>
              <p>
                {comp.gender === "Male" ? (
                  <ManOutlined />
                ) : (
                  <WomanOutlined />
                )}{" "}
                Gender: {comp.gender}
              </p>
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
