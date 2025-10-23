import React, { useState } from "react";
import styles from "./BasicInfo.module.css";
import Modal from "./EditModal"; // popup bileşeni

const initialInfo = {
  displayName: "Oksana",
  firstName: "Oksana",
  lastName: "Kleopatra",
  dob: "2001-01-02",
  displayAge: "Not set",
  gender: "Female",
  address: "Kusu Kalkmaz Sokak No: 4 Daire: 5, Istanbul, Turkey",
  postalCode: "34000",
  city: "Istanbul",
  state: "Istanbul",
  country: "Turkey",
};

const BasicInfo: React.FC = () => {
  const [info, setInfo] = useState(initialInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (updatedInfo: Record<string, string>) => {
    const typedInfo = {
      displayName: updatedInfo.displayName || "",
      firstName: updatedInfo.firstName || "",
      lastName: updatedInfo.lastName || "",
      dob: updatedInfo.dob || "",
      displayAge: updatedInfo.displayAge || "",
      gender: updatedInfo.gender || "",
      address: updatedInfo.address || "",
      postalCode: updatedInfo.postalCode || "",
      city: updatedInfo.city || "",
      state: updatedInfo.state || "",
      country: updatedInfo.country || "",
    };
    setInfo(typedInfo);
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
