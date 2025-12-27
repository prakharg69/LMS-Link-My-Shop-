import React, { useEffect } from "react";
import {
  Building2,
  Store,
  List,
  Megaphone,
  Link2,
  QrCode,
  Rocket,
  BarChart3,
  User,
  Settings as SettingsIcon
} from "lucide-react";
import { useGlobalState } from "../Context/GlobalContext";

function Slidebar() {
  const { activeTab, setActiveTab } = useGlobalState();

  useEffect(() => {
    console.log("updated tab:", activeTab);
  }, [activeTab]);

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col justify-between h-full py-8">

      {/* ================= BUSINESS ================= */}
      <div className="space-y-10">

        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold uppercase tracking-wide text-gray-900">
              Business
            </h3>
          </div>

          <div className="space-y-2">
            <SidebarItem
              icon={<Store className="w-4 h-4" />}
              label="Stores"
              active={activeTab === "stores"}
              onClick={() => handleClick("stores")}
            />

            <SidebarItem
              icon={<List className="w-4 h-4" />}
              label="Listing"
              active={activeTab === "listing"}
              onClick={() => handleClick("listing")}
            />
          </div>
        </div>

        {/* ================= PROMOTION ================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <Megaphone className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold uppercase tracking-wide text-gray-900">
              Promotion
            </h3>
          </div>

          <div className="space-y-2">
            <SidebarItem
              icon={<Link2 className="w-4 h-4" />}
              label="Links"
              active={activeTab === "links"}
              onClick={() => handleClick("links")}
            />

            <SidebarItem
              icon={<QrCode className="w-4 h-4" />}
              label="QR"
              active={activeTab === "qr"}
              onClick={() => handleClick("qr")}
            />

            <SidebarItem
              icon={<Rocket className="w-4 h-4" />}
              label="Campaigns"
              active={activeTab === "campaigns"}
              onClick={() => handleClick("campaigns")}
            />
          </div>
        </div>

        {/* ================= INSIGHTS ================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold uppercase tracking-wide text-gray-900">
              Insights
            </h3>
          </div>

          <SidebarItem
            icon={<BarChart3 className="w-4 h-4" />}
            label="Stats"
            active={activeTab === "stats"}
            onClick={() => handleClick("stats")}
          />
        </div>
      </div>

      {/* ================= ACCOUNT ================= */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 px-2">
          <User className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-bold uppercase tracking-wide text-gray-900">
            Account
          </h3>
        </div>

        <SidebarItem
          icon={<SettingsIcon className="w-4 h-4" />}
          label="Settings"
          active={activeTab === "settings"}
          onClick={() => handleClick("settings")}
        />
      </div>
    </div>
  );
}

/* ================= REUSABLE ITEM ================= */

const SidebarItem = ({ icon, label, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-all
        ${
          active
            ? "bg-blue-100 text-blue-600 font-semibold"
            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
        }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default Slidebar;
