import Image from "next/image";
import Link from "next/link";
import cx from "classnames";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface SidebarItemProps {
  title: string;
  href: string;
  icon: string;
  active?: boolean;
}

export default function SidebarItem(props: Partial<SidebarItemProps>) {
  const { title, href, active, icon } = props;
  const classItem = cx({
    item: true,
    "mb-30": true,
    active,
  });

  const router = useRouter();

  const onLogout = () => {
    Cookies.remove("token");
    router.push("/");
  };

  return (
    <div className={classItem}>
      <div className="me-3">
        <Image src={`/icon/${icon}.svg`} width={25} height={25} />
      </div>
      <p className="item-title m-0">
        {title === "Log Out" ? (
          <a
            className="text-lg text-decoration-none"
            type="button"
            onClick={onLogout}
          >
            {title}
          </a>
        ) : (
          <Link href={`${href}`}>
            <a className="text-lg text-decoration-none">{title}</a>
          </Link>
        )}
      </p>
    </div>
  );
}
