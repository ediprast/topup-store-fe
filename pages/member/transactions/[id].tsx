import Sidebar from "../../../components/organisms/Sidebar";
import TransactionDetailContent from "../../../components/organisms/TransactionDetailContent";
import { HistoryTransactionTypes } from "../../../services/data-types";
import { getMemberTransactionDetail } from "../../../services/player";

interface DetailProps {
  transactionDetail: HistoryTransactionTypes;
}

export default function detail(props: DetailProps) {
  const { transactionDetail } = props;
  return (
    <section className="transactions-detail overflow-auto">
      <Sidebar activeMenu="transactions" />
      <TransactionDetailContent data={transactionDetail} />
    </section>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
  params: {
    id: string;
  };
}

export async function getServerSideProps({ req, params }: GetServerSideProps) {
  const { id } = params;
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }
  const jwtToken = Buffer.from(token, "base64").toString("ascii");
  // const payload: JWTPayloadTypes = jwt_decode(jwtToken);
  // const userPayload: UserTypes = payload.player;
  const response = await getMemberTransactionDetail(id, jwtToken);
  return {
    props: {
      transactionDetail: response.data,
    },
  };
}
