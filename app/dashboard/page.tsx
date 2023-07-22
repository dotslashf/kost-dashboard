import MainLayout from '../../components/custom/Layouts/Main';

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
