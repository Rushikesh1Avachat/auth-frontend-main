import { useAuth } from '../hooks/useAuth';

function HomePage() {
  const { isAuthenticated, user } = useAuth();
  console.log(isAuthenticated, user, 'from the line 5');
  return (
    <div className="h-[500px] flex justify-center items-center">
      <div>
        {' '}
        <h1 className="text-6xl font-bold">
          Welcome, {isAuthenticated ? user?.username : 'Authenticated System'}{' '}
        </h1>
        <h3 className="text-2xl mt-5 block font-bold text-gray-700">
          #{Boolean(user) ? user?.role : 'Guest'}
        </h3>
      </div>
    </div>
  );
}

export default HomePage;
