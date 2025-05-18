import { useState, useRef } from "react"
import { Search, Filter, Grid, MoreVertical, ChevronDown, Edit, X, Check, PlusCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { SquareActivityIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export function LeadsTable({
    leads,
    onSearch,
    onStatusFilter,
    onSort,
    sortConfig,
    selectedLead,
    onSelectLead,
    onLeadChange,
}) {
    const [searchValue, setSearchValue] = useState("")
    const [updateText, setUpdateText] = useState("")
    const updateTextareaRef = useRef(null)
    const [isInlineEditing, setIsInlineEditing] = useState(false)
    const [localLeads, setLocalLeads] = useState(leads)
    const [statusFilter, setStatusFilter] = useState("all")

    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearchValue(value)
        onSearch(value)
    }

    const clearSearch = () => {
        setSearchValue("")
        onSearch("")
    }

    const handleStatusChange = (value) => {
        setStatusFilter(value)
        if (value === "all") {
            onStatusFilter(null)
        } else {
            onStatusFilter(value)
        }
    }

    const handleStatusUpdate = (leadId, newStatus) => {
        const updatedLeads = localLeads.map(lead => 
            lead.id === leadId ? {...lead, status: newStatus} : lead
        )
        setLocalLeads(updatedLeads)
    }

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "created":
                return "bg-gray-100 text-gray-700"
            case "estimate shared":
                return "bg-orange-100 text-orange-700"
            case "visit planned":
                return "bg-yellow-100 text-yellow-700"
            case "assigned":
                return "bg-orange-100 text-orange-700"
            default:
                return "bg-gray-100 text-gray-700"
        }
    }

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) {
            return null
        }

        return sortConfig.direction === "ascending" ? "↑" : "↓"
    }

    const handleLeadSelect = (lead) => {
        onSelectLead(lead)
        if (isInlineEditing && selectedLead?.id !== lead.id) {
            setIsInlineEditing(false)
        }
    }

    const handleHeaderEditClick = (e) => {
        e.stopPropagation()
        if (selectedLead) {
            setIsInlineEditing(true)
            setUpdateText(selectedLead.lastUpdate || "")

            setTimeout(() => {
                if (updateTextareaRef.current) {
                    updateTextareaRef.current.focus()
                }
            }, 0)
        }
    }

    const handleInlineUpdateSave = (action) => {
        if(action=="approve"){
            setLocalLeads(localLeads.map(lead => 
                lead.id === selectedLead.id ? {...lead, lastUpdate: updateText} : lead
            ))
            onLeadChange(localLeads)
            setIsInlineEditing(false)
        }else{
            setIsInlineEditing(false)
        }
    }

    const handleTextareaChange = (e) => {
        setUpdateText(e.target.value)
    }

    const formatLastUpdate = (text) => {
        if (!text) return "";

        const parts = text.split(/(\[.*?\])/);

        return parts.map((part, index) => {
            if (part.startsWith('[') && part.endsWith(']')) {
                return <span key={index} className="font-bold">{part}</span>;
            }
            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h1 className="text-3xl font-medium flex items-center">
                    Leads
                    <PlusCircle className="ml-1 mt-1.5 bg-orange-600 rounded-full" />
                </h1>

                <div className="flex items-center gap-2 flex-wrap">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                            className="pl-8 pr-8 h-9 w-[200px]"
                            placeholder="Search"
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                        {searchValue && (
                            <Button variant="ghost" size="icon" className="absolute right-1 top-1 h-7 w-7" onClick={clearSearch}>
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>

                    <Select value={statusFilter} onValueChange={handleStatusChange}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue>
                                {statusFilter === "all" ? "All Statuses" : 
                                    statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                            </SelectValue>
                            <span className="text-gray-500">+{leads.length}</span>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="created">Created</SelectItem>
                            <SelectItem value="assigned">Assigned</SelectItem>
                            <SelectItem value="estimate shared">Estimate Shared</SelectItem>
                            <SelectItem value="visit planned">Visit Planned</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button variant="ghost" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>

                    <Button variant="ghost" size="icon">
                        <Grid className="h-4 w-4" />
                    </Button>

                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="border rounded-md overflow-hidden overflow-x-auto">
                <table className="w-full min-w-[600px]">
                    <thead>
                        <tr className="bg-gray-50 border-b text-left">

                            <th
                                className="px-4 py-2 font-medium text-sm cursor-pointer hover:bg-gray-100"
                                onClick={() => onSort("id")}
                            >
                                ID {getSortIcon("id")}
                            </th>


                            <th
                                className="px-4 py-2 font-medium text-sm cursor-pointer hover:bg-gray-100"
                                onClick={() => onSort("clientName")}
                            >
                                Client Name {getSortIcon("clientName")}
                            </th>


                            <th
                                className="px-4 py-2 font-medium text-sm cursor-pointer hover:bg-gray-100"
                                onClick={() => onSort("status")}
                            >
                                Status {getSortIcon("status")}
                            </th>

                            <th className="px-4 py-2 font-medium text-sm">Phone</th>
                            <th className="px-4 py-2 font-medium text-sm">Follow Up</th>

                            <th
                                className="px-4 py-2 font-medium text-sm cursor-pointer hover:bg-gray-100"
                                onClick={() => onSort("createdDate")}
                            >
                                Created Date {getSortIcon("createdDate")}
                            </th>


                            <th
                                className="px-4 py-2 font-medium text-sm cursor-pointer hover:bg-gray-100"
                                onClick={() => onSort("projectName")}
                            >
                                Project Name {getSortIcon("projectName")}
                            </th>

                            <th className="px-4 py-2 font-medium text-sm">Assigned To</th>
                            <th className="px-4 py-2 font-medium text-sm">Budget</th>

                            <th className="px-4 py-2 font-medium text-sm">
                                Last Update
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-5 w-5 ml-1"
                                    onClick={handleHeaderEditClick}
                                    disabled={!selectedLead}
                                >
                                    <Edit className="h-3 w-3" />
                                </Button>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead) => (
                            <tr
                                key={lead.id}
                                className={cn(
                                    "border-b hover:bg-pink-50 cursor-pointer",
                                    selectedLead?.id === lead.id && "bg-pink-100"
                                )}
                                onClick={() => handleLeadSelect(lead)}
                            >
                                <td className="px-4 py-2 text-sm">{lead.id}</td>
                                <td className="px-4 py-2 text-sm">{lead.clientName}</td>

                                <td className="px-4 py-2 text-sm">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                                                <Badge variant="outline" className={cn(getStatusColor(lead.status), "border-0 rounded-md px-2")}>
                                                    {lead.status}
                                                </Badge>
                                                <ChevronDown className="h-4 w-4 ml-1 text-gray-400" />
                                            </div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>
                                                {lead.status}
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => handleStatusUpdate(lead.id, "Created")}>Created</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusUpdate(lead.id, "Assigned")}>Assigned</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusUpdate(lead.id, "Estimate Shared")}>Estimate Shared</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleStatusUpdate(lead.id, "Visit Planned")}>Visit Planned</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>

                                <td className="px-4 py-2 text-sm">{lead.phone}</td>

                                <td className="px-4 py-2 text-sm">
                                    <div className="relative h-6 w-6 rounded border flex items-center justify-center">
                                        <SquareActivityIcon />
                                        <div className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px]">
                                            {Math.floor(Math.random() * 5) + 1}
                                        </div>

                                    </div>
                                </td>

                                <td className="px-4 py-2 text-sm">{lead.createdDate}</td>
                                <td className="px-4 py-2 text-sm">{lead.projectName}</td>

                                <td className="px-4 py-2 text-sm">
                                    <div className="flex flex-wrap gap-1">
                                        {Array.isArray(lead.assignedTo) ? (
                                            lead.assignedTo.map((assignedTo, index) => (
                                                <div key={index} className="h-6 px-2 rounded-full bg-gray-100 border border-gray-700 inline-flex items-center justify-center text-xs">
                                                    {assignedTo}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="h-6 px-2 rounded-full bg-gray-100 border border-gray-700 inline-flex items-center justify-center text-xs">
                                                {lead.assignedTo}
                                            </div>
                                        )}
                                    </div>
                                </td>

                                <td className="px-4 py-2 text-sm">{lead.budget || ""}</td>

                                <td className="px-4 py-2 text-sm">
                                    {selectedLead?.id === lead.id && isInlineEditing ? (
                                        <div className="flex flex-col gap-2 relative">
                                            <div className="flex items-start">
                                                <Textarea
                                                    ref={updateTextareaRef}
                                                    value={updateText}
                                                    onChange={handleTextareaChange}
                                                    className="min-h-[60px] text-xs flex-grow"
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                <div className="flex flex-col gap-1 ml-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6 bg-green-100 text-green-700 hover:bg-green-200 rounded-full"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleInlineUpdateSave("approve");
                                                        }}
                                                    >
                                                        <Check className="h-3 w-3" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6 bg-red-100 text-red-700 hover:bg-red-200 rounded-full"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleInlineUpdateSave("reject");
                                                        }}
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="text-xs">
                                            {lead.lastUpdate ? formatLastUpdate(lead.lastUpdate) : ""}
                                        </span>
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
