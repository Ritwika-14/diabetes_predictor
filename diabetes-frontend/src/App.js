import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: ""
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", formData);
      setResult(res.data.message);
    } catch (error) {
      console.error("Error:", error);
      setResult("Error connecting to API");
    }
  };

  return (
    <div style={{ margin: "50px auto", width: "400px", fontFamily: "Arial" }}>
      <h2>🩺 Diabetes Risk Prediction</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} style={{ marginBottom: "10px" }}>
            <label>{key}:</label>
            <input
              type="number"
              step="any"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc"
              }}
            />
          </div>
        ))}
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Predict
        </button>
      </form>

      {result && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            borderRadius: "8px",
            background: result === "High Risk" ? "#ffcccc" : "#ccffcc"
          }}
        >
          <h3>Result: {result}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
