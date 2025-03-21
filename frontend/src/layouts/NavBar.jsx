import React from "react";
import { Link } from "react-router-dom";
import CartButton from "@/components/Cart/CartButton/CartButton";
import logo from "@/assets/images/favicon.svg";
import { useAuth } from "@/context/UseAuth";
import Userlogo from "@/assets/images/profile.svg"; 
import ScrollToCategory from '@/utils/scrollToCategory';


const NavBar = ({ categories }) => {
  const { user } = useAuth();

  const scrollToCategory = ScrollToCategory();




  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img src={logo} alt="Logo" width="80" height="80" className="me-2" />
            <span className="brand-text">Dымок</span>
          </Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  id="categoriesDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Категории
                </span>
                <ul className="dropdown-menu categories-dropdown" aria-labelledby="categoriesDropdown">
                {categories.map((category) => (
                    <li key={category.id}>
                      <a 
                        href={`/#category-${category.id}`} 
                        className="dropdown-item"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToCategory(category.id);
                        }}
                      >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/delivery" className="nav-link">Контакты</Link>
              </li>
              <li className="nav-item">
                <Link to="/promotions" className="nav-link">Акции</Link>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center ms-3">
            {user ? (
              <Link to="/profile" className="profile-icon">
                <img src={Userlogo}/>
              </Link>
            ) : (
              <Link to="/login" className="profile-icon"><img src={Userlogo}/></Link>
            )}
            <CartButton className="btn btn-danger" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
