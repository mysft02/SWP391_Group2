import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase'; // Firebase configuration

// Tạo context
const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Hàm đăng nhập với Google
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const currentUser = result.user;
      // Lưu thông tin người dùng vào localStorage
      const userData = {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        roleId: "R1" // Giả sử là người dùng có roleId mặc định là 1, bạn có thể thay đổi điều này tùy theo logic của bạn
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.log('Error during Google Sign-In:', error);
    }
  };

  // Hàm đăng xuất
  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null); // Xóa người dùng khỏi context
        localStorage.removeItem('user'); // Xóa khỏi localStorage
      })
      .catch((error) => {
        console.log('Error during Sign-Out:', error);
      });
  };

  // Lắng nghe trạng thái xác thực (login, logout)
  useEffect(() => {
    // Kiểm tra thông tin người dùng từ localStorage
    const storedUser = localStorage.getItem('user');
    console.log("user:", storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Lưu người dùng từ localStorage vào state
    }

    // Lắng nghe trạng thái thay đổi của Firebase Authentication
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userData = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          roleId: "R1", // Bạn có thể điều chỉnh tùy theo logic của mình
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Cập nhật localStorage khi trạng thái thay đổi
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe(); // Dọn dẹp listener khi component unmount
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, googleSignIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook để dễ dàng sử dụng UserContext
export const useUser = () => {
  return useContext(UserContext);
};
