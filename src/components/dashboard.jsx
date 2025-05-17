import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { LeadsTable } from "@/components/leads-table"
import { leadsData } from "@/data/leads"

export function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [leads, setLeads] = useState(leadsData)
    const [filteredLeads, setFilteredLeads] = useState(leadsData)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState(null)
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: null,
    })
    const [selectedLead, setSelectedLead] = useState(null)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

    useEffect(() => {
        let result = leads

        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(
                (lead) =>
                    lead.clientName.toLowerCase().includes(query) ||
                    lead.projectName.toLowerCase().includes(query) ||
                    lead.phone.includes(query) ||
                    lead.id.includes(query),
            )
        }

        if (statusFilter) {
            result = result.filter((lead) => lead.status.toLowerCase() === statusFilter.toLowerCase())
        }

        if (sortConfig.key && sortConfig.direction) {
            result = [...result].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? -1 : 1
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? 1 : -1
                }
                return 0
            })
        }

        setFilteredLeads(result)
    }, [leads, setLeads, searchQuery, statusFilter, sortConfig])

    const handleSearch = (query) => {
        setSearchQuery(query)
    }

    const handleStatusFilter = (status) => {
        setStatusFilter(status)
    }

    const handleSort = (key) => {
        let direction = "ascending"

        if (sortConfig.key === key) {
            if (sortConfig.direction === "ascending") {
                direction = "descending"
            } else if (sortConfig.direction === "descending") {
                direction = null
            }
        }

        setSortConfig({ key, direction })
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const handleLeadSelect = (lead) => {
        setSelectedLead(lead === selectedLead ? null : lead)
    }

    const handleUpdateModal = (isOpen) => {
        setIsUpdateModalOpen(isOpen)
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <AppSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header toggleSidebar={toggleSidebar} />

                <main className="flex-1 overflow-auto p-4 md:p-6">
                    <LeadsTable
                        leads={filteredLeads}
                        onSearch={handleSearch}
                        onStatusFilter={handleStatusFilter}
                        onSort={handleSort}
                        sortConfig={sortConfig}
                        selectedLead={selectedLead}
                        onSelectLead={handleLeadSelect}
                        isUpdateModalOpen={isUpdateModalOpen}
                        onUpdateModal={handleUpdateModal}
                    />
                </main>
            </div>
        </div>
    )
}
