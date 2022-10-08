import { useState, createContext } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [OnlineMenu, setOnlineMenu] = useState(false);
    const [HamburgerMenu, setHamburgerMenu] = useState(false);

    return (
        <MenuContext.Provider value={{ OnlineMenu, setOnlineMenu, HamburgerMenu, setHamburgerMenu }}>
            {children}
        </MenuContext.Provider>
    );
}