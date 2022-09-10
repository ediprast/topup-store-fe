import Footer from "./Footer";
import Profile from "./Profile";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  activeMenu: "overview" | "transactions" | "settings";
}

export default function Sidebar(props: SidebarProps) {
  const { activeMenu } = props;
  return (
    <section className="sidebar">
      <div className="content pt-50 pb-30 ps-30">
        <Profile />
        <div className="menus">
          <SidebarItem
            title="Overview"
            href="/member"
            icon="sidebar-menu"
            active={activeMenu === "overview"}
          />
          <SidebarItem
            title="Transactions"
            href="/member/transactions"
            icon="sidebar-transaction"
            active={activeMenu === "transactions"}
          />
          <SidebarItem
            title="Messages"
            href="/messages"
            icon="sidebar-message"
          />
          <SidebarItem title="Card" href="/card" icon="sidebar-card" />
          <SidebarItem title="Rewards" href="/rewards" icon="sidebar-reward" />
          <SidebarItem
            title="Settings"
            href="/member/edit-profile"
            icon="sidebar-setting"
            active={activeMenu === "settings"}
          />
          <SidebarItem title="Log Out" href="/sign-in" icon="sidebar-logout" />
        </div>
        <Footer />
      </div>
    </section>
  );
}
