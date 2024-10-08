import React from 'react';
import './FilterNews.css'; // Import CSS

function FilterNews({ selectedRank, setSelectedRank, selectedTime, setSelectedTime, selectedAward, setSelectedAward }) {
  
  return (
    <div className="filter-container">
      <h3>Filter News</h3>
      
      {/* Filter theo Rank */}
      <div>
        <label>Rank</label>
        <select value={selectedRank} onChange={(e) => setSelectedRank(e.target.value)}>
          <option value="">All</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>

      {/* Filter theo Thời gian */}
      <div>
        <label>Time</label>
        <input
          type="date"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        />
      </div>

      {/* Filter theo Giải thưởng */}
      <div>
        <label>Award</label>
        <select value={selectedAward} onChange={(e) => setSelectedAward(e.target.value)}>
          <option value="">All</option>
          <option value="10.000.000 Vnd">10.000.000 Vnd</option>
          <option value="5.000.000 Vnd">5.000.000 Vnd</option>
          <option value="1.000.000 Vnd">1.000.000 Vnd</option>
        </select>
      </div>
    </div>
  );
}

export default FilterNews;
