// component to display a label and value pair in the modal
export const DetailRow = ({ label, value }) => {
  return (
    <p className="space-btw muted">
      <span style={{ fontWeight: "bold" }}>{label}:</span> <span>{value}</span>
    </p>
  );
};
