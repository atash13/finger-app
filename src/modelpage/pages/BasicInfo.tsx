import React, { useState } from "react";
import styles from "./BasicInfo.module.css";
import Modal from "./EditModal"; // popup bileşeni

const initialInfo = {
  displayName: "EmmaRey",
  firstName: "Carmen-Daniela",
  lastName: "Brinza",
  dob: "1993-11-18",
  displayAge: "Not set",
  gender: "Female",
  address:
    "Jud.BR Mun. Braila Sat. Sutesti (com. Sutesti) Str. Crinului nr. 38 A",
  postalCode: "800624",
  city: "Braila",
  state: "Romania",
  country: "Romania",
};

const BasicInfo: React.FC = () => {
  const [info, setInfo] = useState(initialInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (updatedInfo: Record<string, string>) => {
    setInfo(updatedInfo as typeof initialInfo);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          My Profile / <span>Basic info</span>
        </div>
        <button
          className={styles.editButton}
          onClick={() => setIsModalOpen(true)}
        >
          Edit
        </button>
      </div>

      {/* Table */}
      <div className={styles.table}>
        {Object.entries(info).map(([label, value]) => (
          <div className={styles.row} key={label}>
            <div className={styles.label}>
              {label.replace(/([A-Z])/g, " $1")}
            </div>
            <div className={styles.value}>{value}</div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          info={info}
          onCancel={() => setIsModalOpen(false)}
          onSave={handleSave as (data: Record<string, string>) => void}
        />
      )}
    </div>
  );
};

export default BasicInfo;
