import React, { useState } from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import { UserState, Mood } from './types';

function App() {
  const [user, setUser] = useState<UserState | null>(null);

  const handleOnboardingComplete = (data: Partial<UserState>) => {
    // In a real app, save to localStorage/DB here
    setUser(data as UserState);
  };

  if (!user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return <Dashboard user={user} />;
}

export default App;