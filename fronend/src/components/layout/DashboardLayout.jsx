import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";


function DashboardLayout({children}){


return(

<div
className="
min-h-screen
flex
flex-col
"
>


<TopNavbar/>


<div
className="
flex
flex-1
"
>


<Sidebar/>


<div
className="
flex-1
"
>

<main
className="
flex
min-h-[calc(100vh-4rem)]
items-center
justify-center
p-6
"
>

{children}

</main>


</div>


</div>


</div>


)

}


export default DashboardLayout;