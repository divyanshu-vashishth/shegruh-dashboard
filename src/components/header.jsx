import { Bell, MoreVertical, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
    return (
        <header className="h-[50px] border-b bg-white flex items-center justify-between px-4">

            <div className="flex items-center gap-x-8 ml-auto">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-full bg-pink-100 text-pink-500 border-pink-200 hover:bg-pink-200 hover:text-pink-600 hover:border-pink-300"
                >
                    <span className="mr-1">+</span> Smart Actions
                </Button>

                <div className="relative">
                    <Bell className="h-5 w-5 text-gray-500" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px]">
                        9
                    </span>
                </div>

                <div className="relative">
                    <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">Hi</div>
                    <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px]">
                        15
                    </span>
                </div>

                <div className="flex items-center gap-2 ml-2">
                    <span className="font-medium hidden sm:inline">Siddhart Singh</span>
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                </div>
            </div>
        </header>
    )
}
