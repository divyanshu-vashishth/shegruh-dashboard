import { useState } from 'react'
// import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
// import { Check, X } from 'lucide-react';

const leadsData = [
  { id: 564, clientName: 'Ritesh', status: 'Created', phone: '+919997937444', followUp: '14-May-25 12:57 PM', projectName: 'Dehradun - Ritesh', assignedTo: 'VR', budget: '', lastUpdate: '[VR] Lead Created (14-May-25)' },
  { id: 563, clientName: 'Sap test', status: 'Estimate Shared', phone: '+917003965447', followUp: '13-May-25 11:51 AM', projectName: 'Sap Proj test', assignedTo: 'SB', budget: '', lastUpdate: '[PR] Call after 2 days (13-May-25)' },
  { id: 562, clientName: 'Tanvi Mahajan', status: 'Created', phone: '+919464681530', followUp: '10-May-25 04:57 PM', projectName: 'Project - 6969', assignedTo: '', budget: '', lastUpdate: '[S] Lead Created (10-May-25)' }
];

function App() {

  return (
    <>
        <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Leads</h2>
        <Input placeholder="Search" className="w-64" />
      </div>
      <ScrollArea className="h-[70vh]">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Client Name</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Follow Up</th>
              <th className="px-4 py-2">Project Name</th>
              <th className="px-4 py-2">Assigned To</th>
              <th className="px-4 py-2">Budget</th>
              <th className="px-4 py-2">Last Update</th>
            </tr>
          </thead>
          <tbody>
            {leadsData.map((lead) => (
              <tr key={lead.id} className="border-b">
                <td className="px-4 py-2">{lead.id}</td>
                <td className="px-4 py-2">{lead.clientName}</td>
                <td className="px-4 py-2">
                  <Select defaultValue={lead.status} className="w-32">
                    <SelectTrigger>{lead.status}</SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Created">Created</SelectItem>
                      <SelectItem value="Estimate Shared">Estimate Shared</SelectItem>
                      <SelectItem value="Visit Planned">Visit Planned</SelectItem>
                      <SelectItem value="Assigned">Assigned</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-2">{lead.phone}</td>
                <td className="px-4 py-2">{lead.followUp}</td>
                <td className="px-4 py-2">{lead.projectName}</td>
                <td className="px-4 py-2">{lead.assignedTo}</td>
                <td className="px-4 py-2">{lead.budget}</td>
                <td className="px-4 py-2 flex items-center">
                  <Textarea placeholder="Describe your remarks" className="mr-2" />
                  <Button variant="ghost" className="p-1"><Check size={16} /></Button>
                  <Button variant="ghost" className="p-1"><X size={16} /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </div>
    </>
  )
}

export default App
