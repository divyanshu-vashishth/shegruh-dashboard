import { useState } from "react"
import { cn } from "@/lib/utils"
import {
    Search,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Menu,
    LayoutDashboard,
    FileText,
    Users,
    DollarSign,
    CreditCard,
    ShoppingCart,
    Package,
    FileQuestion,
    ShoppingBag,
    Boxes,
    Bot,
    Lightbulb,
    X,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SquareChartGantt } from "lucide-react"
import { ChevronsLeft } from "lucide-react"
import { ChevronsRight } from "lucide-react"

export function AppSidebar({ isOpen, toggleSidebar }) {
    const [searchValue, setSearchValue] = useState("")

    const navItems = [
        { icon: <LayoutDashboard className="h-4 w-4" />, label: "Dashboard" },
        { icon: <ExternalLink className="h-4 w-4" />, label: "Leads", active: true },
        { icon: <FileText className="h-4 w-4" />, label: "Projects" },
        { icon: <Menu className="h-4 w-4" />, label: "Tasks" },
        { icon: <Users className="h-4 w-4" />, label: "Organizations" },
        { icon: <DollarSign className="h-4 w-4" />, label: "Finance" },
        { icon: <CreditCard className="h-4 w-4" />, label: "Petty Expenses" },
        { icon: <ShoppingCart className="h-4 w-4" />, label: "Payments" },
        { icon: <Package className="h-4 w-4" />, label: "Procurement" },
        { icon: <FileText className="h-4 w-4" />, label: "Material Request" },
        { icon: <FileQuestion className="h-4 w-4" />, label: "RFQ" },
        { icon: <ShoppingBag className="h-4 w-4" />, label: "Purchase Order" },
        { icon: <Boxes className="h-4 w-4" />, label: "Inventory" },
        { icon: <Bot className="h-4 w-4" />, label: "Daizy Assistant" },
        { icon: <Lightbulb className="h-4 w-4" />, label: "Inspirations" },
    ]

    const clearSearch = () => {
        setSearchValue("")
    }

    return (
        <div
            className={cn(
                "h-screen border-r bg-white flex flex-col transition-all duration-300 ease-in-out",
                isOpen ? "w-[180px]" : "w-[60px]",
            )}
        >
            <div className="p-4 border-b flex items-center justify-between">
                <div className={cn("flex items-center gap-2", !isOpen && "justify-center w-full")}>
                    <SquareChartGantt />
                    {isOpen && <span className="font-medium text-lg">Daizy Designs</span>}
                </div>
            </div>

            {isOpen ? (
                <div className="p-2 border-b">
                    <div className="relative flex">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                            className="pl-8 pr-8 h-9 bg-gray-100 border-0"
                            placeholder="Search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        {searchValue && (
                            <Button variant="ghost" size="icon" className="absolute right-1 top-1 h-7 w-7" onClick={clearSearch}>
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={toggleSidebar}>
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                    </div>

                </div>
            ) : (
                <div className="p-2 border-b flex justify-center">
                    <Button variant="ghost" size="icon" className="h-9 w-9" onClick={toggleSidebar}>
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            )}

            <div className="flex-1 overflow-auto">
                <nav className="grid gap-0.5 p-2">
                    {navItems.map((item, index) => (
                        <div
                            key={index}
                            className={cn(
                                "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm cursor-pointer",
                                item.active ? "bg-red-100 text-red-500" : "text-gray-700 hover:bg-gray-100",
                                !isOpen && "justify-center",
                            )}
                        >
                            {item.icon}
                            {isOpen && <span>{item.label}</span>}
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    )
}
