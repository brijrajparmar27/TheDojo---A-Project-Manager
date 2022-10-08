import { useContext } from "react";
import { MenuContext } from "../../Contexts/MenuContext";

const useMenuProvider = () => {
    const { OnlineMenu, setOnlineMenu, HamburgerMenu, setHamburgerMenu } = useContext(MenuContext);
    return { OnlineMenu, setOnlineMenu, HamburgerMenu, setHamburgerMenu }
}
export default useMenuProvider;