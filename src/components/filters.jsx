import React, { useState } from "react";

export const Filters = ({
  setCommitedStartDate,
  setCommitedEndDate,
  setSearchTerm,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleApply = () => {
    setCommitedStartDate(startDate);
    setCommitedEndDate(endDate);
    setIsPanelOpen(false);
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    setCommitedStartDate("");
    setCommitedEndDate("");
  };

  return (
    <div className="filters">
      <div className="filters-top">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by customer name"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
        <button
          className="filter-toggle-btn"
          onClick={() => setIsPanelOpen((prev) => !prev)}
        >
          {isPanelOpen ? "✕" : "⚙ Filter"}
        </button>
      </div>

      {/* Always visible on desktop, toggle on mobile */}
      <div
        className={`date-filters ${isPanelOpen ? "date-filters--open" : ""}`}
      >
        <div className="date-input">
          <label htmlFor="start-date">Start Date </label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="date-input">
          <label htmlFor="end-date">End Date </label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="date-actions">
          <button className="clear-btn" onClick={handleClear}>
            Clear
          </button>
          <button onClick={handleApply}>Apply</button>
        </div>
      </div>
    </div>
  );
};
