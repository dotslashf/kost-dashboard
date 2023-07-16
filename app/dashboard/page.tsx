import MainLayout from '../components/Layouts/Main';

export const generateMetadata = () => ({
  title: 'Dashboard',
});

const Dashboard = () => {
  return (
    <MainLayout>
      <h1>Dashboard</h1>
    </MainLayout>
  );
};

export default Dashboard;
