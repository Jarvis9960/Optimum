
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Users, Search, Plus, Eye, Archive, Trash2, Flag, Link as LinkIcon, UserPlus } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email?: string;
  username?: string;
  phone: string;
  isPrivate: boolean;
  clientType: 'training' | 'mind' | 'both';
  joinMethod: 'manual' | 'link';
  lastVisit: string;
  status: 'active' | 'archived';
}

const Clients: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      isPrivate: false,
      clientType: 'training',
      joinMethod: 'manual',
      lastVisit: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Emma Johnson',
      username: 'emma_j',
      phone: '+1 (555) 234-5678',
      isPrivate: true,
      clientType: 'mind',
      joinMethod: 'link',
      lastVisit: '2024-01-14',
      status: 'active'
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael.brown@email.com',
      phone: '+1 (555) 345-6789',
      isPrivate: false,
      clientType: 'both',
      joinMethod: 'manual',
      lastVisit: '2024-01-10',
      status: 'active'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      username: 'sarah_w',
      phone: '+1 (555) 456-7890',
      isPrivate: true,
      clientType: 'training',
      joinMethod: 'link',
      lastVisit: '2024-01-12',
      status: 'archived'
    },
    // Add more mock clients
    ...Array.from({ length: 20 }, (_, i) => ({
      id: `client_${i + 5}`,
      name: `Client ${i + 5}`,
      email: i % 3 === 0 ? undefined : `client${i + 5}@email.com`,
      username: i % 3 === 0 ? `client_${i + 5}` : undefined,
      phone: `+1 (555) ${String(i + 5).padStart(3, '0')}-0000`,
      isPrivate: i % 3 === 0,
      clientType: ['training', 'mind', 'both'][i % 3] as 'training' | 'mind' | 'both',
      joinMethod: i % 2 === 0 ? 'manual' : 'link' as 'manual' | 'link',
      lastVisit: '2024-01-01',
      status: i % 5 === 4 ? 'archived' : 'active' as 'active' | 'archived'
    }))
  ]);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (client.username && client.username.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);

  const handleDeleteClient = (clientId: string) => {
    setClients(clients.filter(client => client.id !== clientId));
  };

  const handleArchiveClient = (clientId: string) => {
    setClients(clients.map(client => 
      client.id === clientId 
        ? { ...client, status: client.status === 'active' ? 'archived' : 'active' }
        : client
    ));
  };

  const getClientTypeIcon = (type: Client['clientType']) => {
    switch (type) {
      case 'training':
        return <Flag className="h-4 w-4 text-blue-600" />;
      case 'mind':
        return <Flag className="h-4 w-4 text-purple-600" />;
      case 'both':
        return <Flag className="h-4 w-4 text-green-600" />;
    }
  };

  const getClientTypeBadge = (type: Client['clientType']) => {
    const colors = {
      training: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      mind: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      both: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    };
    
    return (
      <Badge className={colors[type]}>
        {type === 'both' ? 'Training + Mind' : type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const getJoinMethodBadge = (method: Client['joinMethod']) => {
    const colors = {
      manual: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
      link: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
    };
    
    return (
      <Badge className={colors[method]}>
        {method === 'manual' ? 'Manual' : 'Via Link'}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 overflow-x-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('nav.clients')}
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your clients and their information
          </p>
        </div>
        <Button className="mt-4 md:mt-0 medical-gradient text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add New Client
        </Button>
      </div>

      {/* Search and Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Show:</span>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Clients ({filteredClients.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Join Method</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold text-sm">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {client.isPrivate ? (
                        <p className="text-muted-foreground">@{client.username}</p>
                      ) : (
                        <p>{client.email}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getClientTypeIcon(client.clientType)}
                      {getClientTypeBadge(client.clientType)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getJoinMethodBadge(client.joinMethod)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleArchiveClient(client.id)}
                      >
                        <Archive className="h-3 w-3" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Client</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {client.name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteClient(client.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete Client
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Clients;
