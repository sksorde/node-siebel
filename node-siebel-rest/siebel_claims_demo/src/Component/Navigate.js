import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigate = () => {
  return (
    <nav>
     <ul>
      <li>
        <NavLink to="/" activeStyle={ {color:'green', fontWeight: 'bold'}
      } exact>Home</NavLink>
      </li>
      <li>
        <NavLink to="/claims" activeStyle={ {color:'green', fontWeight: 'bold'}
      }>AllClaims</NavLink>
      </li>
     </ul>
    </nav>
  );
};

export default Navigate;
