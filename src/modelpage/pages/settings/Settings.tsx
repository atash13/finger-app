import React, { useState } from "react";
import "./Settings.css";

const allCountries = [
  "Turkey",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Greece",
  "Netherlands",
  "Belgium",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Poland",
  "Austria",
  "Switzerland",
  "Czech Republic",
  "Portugal",
  "Hungary",
  "Romania",
  "Bulgaria",
  "Croatia",
  "Serbia",
  "Slovakia",
  "Slovenia",
  "Estonia",
  "Latvia",
  "Lithuania",
  "Ireland",
  "United Kingdom",
  "USA",
  "Canada",
  "Brazil",
  "Argentina",
  "Mexico",
  "Japan",
  "China",
  "South Korea",
  "India",
  "Australia",
  "New Zealand",
];

const Settings: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleCountry = (country: string) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter((c) => c !== country));
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const filteredCountries = allCountries.filter((c) =>
    c.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2 className="settings-title">MyProfile / Settings</h2>
        <button className="edit-button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </div>

      <div className="settings-content">
        <div className="blocked-row">
          <span className="blocked-label">Blocked Countries</span>
          <span className="blocked-divider"></span>
          <span className="blocked-list">
            {selectedCountries.length > 0 ? selectedCountries.join(", ") : ""}
          </span>
        </div>
      </div>

      {isEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Select Countries</h3>
            </div>

            <input
              type="text"
              placeholder="Search country..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="country-list">
              {filteredCountries.map((country) => (
                <div
                  key={country}
                  className={`country-item ${
                    selectedCountries.includes(country) ? "selected" : ""
                  }`}
                  onClick={() => handleToggleCountry(country)}
                >
                  <span>{country}</span>
                  <span className="checkmark">
                    {selectedCountries.includes(country) ? "✔" : ""}
                  </span>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              <button
                className="cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
