import "./App.css";
import { Table } from "./components/table";
import { useEffect, useState } from "react";
import { getPayments } from "./api/get-payments";
import Loading from "./components/loading";
import { Filters } from "./components/filters";

function App() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commitedStartDate, setCommitedStartDate] = useState("");
  const [commitedEndDate, setCommitedEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  // filter payments based on search term
  const filteredPayments = payments.filter((payment) =>
    payment.Customer.toLowerCase().includes(searchTerm),
  );

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
          <Filters
            setCommitedStartDate={setCommitedStartDate}
            setCommitedEndDate={setCommitedEndDate}
            setSearchTerm={setSearchTerm}
          />

          {loading ? (
            <Loading />
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <Table payments={filteredPayments} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
