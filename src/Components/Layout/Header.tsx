import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { cartItemModel } from "../../Interfaces";
import { RootState } from "../../Storage/Redux/store";

let logo = require("../../Assets/images/mango.png");

const Header = () => {
    const shoppingCartFromStore: cartItemModel[] = useSelector(
        (state: RootState) => state.shoppingCartStore.cartItems ?? []
      );

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                
                <NavLink className="nav-link" aria-current="page" to="/">
                    <img src={logo} style={{ height: "40px" }} className="m-1" />
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                <span className="navbar-toggler-icon"></span>
                </button>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/">
                            首頁   
                        </NavLink>                   
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            aria-current="page"
                            to="/shoppingCart"
                        >
                            <i className="bi bi-cart">
                                {shoppingCartFromStore?.length
                                ? `(${shoppingCartFromStore.length})`
                                : ""}
                            </i>
                        </NavLink>            
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;