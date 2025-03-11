import React, { useState, useEffect, useRef } from "react";

const PopupTools = ({ isOpen, onClose, onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: "",
    addressPort: "",
    password: "",
  });

  const firstRender = useRef(true); // Cegah reset saat `isOpen` berubah terus-menerus

  useEffect(() => {
    if (isOpen) {
      if (firstRender.current) {
        firstRender.current = false;
      } else {
        setFormData((prev) => ({
          ...prev,
          ...initialData, // Gunakan data awal tanpa reset berulang
        }));
      }
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Hindari submit form default
      onSubmit(formData);
    }
  };

  const handleModalClick = (e) => e.stopPropagation(); // Hindari modal tertutup saat klik dalam form

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={handleModalClick}>
        <h3>Enter Your Data</h3>
        <div>
          <label>AI Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter name"
          />
        </div>
        <div>
          <label>Address:Port</label>
          <input
            type="text"
            name="addressPort"
            value={formData.addressPort}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter address port (host:port)"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter password"
          />
        </div>
        <button onClick={() => onSubmit(formData)}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>

      {/* Styling */}
      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .popup-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: left;
          width: 300px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }
        input {
          margin-bottom: 10px;
          padding: 8px;
          width: calc(100% - 16px);
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          margin: 5px;
          padding: 8px 12px;
          cursor: pointer;
          border: none;
          border-radius: 4px;
          transition: background 0.2s;
        }
        button:first-of-type {
          background: #4caf50;
          color: white;
        }
        button:last-of-type {
          background: #f44336;
          color: white;
        }
        button:hover {
          opacity: 0.8;
        }
        label {
          display: block;
          margin-bottom: 5px;
        }
        div {
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
};

export default PopupTools;
