import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInitiatePaymentMutation } from "../../../Apis/paymentApi";
import { inputHelper } from "../../../Helper";
import { apiResponse, cartItemModel } from "../../../Interfaces";
import { RootState } from "../../../Storage/Redux/store";
import { MiniLoader } from "../Common";

export default function CartPickUpDetails() {
  const [loading, setLoading] = useState(false);
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  const userData = useSelector((state: RootState) => state.userAuthStore);
  const navigate = useNavigate();
  const [initiatePayment] = useInitiatePaymentMutation();

  let grandTotal = 0;
  let totalItems = 0;

  const initialUserData = {
    name: userData.fullName,
    email: userData.email,
    phoneNumber: "",
  };

  const [userInput, setUserInput] = useState(initialUserData);
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  useEffect(() => {
    setUserInput({
      name: userData.fullName,
      email: userData.email,
      phoneNumber: "",
    });
  }, [userData]);

  shoppingCartFromStore?.map((cartItem: cartItemModel) => {
    totalItems += cartItem.quantity ?? 0;
    grandTotal += (cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0);
    return null;
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data }: apiResponse = await initiatePayment(userData.id);
    // const orderSummary = { grandTotal, totalItems };
    console.log(data);
    navigate("/payment", {
      state: { apiResult: data?.result, userInput },
    });

    setLoading(true);
  };

  

  return (
    <div className="border pb-5 pt-3">
      <h1 style={{ fontWeight: "300" }} className="text-center text-success">
        購物清單
      </h1>
      <hr />
      <form onSubmit={handleSubmit} className="col-10 mx-auto">
        <div className="form-group mt-3">
          Name
          <input
            type="text"
            className="form-control"
            placeholder="name..."
            name="name"
            required
            value={userInput.name}
            onChange={handleUserInput}
          />
        </div>
        <div className="form-group mt-3">
          Email
          <input
            type="email"
            className="form-control"
            placeholder="email..."
            name="email"
            required
            value={userInput.email}
            onChange={handleUserInput}
          />
        </div>

        <div className="form-group mt-3">
          手機電話
          <input
            type="number"
            className="form-control"
            placeholder="phone number..."
            name="phoneNumber"
            required
            value={userInput.phoneNumber}
            onChange={handleUserInput}
          />
        </div>
        <div className="form-group mt-3">
          <div className="card p-3" style={{ background: "ghostwhite" }}>
            <h5>合計 : ${grandTotal}</h5>
            <h5>總數 : {totalItems}</h5>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-lg btn-success form-control mt-3"
        >
          {loading ? <MiniLoader /> : "下訂單!"}
        </button>
      </form>
    </div>
  );
}