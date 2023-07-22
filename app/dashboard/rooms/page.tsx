import MainLayout from '@/components/custom/Layouts/Main';
import ModalAddRoom from './components/ModalAddRooms';
import Cards from './components/Cards';

export const generateMetadata = () => ({
  title: 'Dashboard/Rooms',
});

export default async function RoomsDashboard() {
  return (
    <MainLayout>
      <div>
        <ModalAddRoom />
      </div>
      <Cards />
    </MainLayout>
  );
}
