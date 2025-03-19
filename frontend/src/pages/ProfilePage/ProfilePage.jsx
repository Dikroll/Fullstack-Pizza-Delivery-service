import ProfileForm from '@/components/Auth/ProfileForm/ProfileForm';
import OrderList from '@/components/Orders/OrderList/OrderList';
import { useAuth } from "@/context/UseAuth";
import './ProfilePage.css';

const ProfilePage = ({ requestUser, onSaveUser }) => {
  const { user, logoutUser } = useAuth();

  if (!user) {
    return null; 
  }

  return (
    <div className="profile-page">
      <span onClick={logoutUser}>Выйти</span>
      <h2>Заказы</h2>
      <OrderList></OrderList>
      <h2>Профиль</h2>
      <ProfileForm user={requestUser} onSave={onSaveUser} />
    </div>
  );
};

export default ProfilePage;