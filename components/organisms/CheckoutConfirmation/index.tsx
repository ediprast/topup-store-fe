import { useState } from "react";
import { toast } from "react-toastify";
import { setCheckout } from "../../../services/player";
import { useRouter } from "next/router";

export default function CheckoutConfirmation() {
  const [checkBox, setCheckBox] = useState(false);

  const router = useRouter();

  const onSubmit = async () => {
    const dataItemLocal = localStorage.getItem("data-item");
    const dataTopupLocal = localStorage.getItem("data-topup");

    const dataItem = JSON.parse(dataItemLocal!);
    const dataTopup = JSON.parse(dataTopupLocal!);
    if (!checkBox) {
      toast.error("Pastikan Anda sudah transfer pembayaran!");
    } else {
      const data = {
        voucher: dataItem._id,
        nominal: dataTopup.nominalItem._id,
        payment: dataTopup.paymentItem._id,
        bank: dataTopup.paymentItem.bank._id,
        name: dataTopup.bankAccountName,
        accountUser: dataTopup.verifyId,
      };
      const response = await setCheckout(data);
      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success("Checkout success");
        router.push("/complete-checkout");
      }
    }
  };
  return (
    <>
      <label className="checkbox-label text-lg color-palette-1">
        I have transferred the money{" "}
        <input
          type="checkbox"
          checked={checkBox}
          onChange={() => setCheckBox(!checkBox)}
        />
        <span className="checkmark"></span>
      </label>
      <div className="d-md-block d-flex flex-column w-100 pt-50">
        <button
          onClick={onSubmit}
          className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg"
          type="button"
        >
          Confirm Payment
        </button>
      </div>
    </>
  );
}
