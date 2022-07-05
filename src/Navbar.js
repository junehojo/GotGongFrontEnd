import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [sign, setSign] = useState(true);
  const onClick = () => {
    setSign((prev) => !prev);
  };
  return (
    <div>
      <ul className="navbar">
        <li>
          <Link to="/">홈</Link>
        </li>
        {sign ? (
          <li>
            <Link to="/signin">
              <button onClick={onClick}>로그인</button>
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/sign_up">
              <button onClick={onClick}>회원가입</button>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;