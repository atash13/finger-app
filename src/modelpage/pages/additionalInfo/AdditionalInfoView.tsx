import React, { useState } from "react";
import styles from "./AdditionalInfo.module.css";

const AdditionalInfoView = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    height: "170 cm",
    weight: "60 kg",
    hairColor: "Brown",
    eyeColor: "Hazel",
    ethnicity: "Caucasian",
    tattoos: "No",
    piercings: "Yes",
  });

  const [editedData, setEditedData] = useState({ ...formData });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setFormData({ ...editedData });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Additional Info</h2>
        {!isEditing && (
          <button className={styles.editButton} onClick={handleEditClick}>
            Edit
          </button>
        )}
      </div>
      <div className={styles.grid}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className={styles.infoItem}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            {isEditing ? (
              <input
                className={styles.input}
                type="text"
                name={key}
                value={editedData[key as keyof typeof editedData]}
                onChange={handleChange}
              />
            ) : (
              <p className={styles.text}>{value}</p>
            )}
          </div>
        ))}
      </div>
      {isEditing && (
        <button className={styles.saveButton} onClick={handleSaveClick}>
          Save
        </button>
      )}
    </div>
  );
};

export default AdditionalInfoView;
