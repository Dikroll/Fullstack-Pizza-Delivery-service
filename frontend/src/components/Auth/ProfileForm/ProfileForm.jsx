import React, { useState } from 'react';
import './ProfileForm.css';

const ProfileForm = ({ user, onSave }) => {
  const [firstName, setFirstName] = useState(user.first_name);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [birthday, setBirthday] = useState(user.birthday);
  const [gender, setGender] = useState(user.gender);

  const Submit = (e) => {
    e.preventDefault();
    onSave({ first_name: firstName, email, address, birthday, gender });
  };

  return (
    <form className="profile-form" onSubmit={Submit}>
      <div className="form-group">
        <label>Имя</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Телефон</label>
        <input type="text" value={user.phone} disabled />
      </div>
      <div className="form-group">
        <label>Адресс</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div className="form-group">
        <label>День рождения</label>
        <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Пол</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
      </div>
      <div className="form-group">
        <label>Дымкоинов</label>
        <p>{user.bonus}</p>
      </div>
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default ProfileForm;