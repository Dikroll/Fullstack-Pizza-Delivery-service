import React from 'react';


const Footer = ({ categories }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-block">
          <h5 className="footer-title">Категории</h5>
          <ul className='footer-categories'>
            {categories.map((category) => (
              <li key={category.id}>
                <a href={`#category-${category.id}`} className="footer-link">
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-block">
          <h5 className="footer-title">Контактная информация</h5>
          <p>Телефон: +7 944 70 44</p>
          <p>Email: <a href="mailto:info@vremya-vdohnoveniy.ru" className="footer-link">DIMOKPIZZA@yandex.ru</a></p>
          <p>Адрес: Ул. 8 марта, д. 32Б, Иваново</p>
        </div>

        <div className="footer-block">
          <h5 className="footer-title">Социальные сети</h5>
          <ul>
            <li><a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="footer-link">ВКонтакте</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a></li>
          </ul>
        </div>
      </div>


      <div className="footer-bottom">
        <small>© 2025 Dымок. Все права защищены.</small>
      </div>
    </footer>
  );
};

export default Footer;
