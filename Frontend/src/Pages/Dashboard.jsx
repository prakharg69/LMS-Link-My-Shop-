import React, { useEffect } from "react";
import Nav from "../Components/Nav";
import Slidebar from "../Components/Slidebar";
import { useGlobalState } from "../Context/GlobalContext";

// import pages
import Stores from "../Pages/Stores";
import Listing from "../Pages/Listing";
import Links from "../Pages/Links";
import QR from "../Pages/QR";
import Stats from "../Pages/Stats";
import Campaigns from "../Pages/Campaigns";
import Settings from "../Pages/Settings";
import { useAuth } from "../Redux/hook";
import { useFetchUser } from "../Hooks/getUser";
function Dashboard() {
  const {user} = useAuth()
  const { activeTab } = useGlobalState();
  useFetchUser();
  useEffect(()=>{
      console.log("userDaTA is :",user);
      
  },[user])

  const renderContent = () => {
    switch (activeTab) {
      case "stores":
        return <Stores />;

      case "listing":
        return <Listing />;

      case "links":
        return <Links />;

      case "qr":
        return <QR />;

      case "stats":
        return <Stats />;

      case "campaigns":
        return <Campaigns />;

      case "settings":
        return <Settings />;

      default:
        return <Stores />; // fallback
    }
  };

  return (
    <div className="h-screen w-screen bg-blue-200 p-3 flex flex-col">
      {/* Navbar */}
      <Nav />

      {/* Content area */}
      <div className="flex flex-1 gap-2 mt-2 overflow-hidden">
        {/* Sidebar */}
        <div className="w-2/12 bg-white rounded-2xl overflow-y-auto p-2 px-4">
          <Slidebar />
        </div>

        {/* Main Content */}
        <div className="w-10/12 bg-white rounded-2xl overflow-y-auto ">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
