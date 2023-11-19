import { SidebarNav } from '../components/sidebar-nav'
import { buttonVariants } from '../shadcn/components/ui/button'
import { cn } from '../shadcn/lib/utils'
import { supabase } from "../supabase/supabaseClient";

const sidebarNavItems = [
    {
        title: "Game History",
        href: "/game-history",
    },
    {
        title: "Tournament",
        href: "/tournament",
    },
    {
        title: "Profile",
        href: "/profile",
    },
]



function logOut() {
    supabase.auth.signOut();
}

function DashBoard() {
    return (
        <main className="">
            <aside className="bg-secondary max-w-[15rem] w-full min-h-screen p-5 flex flex-col fixed">
                <a href="/game-history">
                    <img src="./logo.png" className='w-[10rem] max-w-[10rem] pb-10' alt="Logo" />
                </a>
                <SidebarNav items={sidebarNavItems} />
                <div className='grow'></div>
                <button
                    onClick={logOut}
                    className={cn(
                        buttonVariants({ variant: "link" }),
                        "hover:bg-slate-200 hover:underline justify-start"
                    )}
                >
                    Logout
                </button>
            </aside>
        </main>
    )
}

export default DashBoard