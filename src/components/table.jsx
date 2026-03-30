import { useState } from "react";
import { formatDate } from "../utils/formatDate";
import { Modal } from "./modal";
import { useIsMobile } from "../utils/isMobile";

export const Table = ({ payments }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState("");

  const isMobile = useIsMobile();

  // determine items per page based on screen size
  const ITEMS_PER_PAGE = isMobile ? 5 : 10;

  // calculate the index range for current page payments
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // slice the payments array to get only the payments for the current page
  const currentPayments = payments.slice(startIndex, endIndex);

  // table headers
  const headers = [
    "Customer",
    "Customer Id",
    "Amount",
    "Date",
    "Payment Number",
    "Payment Id",
  ];

  // calculate total pages for pagination
  const totalPages = Math.ceil(payments.length / ITEMS_PER_PAGE);

  // handles pagination logic for previous and next buttons
  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.floor(payments.length / ITEMS_PER_PAGE)),
    );
  };

  return (
    <>
      <div>
        {/* table component */}
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.map((payment) => {
              const paymentDate = formatDate(payment.PaymentDate);

              return (
                <tr key={payment.PaymentId}>
                  <td data-label="Customer" className="truncate">
                    {payment.Customer}
                  </td>
                  <td data-label="Customer Id" className="truncate">
                    {payment.CustomerId}
                  </td>
                  <td data-label="Amount">₵{payment.Amount.toFixed(2)}</td>
                  <td data-label="Date">{paymentDate}</td>
                  <td data-label="Payment Number">{payment.PaymentNumber}</td>
                  <td data-label="Payment Id" className="truncate">
                    {payment.PaymentId}
                  </td>
                  <td data-label="Details">
                    <button
                      className="details-button"
                      onClick={() => {
                        setSelectedPaymentId(payment.PaymentId);
                        setIsOpen(true);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/*  pagination controls */}
        <div className="pagination">
          <button onClick={handlePrevious} disabled={currentPage === 0}>
            Previous
          </button>
          <span>
            Page <span className="pageNum">{currentPage + 1}</span> of{" "}
            {totalPages}
          </span>
          <button onClick={handleNext} disabled={endIndex >= payments.length}>
            Next
          </button>
        </div>
      </div>
      {/* modal component */}
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        paymentId={selectedPaymentId}
      />
    </>
  );
};
