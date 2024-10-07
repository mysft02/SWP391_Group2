import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log("Stored user:", parsedUser); // Kiểm tra xem dữ liệu từ session có đúng không
          if (parsedUser && parsedUser.roleId) {
            setUser(parsedUser); // Cập nhật user vào context
          }
        }
    }, []);
    
      

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
// const handleLogout = () => {
//   // Xóa thông tin user khỏi context
//   setUser(null);
//   // Xóa thông tin khỏi Local Storage
//   localStorage.removeItem('user');
//   navigate("/sign-in");
// };
