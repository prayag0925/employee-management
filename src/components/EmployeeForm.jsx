import { useState, useEffect } from 'react';

const EmployeeForm = ({ onAdd, editTarget, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', salary: '', status: 'Active'
  });

  
  useEffect(() => {
    if (editTarget) {
      setFormData(editTarget);
    }
  }, [editTarget]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTarget) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }
    setFormData({ name: '', email: '', salary: '', status: 'Active' });
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
      <h3>{editTarget ? "Edit Employee Details" : "Add New Employee"}</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" placeholder="Full Name" required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input 
          type="email" placeholder="Email Address" required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="number" placeholder="Salary" required
          value={formData.salary}
          onChange={(e) => setFormData({...formData, salary: e.target.value})}
        />
        <select 
          value={formData.status}
          onChange={(e) => setFormData({...formData, status: e.target.value})}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit">{editTarget ? "Update" : "Save"}</button>
      </form>
    </div>
  );
};

export default EmployeeForm;