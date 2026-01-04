import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';

export default function CustomTable({ loading, handleOpen, users }) {
  if (loading) {
    return <div>Loading...</div>;
  }
  // Get Key for headers
  const getHeaders = () => {
    if (!users || users.length === 0) return [];
    console.log(users);
    
    const allKeys = Object.keys(users[0]);
    const exludedKeys = [
      'password',
      '__v',
      'phone_verified',
      'email_verified',
      'otp',
      'phoneOtp',
      'refreshToken',
    ];
    //  remove
    return allKeys.filter((key) => !exludedKeys.includes(key));
  };

  const headers = getHeaders();
  console.log(headers, 'from headers');

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          {headers.map((item, idx) => {
            return <TableHeadCell key={idx + 1}>{item}</TableHeadCell>;
          })}
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {users.map((user, idx) => (
            <TableRow
              key={idx + 1}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {idx + 1}
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpen(user)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
