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
  LoginOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../data/UserContext";
import { api } from "../../../config/AxiosConfig";
import "./CompetitionDisplay.css";

function CompetitionDisplay() {
  const [filteredCompetitions, setFilteredCompetitions] = useState([]);
  const { user } = useUser();
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
    if (user?.roleId === "R3") {
      navigate("/referee/scoreCompetition", { state: { competition } });
    } else {
      navigate("/member/detail-competition", { state: { competition } });
    }
  };

  const handleBet = (competition) => {
    navigate("/member/bet-competition", { state: { competition } });
  };

  const isUserRegistered = (comp) => {
    if (!user) return true;
    if (user.roleId === "R3") return true;
    return comp.koiRegistrations?.some(
      (registration) =>
        registration.fishKoi.users_id === user.user_id &&
        registration.statusRegistration === "Accepted"
    );
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

              {/* Wrap the buttons in a flex container */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
                <Button
                  type="primary"
                  icon={<LoginOutlined />}
                  onClick={() => handleJoin(comp)}
                  disabled={!isUserRegistered(comp)}
                >
                  {isUserRegistered(comp) ? "Join In" : "Not yet registered"}
                </Button>
                <Button
                  type="default"
                  icon={<DollarOutlined />}
                  onClick={() => handleBet(comp)}
                >
                  Bet
                </Button>
              </div>
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
