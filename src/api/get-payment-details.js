// function to fetch payment details by payment ID from the API
export const getPaymentsDetails = async (paymentId) => {
  const response = await fetch(`/api/Payments/${paymentId}`);
  const data = await response.json();
  return data;
};
