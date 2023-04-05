import React from "react";
import { withAuth } from "../../HOC";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import { MainLoader } from "../../Components/Page/Common";
import OrderList from "../../Components/Page/Order/OrderList";

const MyOrders = () => {
  const userId = useSelector((state: RootState) => state.userAuthStore.id);
  const { data, isLoading } = useGetAllOrdersQuery({ userId });
  console.log(isLoading);
  console.log(data);
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <h1 className="text-success">訂單</h1>
          <div className="p-2">
            <div className="row border">
              <div className="col-1">ID</div>
              <div className="col-3">Name</div>
              <div className="col-2">Phone</div>
              <div className="col-1">Total</div>
              <div className="col-1">Items</div>
              <div className="col-2">Date</div>
              <div className="col-2"></div>
            </div>
            <>
              <div className="d-flex align-items-center justify-content-between mx-5 mt-5">
                <h1 className="text-success">My Orders</h1>
              </div>

              <OrderList isLoading={isLoading} orderData={data?.apiResponse.result} />
            </>
          </div>
        </div>
      )}
    </>
  );
}

export default withAuth(MyOrders);