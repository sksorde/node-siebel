import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigate = () => {
  let claim = "test";
  return (
    <nav>
     <ul>
      <li>
        <NavLink to="/" activeStyle={ {color:'green', fontWeight: 'bold'}
      } exact>Home</NavLink>
      </li>
      <li>
        <NavLink to="/allClaims" activeStyle={ {color:'green', fontWeight: 'bold'}
      } exact>AllClaims</NavLink>
      </li>
     </ul>
    </nav>
  );
};

export default Navigate;
