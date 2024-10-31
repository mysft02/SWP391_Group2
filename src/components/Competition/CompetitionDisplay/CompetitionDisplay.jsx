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
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../data/UserContext"; // Import useUser for accessing user data
import { api } from "../../../config/AxiosConfig";
import "./CompetitionDisplay.css";

function CompetitionDisplay() {
  const [filteredCompetitions, setFilteredCompetitions] = useState([]);
  const { user } = useUser(); // Access the logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await api.get("/api/CompetitionKoi/Get all CompetitionKoi");
        setFilteredCompetitions(response.data);
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };

    fetchCompetitions();
  }, []);

  const handleJoin = (competition) => {
    navigate("/member/detail-competition", { state: { competition } });
  };

  const isUserRegistered = (comp) => {
    return comp.koiRegistrations?.some((registration) => registration.fishKoi.users_id === user.user_id);
  };

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
                <CalendarOutlined /> Start: {new Date(comp.start_time).toLocaleString()}
              </p>
              <p>
                <CalendarOutlined /> End: {new Date(comp.end_time).toLocaleString()}
              </p>
              <p>
                <TagOutlined /> Category: {comp.category.category_name}
              </p>
              <p>
                <BgColorsOutlined /> Color Koi: {comp.category.koiStandard.color_koi}
              </p>
              <p>
                <PictureOutlined /> Pattern Koi: {comp.category.koiStandard.pattern_koi}
              </p>
              <p>
                <ColumnWidthOutlined /> Size Koi: {comp.category.koiStandard.size_koi}
              </p>
              <p>
                <LineHeightOutlined /> Bodyshape Koi: {comp.category.koiStandard.bodyshape_koi}
              </p>
              <p>
                <TagOutlined /> Variety Koi: {comp.category.koiStandard.variety_koi}
              </p>
              <p>
                {comp.category.koiStandard.gender === "Male" ? (
                  <ManOutlined />
                ) : (
                  <WomanOutlined />
                )}{" "}
                Gender: {comp.category.koiStandard.gender}
              </p>
              <Button
                type="primary"
                onClick={() => handleJoin(comp)}
                disabled={!isUserRegistered(comp)} // Button enabled if registered
              >
                {isUserRegistered(comp) ? "Join In" : "Not yet registered"}
              </Button>
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
