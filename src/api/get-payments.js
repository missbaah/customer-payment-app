// function to fetch payments data from the API

export const getPayments = async ({ startDate, endDate }) => {
  const queryParams = new URLSearchParams();
  if (startDate) queryParams.append("startDate", startDate);
  if (endDate) queryParams.append("endDate", endDate);

  try {
    const response = await fetch(`/api/Payments?${queryParams}`);

    if (!response.ok) {
      throw new Error(
        `Request failed: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error("[getPayments] Error:", error.message);
    return { data: null, error: error.message };
  }
};
