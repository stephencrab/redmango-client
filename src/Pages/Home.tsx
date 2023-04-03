import { Banner } from "../Components/Layout";
import { MenuItemList } from "../Components/Page/Home";

const Home = () => {


    return (
        <div>
            <Banner />
            <div className="container p-2">
                <MenuItemList />
            </div>
        </div>
    );
}

export default Home;