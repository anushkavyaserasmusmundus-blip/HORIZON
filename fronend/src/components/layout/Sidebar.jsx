import {
    LayoutDashboard,
    Target,
    Brain,
    BookOpen,
    User,
    Settings
} from "lucide-react";


function Sidebar(){

    const menuItems = [
        {
            name:"Dashboard",
            icon:<LayoutDashboard/>
        },
        {
            name:"Goals",
            icon:<Target/>
        },
        {
            name:"Skills",
            icon:<Brain/>
        },
        {
            name:"Learning",
            icon:<BookOpen/>
        },
        {
            name:"Profile",
            icon:<User/>
        },
        {
            name:"Settings",
            icon:<Settings/>
        }
    ];


return (

<aside
className="
w-64
bg-[#FFF8EF]
border-r
border-[#F2D5A5]
p-5
"
>


<nav>

{
menuItems.map((item)=>(

<div
key={item.name}
className="
flex
items-center
gap-3
p-3
rounded-lg
cursor-pointer
hover:bg-[#F9C966]
transition
"
>

{item.icon}

<span>
{item.name}
</span>


</div>

))
}


</nav>


</aside>


)

}


export default Sidebar;