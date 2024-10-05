import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

// Provider để bọc toàn bộ ứng dụng và cung cấp thông tin user cho các component con
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Khởi tạo user với giá trị null

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook để sử dụng thông tin user từ bất kỳ component nào
export const useUser = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
