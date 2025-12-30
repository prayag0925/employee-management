const EmployeeList = ({ data, onDelete, onEdit }) => {
  if (data.length === 0) {
    return <p style={{ color: 'red' }}>No Employees Found in the system.</p>;
  }

  return (
    <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f4f4f4' }}>
          <th>Name</th>
          <th>Email</th>
          <th>Salary</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>${emp.salary}</td>
            <td style={{ color: emp.status === 'Active' ? 'green' : 'red' }}>
              {emp.status}
            </td>
            <td>
              <button onClick={() => onEdit(emp)}>Edit</button>
              <button onClick={() => onDelete(emp.id)} style={{ marginLeft: '5px' }}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;