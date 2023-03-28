import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetMenuItemsQuery } from "../../../Apis/menuItemApi";
import { menuItemModel } from "../../../Interfaces";
import { setMenuItem } from "../../../Storage/Redux/menuItemSlice";
import MenuItemCard from "./MenuItemCard";

const MenuItemList = () => {

    // const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
    const dispatch = useDispatch();
    const {data, isLoading} = useGetMenuItemsQuery("");

    useEffect(() => {
        // fetch('https://redmangoapi20230227.azurewebsites.net/api/MenuItem')
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data);
        //         setMenuItems(data.result);
        //     });
        if (!isLoading) {
            dispatch(setMenuItem(data.result));
        }
    }, [isLoading]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container row">
            {data.result.length > 0 && 
                data.result.map((menuItem: menuItemModel, index: number) => (
                    <MenuItemCard menuItem={menuItem} key={index} />
                ))}
        </div>
    );
}

export default MenuItemList;