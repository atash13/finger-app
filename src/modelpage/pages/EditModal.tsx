import React, { useState } from "react";
import styles from "./EditModal.module.css";

interface Props {
  info: Record<string, string>;
  onSave: (data: Record<string, string>) => void;
  onCancel: () => void;
}

const EditModal: React.FC<Props> = ({ info, onSave, onCancel }) => {
  const [formData, setFormData] = useState(info);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Edit Basic Info</h2>

        <div className={styles.form}>
          {Object.entries(formData).map(([key, value]) => (
            <div className={styles.formGroup} key={key}>
              <label>{key.replace(/([A-Z])/g, " $1")}</label>
              <input
                name={key}
                value={value}
                onChange={handleChange}
                type="text"
              />
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <button onClick={() => onSave(formData)}>Save</button>
          <button onClick={onCancel} className={styles.cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
