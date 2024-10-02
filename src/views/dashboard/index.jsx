import { useEffect, useState } from 'react';
const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div>NgocTu</div>
  );
};

export default Dashboard;
 