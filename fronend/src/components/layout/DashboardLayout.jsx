import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import NotificationsModal from "./NotificationsModal";


function DashboardLayout({children}){

  const [showNotifications, setShowNotifications] = useState(false);


return(

<div className="min-h-screen flex flex-col overflow-hidden">

<TopNavbar onOpenNotifications={() => setShowNotifications(true)} />

<div className="flex flex-1 overflow-hidden">

<Sidebar/>

<div className="flex-1 overflow-hidden">

<main className="flex-1 overflow-y-auto p-5 bg-[#FBE7CC]" style={{ height: 'calc(100vh - 4rem)' }}>
  {children}
</main>


</div>


</div>

{showNotifications ? <NotificationsModal onClose={() => setShowNotifications(false)} /> : null}

</div>


)

}


export default DashboardLayout;