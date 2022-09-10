import { useEffect, useState } from "react";
import { getMemberOverview } from "../../../services/player";
import Category from "./Category";
import TableRow from "./TableRow";
import { toast } from "react-toastify";
import {
  HistoryTransactionTypes,
  TopupCategoryTypes,
} from "../../../services/data-types";

export default function OverviewContent() {
  const [count, setCount] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchCategory() {
      const response = await getMemberOverview();
      if (response.error) {
        toast.error(response.message);
      } else {
        setCount(response.data.count);
        setData(response.data.data);
      }
    }

    fetchCategory();
  }, []);

  const IMG = process.env.NEXT_PUBLIC_IMG;

  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Overview</h2>
        <div className="top-up-categories mb-30">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            {count.length > 0 ? "Top Up Categories" : ""}
          </p>
          <div className="main-content">
            <div className="row">
              {count.map((item: TopupCategoryTypes) => {
                return (
                  <Category
                    key={item.value}
                    nominal={item.value}
                    icon="desktop"
                  >
                    {item.name}
                  </Category>
                );
              })}
            </div>
          </div>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">
            Latest Transactions
          </p>
          <div className="main-content main-content-table overflow-auto">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th className="text-start" scope="col">
                    Game
                  </th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  ""
                ) : (
                  <tr>
                    <td colSpan={4} className="text-danger text-center">
                      No transaction
                    </td>
                  </tr>
                )}
                {data.map((item: HistoryTransactionTypes) => {
                  return (
                    <TableRow
                      title={item.historyVoucherTopup.gameName}
                      category="Desktop"
                      item={`${item.historyVoucherTopup.coinQuantity} ${item.historyVoucherTopup.coinName}`}
                      price={item.value}
                      image={`${IMG}/${item.historyVoucherTopup.thumbnail}`}
                      status={item.status}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
