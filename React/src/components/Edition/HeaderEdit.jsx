import React from "react";
import { Link } from "react-router-dom";
import "./homepage_edit.css";
import Vector from "../../images/Vector.png";
import insta from "../../images/instagram.png";

const HomeEdit = () => {
  return (
    <div>
      <section className="headerEdit">
        <h4>
          <img src={Vector} alt="vector" />
          Mode Edition
        </h4>
      </section>

      <header>
        <h1>
          <Link to="/home_edit">Sophie Bluel</Link> <span>Architecte d'intérieur</span>
        </h1>
        <nav>
          <ul>
            <li>projets</li>
            <li>contact</li>
            <li>
              <Link to="/login">logout</Link>
            </li>
            <li>
              <img src={insta} alt="Instagram" />
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default HomeEdit;
