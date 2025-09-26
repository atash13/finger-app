import React, { useState } from "react";
import "./StreamSettings.css";

const initialData = [
  { label: "Private Chat Price", value: "2.99", type: "input" },
  { label: "Sneak Peek Chat Price", value: "2.99", type: "input" },
  { label: "Group Chat Price", value: "2.49", type: "input" },
  { label: "Cam to Cam Price", value: "0.99", type: "input" },
  { label: "Call Price", value: "0.99", type: "input" },
  { label: "Buzz Mode Price", value: "1", type: "input" },
  { label: "Allow Cam to Cam", value: "Allowed", type: "switch" },
  {
    label: "Jump to Free Chat After Private is Over",
    value: "Not Allowed",
    type: "switch",
  },
  {
    label: "Jump to Free Chat After Group is Over",
    value: "Not Allowed",
    type: "switch",
  },
  { label: "Buzz Mode", value: "Enabled", type: "switch" },
  { label: "Thematic Show Mode", value: "Disabled", type: "switch" },
  { label: "Auto Message Users", value: "Enabled", type: "switch" },
  { label: "Fan Club", value: "Enabled", type: "switch" },
  { label: "Fan Club Private Chat Price", value: "2.49", type: "input" },
  { label: "Fan Club Sneak Peek Chat Price", value: "1.79", type: "input" },
  { label: "Fan Club Group Chat Price", value: "1.99", type: "input" },
  { label: "Fan Club Cam to Cam Chat Price", value: "0.79", type: "input" },
  { label: "Fan Club Call Chat Price", value: "0.79", type: "input" },
];

const StreamSettings: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const handleChange = (index: number, newValue: string) => {
    const updated = [...formData];
    updated[index].value = newValue;
    setFormData(updated);
  };

  const toggleSwitch = (index: number) => {
    const updated = [...formData];
    updated[index].value =
      updated[index].value === "Allowed" || updated[index].value === "Enabled"
        ? "Not Allowed"
        : "Allowed";
    if (
      formData[index].label === "Buzz Mode" ||
      formData[index].label === "Thematic Show Mode" ||
      formData[index].label === "Auto Message Users" ||
      formData[index].label === "Fan Club"
    ) {
      updated[index].value =
        updated[index].value === "Enabled" ? "Disabled" : "Enabled";
    }
    setFormData(updated);
  };

  return (
    <div className="stream-settings">
      <div className="header">
        <h2>MyProfile / Stream Settings</h2>
        <button onClick={() => setEditing(!editing)}>
          {editing ? "Save" : "Edit"}
        </button>
      </div>

      <table className="settings-table">
        <tbody>
          {formData.map((item, index) => (
            <tr key={index}>
              <td className="label">{item.label}</td>
              <td className="value">
                {editing ? (
                  item.type === "input" ? (
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => handleChange(index, e.target.value)}
                    />
                  ) : (
                    <button
                      type="button"
                      className={`switch ${
                        item.value === "Allowed" || item.value === "Enabled"
                          ? "on"
                          : "off"
                      }`}
                      onClick={() => toggleSwitch(index)}
                    >
                      {item.value}
                    </button>
                  )
                ) : (
                  item.value
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StreamSettings;
