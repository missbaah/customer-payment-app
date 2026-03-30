import React from "react";
import { getPaymentsDetails } from "../api/get-payment-details";
import { formatDate } from "../utils/formatDate";
import { DetailRow } from "./detailrow";

export const Modal = ({ isOpen, setIsOpen, paymentId }) => {
  const [paymentDetails, setPaymentDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // fetch payment details when paymentId changes
  React.useEffect(() => {
    if (paymentId) {
      setLoading(true);
      getPaymentsDetails(paymentId)
        .then((details) => setPaymentDetails(details))
        .catch((err) => {
          setError(err.message);
          setPaymentDetails(null);
        })
        .finally(() => setLoading(false));
    }
  }, [paymentId]);

  // close modal and reset state
  const closeModal = () => {
    setIsOpen(false);
    setPaymentDetails(null);
    setError(null);
  };

  // close modal when clicking outside of content
  const handleOutsideClick = (e) => {
    if (e.target.className === "modal") {
      closeModal();
    }
  };

  // prepare details for display in modal
  const ModalDeets = [
    { label: "Customer", value: paymentDetails?.Customer },
    { label: "Customer Id", value: paymentDetails?.CustomerId },
    { label: "Amount Paid", value: `$${paymentDetails?.AmountPaid}` },
    {
      label: "Outstanding Amount",
      value: `₵${paymentDetails?.Outstanding}`,
    },
    {
      label: "Payment Date",
      value: formatDate(paymentDetails?.PaymentDate),
    },
    paymentDetails?.Remarks && {
      label: "Remarks",
      value: paymentDetails.Remarks,
    },
    {
      label: "Created At",
      value: formatDate(paymentDetails?.CreatedAt),
    },
    paymentDetails?.Status && {
      label: "Status",
      value: paymentDetails.Status,
    },
    {
      label: "Invoices",
      value: paymentDetails ? paymentDetails.invoices.length : 0,
    },
  ];

  return (
    <div
      className="modal"
      style={{ display: isOpen ? "flex" : "none" }}
      onClick={handleOutsideClick}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h3>Payment Details</h3>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : paymentDetails ? (
          <div className="modal-deets">
            {ModalDeets.map(
              (deet, index) =>
                deet && (
                  <DetailRow
                    key={index}
                    label={deet.label}
                    value={deet.value}
                  />
                ),
            )}
          </div>
        ) : (
          <p>No details available.</p>
        )}
        <div></div>
      </div>
    </div>
  );
};
