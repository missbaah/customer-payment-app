// function to fetch payment details by payment ID from the API
export const getPaymentsDetails = async (paymentId) => {
  const response = await fetch(
    `https://spes.pscgh.com:442/sales-api/api/Payments/${paymentId}`,
  );
  const data = await response.json();
  return data;
};
