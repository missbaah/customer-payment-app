import "./App.css";
import { Table } from "./components/table";
import { useEffect, useState } from "react";
import { getPayments } from "./api/get-payments";
import Loading from "./components/loading";

function App() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [commitedStartDate, setCommitedStartDate] = useState(startDate);
  const [commitedEndDate, setCommitedEndDate] = useState(endDate);

  // fetch payments data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await getPayments({
        startDate: commitedStartDate,
        endDate: commitedEndDate,
      });

      if (error) {
        setError(error);
      } else {
        setPayments(data);
      }

      setLoading(false);
    };

    fetchData();
  }, [commitedStartDate, commitedEndDate]);

  return (
    <>
      <h2>Customer Payments Dashboard</h2>
      <div className="app-container">
        <div className="sidebar">
          <p
            style={{
              color: "#9da4ae",
              textTransform: "uppercase",
              height: "auto",
            }}
          >
            Menu
          </p>
          <p
            style={{
              marginTop: "8px",
              fontSize: "18px",
              color: "black",
              padding: "8px",
              backgroundColor: "#f1f5f9",
            }}
          >
            Payments
          </p>
        </div>
        <div className="main-content">
          <section className="header">
            <p style={{ fontSize: "22px" }}>Recieved Payments</p>
            <p style={{ color: "#64748b", marginTop: "8px" }}>
              Shows all received payments
            </p>
          </section>
          <div className="date-filters">
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
            <button
              onClick={() => {
                setCommitedStartDate(startDate);
                setCommitedEndDate(endDate);
              }}
            >
              Apply
            </button>
          </div>

          {loading ? (
            <Loading />
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <Table payments={payments} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
