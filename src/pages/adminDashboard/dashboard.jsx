import { useEffect, useState } from 'react';
import { CustomTable } from '../../components';
import axiosInstance from '../../utils/AxiosInstance';
import CustomDrawer from '../../components/CustomDrawer';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(null);
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/users');
      setUsers(response.data.data);
    } catch (error) {
      console.log('Error from user listing');
    } finally {
      setLoading(false);
    }
  };
  const handleOpen = (data) => {
    setIsOpen(data);
  };
  const handleClose = () => {
    setIsOpen(null);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  console.log(isOpen, 'frmm is open');
  return (
    <div>
      <CustomTable handleOpen={handleOpen} loading={loading} users={users} />
      <CustomDrawer
        fetchUsers={fetchUsers}
        handleClose={handleClose}
        title="User"
        isOpen={isOpen}
      />
    </div>
  );
};

export default AdminDashboard;
