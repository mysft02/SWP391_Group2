import React, { useState } from "react";
import { Row, Col } from "antd";
import FilterCompetitions from "../FilterCompetition/FilterCompetition";
import CompetitionDisplay from "../CompetitionDisplay/CompetitionDisplay";

const competitions = [
  {
    competition_id: 1,
    competition_name: "Koi Competition Spring 2024",
    competition_description: "A major competition for koi enthusiasts",
    start_time: "2024-03-15T09:00:00",
    end_time: "2024-03-20T18:00:00",
    status_competition: "Active",
    category_name: "A",
    color_koi: "Red",
    pattern_koi: "Pattern1",
    size_koi: "Small",
    bodyshape_koi: "Oval",
    variety_koi: "Variety1",
    gender: "Male"
  },
  {
    competition_id: 2,
    competition_name: "Autumn Koi Showcase",
    competition_description: "A seasonal showcase of the best koi fish",
    start_time: "2024-09-10T10:00:00",
    end_time: "2024-09-12T17:00:00",
    status_competition: "scheduled",
    category_name: "B",
    color_koi: "Blue",
    pattern_koi: "Pattern2",
    size_koi: "Medium",
    bodyshape_koi: "Round",
    variety_koi: "Variety2",
    gender: "Female"
  },
  {
    competition_id: 3,
    competition_name: "Autumn Koi Showcase",
    competition_description: "A seasonal showcase of the best koi fish",
    start_time: "2024-09-10T10:00:00",
    end_time: "2024-09-12T17:00:00",
    status_competition: "scheduled",
    category_name: "C",
    color_koi: "Blue",
    pattern_koi: "Pattern2",
    size_koi: "Medium",
    bodyshape_koi: "Round",
    variety_koi: "Variety2",
    gender: "Female"
  },
  {
    competition_id: 4,
    competition_name: "Autumn Koi Showcase",
    competition_description: "A seasonal showcase of the best koi fish",
    start_time: "2024-09-10T10:00:00",
    end_time: "2024-09-12T17:00:00",
    status_competition: "scheduled",
    category_name: "C",
    color_koi: "Blue",
    pattern_koi: "Pattern2",
    size_koi: "Medium",
    bodyshape_koi: "Round",
    variety_koi: "Variety2",
    gender: "Female"
  },
  {
    competition_id: 5,
    competition_name: "Autumn Koi Showcase",
    competition_description: "A seasonal showcase of the best koi fish",
    start_time: "2024-09-10T10:00:00",
    end_time: "2024-09-12T17:00:00",
    status_competition: "scheduled",
    category_name: "C",
    color_koi: "White",
    pattern_koi: "Pattern2",
    size_koi: "Medium",
    bodyshape_koi: "Round",
    variety_koi: "Variety2",
    gender: "Female"
  },
  {
    competition_id: 6,
    competition_name: "Autumn Koi Showcase",
    competition_description: "A seasonal showcase of the best koi fish",
    start_time: "2024-09-10T10:00:00",
    end_time: "2024-09-12T17:00:00",
    status_competition: "scheduled",
    category_name: "C",
    color_koi: "White",
    pattern_koi: "Pattern2",
    size_koi: "Medium",
    bodyshape_koi: "Round",
    variety_koi: "Variety2",
    gender: "Female"
  }
];

function Competition() {
  const [filteredCompetitions, setFilteredCompetitions] = useState(competitions);

  return (
    <div style={{ display: "flex"}}>
      {/* Bộ lọc nằm bên trái, chiếm 1/4 chiều rộng */}
        <FilterCompetitions competitions={competitions} onFilter={setFilteredCompetitions} />


      {/* Hiển thị danh sách cuộc thi nằm bên phải, chiếm 3/4 chiều rộng */}
        <CompetitionDisplay filteredCompetitions={filteredCompetitions} />
    </div>
  );
}

export default Competition;
