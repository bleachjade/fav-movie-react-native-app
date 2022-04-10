import React from 'react';
import useAuthentication from '../utils/hooks/useAuthentication';
import AuthStack from './AuthStack';
import AuthorizedStack from './AuthorizedStack';

const MainNavigator = () => {
  const { user } = useAuthentication();

  return user ? <AuthorizedStack /> : <AuthStack />;
}

export default MainNavigator;