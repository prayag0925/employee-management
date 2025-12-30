import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  
  const [employees, setEmployees] = useState(() => {
    const savedData = localStorage.getItem('emp_records');
    return savedData ? JSON.parse(savedData) : [];
  });

 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    salary: '',
    status: 'Active'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

 
  useEffect(() => {
    localStorage.setItem('emp_records', JSON.stringify(employees));
  }, [employees]);

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
     
      setEmployees(employees.map(emp => 
        emp.id === editId ? { ...formData, id: editId } : emp
      ));
      setIsEditing(false);
      setEditId(null);
    } else {
     
      const newEntry = { ...formData, id: Date.now() };
      setEmployees([...employees, newEntry]);
    }

    
    setFormData({ name: '', email: '', salary: '', status: 'Active' });
  };

  const startEdit = (emp) => {
    setIsEditing(true);
    setEditId(emp.id);
    setFormData({ 
      name: emp.name, 
      email: emp.email, 
      salary: emp.salary, 
      status: emp.status 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteEmployee = (id) => {
    if (window.confirm("Delete this employee record?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const clearAllData = () => {
    if (window.confirm("clear all records")) {
      setEmployees([]);
    }
  };

  return (
    <div className="container">
      <h2>Team Management Portal</h2>

      
      <div className="summary-cards">
        <div className="card">
          <p>Total Staff</p>
          <h3>{employees.length}</h3>
        </div>
        <div className="card">
          <p>Active Status</p>
          <h3>{employees.filter(e => e.status === 'Active').length}</h3>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button className="btn-clear-all" onClick={clearAllData}>
             Clear All Records
          </button>
        </div>
      </div>

     
      <div className="form-section">
        <h3 style={{marginTop: 0, marginBottom: '20px'}}>
          {isEditing ? " Edit Employee Details" : " Register New Employee"}
        </h3>
        <form className="employee-form" onSubmit={handleSubmit}>
          <input 
            name="name" 
            type="text" 
            placeholder="Full Name" 
            value={formData.name} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            name="email" 
            type="email" 
            placeholder="Email Address" 
            value={formData.email} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            name="salary" 
            type="number" 
            placeholder="Annual Salary" 
            value={formData.salary} 
            onChange={handleInputChange} 
            required 
          />
          <select name="status" value={formData.status} onChange={handleInputChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button type="submit" className="submit-btn">
            {isEditing ? "Save Changes" : "Add Employee"}
          </button>
        </form>
      </div>

      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td style={{ fontWeight: '600', color: '#334155' }}>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>${Number(emp.salary).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${emp.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-edit" onClick={() => startEdit(emp)}>Edit</button>
                    <button className="btn-delete" onClick={() => deleteEmployee(emp.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '50px', color: '#94a3b8' }}>
                  No records found. Please add an employee to populate the list.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;