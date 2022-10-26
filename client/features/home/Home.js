import React from 'react';
import { useSelector } from 'react-redux';
import { Cart } from '../../components';

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const id = useSelector((state) => state.auth.me.id);
  return (
    <div>
      <h3>Welcome, {username}</h3>
      <Cart id={id} />
    </div>
  );
};

export default Home;
