
import { Navigate } from 'react-router-dom';
import ActiveOrders from './ActiveOrders';

// Our Index page will simply render the ActiveOrders component
// This allows us to have the root path "/" show the Active Orders view
const Index = () => {
  return <ActiveOrders />;
};

export default Index;
