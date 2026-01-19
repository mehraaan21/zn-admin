import React, { useState } from "react";

const StatusToggle = () => {
  const [status, setStatus] = useState("active");

  return (
    <div style={{ padding: "20px" }}>
      {/* Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setStatus("active")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: status === "active" ? "#2563eb" : "#e5e7eb",
            color: status === "active" ? "#fff" : "#000",
            border: "none",
            cursor: "pointer",
          }}
        >
          Active
        </button>

        <button
          onClick={() => setStatus("inactive")}
          style={{
            padding: "10px 20px",
            backgroundColor: status === "inactive" ? "#2563eb" : "#e5e7eb",
            color: status === "inactive" ? "#fff" : "#000",
            border: "none",
            cursor: "pointer",
          }}
        >
          Inactive
        </button>
      </div>

      {/* UI Content */}
      {status === "active" && (
        <div>
          <h2>✅ Active Users</h2>
          <p>This data is shown when Active is selected.</p>
        </div>
      )}

      {status === "inactive" && (
        <div>
          <h2>❌ Inactive Users</h2>
          <p>This data is shown when Inactive is selected.</p>
        </div>
      )}
    </div>
  );
};

export default StatusToggle;
