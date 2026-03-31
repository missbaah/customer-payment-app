import React, { useState } from "react";

// component for filters - date range and search
export const Filters = ({
  setCommitedStartDate,
  setCommitedEndDate,
  setSearchTerm,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="filters">
      {/* search filters by customer name */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by customer name"
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            setSearchTerm(searchTerm);
          }}
        />
      </div>

      {/* applies date filters */}
      <div className="date-filters">
        <div className="date-input">
          <label
            htmlFor="start-date"
            style={{ fontSize: "12px", color: "#64748b" }}
          >
            Start Date{" "}
          </label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="date-input">
          <label
            htmlFor="end-date"
            style={{ fontSize: "12px", color: "#64748b" }}
          >
            End Date{" "}
          </label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            setCommitedStartDate(startDate);
            setCommitedEndDate(endDate);
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};
