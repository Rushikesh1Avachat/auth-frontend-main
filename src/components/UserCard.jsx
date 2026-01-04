import { Badge, Card, List } from 'flowbite-react';
import { useAuth } from '../hooks/useAuth';
import axiosInstance from '../utils/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { GiAstronautHelmet } from 'react-icons/gi';

export default function UserCard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleVerifyPhone = async () => {
    try {
      await axiosInstance.post('/get-phone-otp', {
        phone: user?.phone,
      });
      console.log(user?.phone);

      toast.success('Otp Sent, please verify otp');
      navigate('/verify-phone-otp');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="max-w-md">
      <div className="flex flex-col items-center pb-10">
        <GiAstronautHelmet className="text-5xl" />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {user?.username}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user?.role}
        </span>

        <ListItem user={user} handleVerifyPhone={handleVerifyPhone} />
      </div>
    </Card>
  );
}

const ListItem = ({ user, handleVerifyPhone }) => {
  return (
    <List className="leading-loose mt-10">
      <List.Item className="flex items-center">
        <div>
          <span>Email:</span> {user['email']}
        </div>
        {user.role === 'user' ? (
          <div className="ml-4">
            {user['email_verified'] ? (
              <Badge color="success">Verified</Badge>
            ) : (
              <Badge color="warning">Verify Now</Badge>
            )}
          </div>
        ) : null}
      </List.Item>
      {user.role === 'user' && user['phone'] ? (
        <List.Item className="flex items-center">
          <div>
            <span>Phone:</span> {user['phone']}
          </div>
          <div className="ml-4">
            {user['phone_verified'] ? (
              <Badge color="success">Verified</Badge>
            ) : (
              <Badge color="warning" onClick={handleVerifyPhone}>
                Verify Now
              </Badge>
            )}
          </div>
        </List.Item>
      ) : null}
    </List>
  );
};
