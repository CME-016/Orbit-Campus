import { useState } from 'react';

export const useAuth = () => {
  const [user] = useState({
    id: 'T001',
    name: 'Bindhu',
    role: 'teacher',
  });

  return { user };
};
