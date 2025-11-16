import { useState } from 'react';
import { Search, Plus, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FilterPopover, type FilterOption, type FilterItem } from '@/components/custom/filter.popover';
import { USER_FILTER_OPTIONS } from '@/pages/users/user.constant';

// Mock data types
interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar: string;
  status: 'active' | 'inactive';
  availability: 'ONLINE' | 'OFFLINE' | 'SCHEDULED';
  role: string;
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Manager 01',
    phone: '0889001599',
    email: 'manager01@example.com',
    avatar: 'https://nailism-bucket-production.s3.us-east-1.amazonaws.com/images/90854a3a-444a-462f-9fab-43905a073e39.png',
    status: 'active',
    availability: 'OFFLINE',
    role: 'Branch Manager',
  },
  {
    id: '2',
    name: 'Trang Vo',
    phone: '5551000005',
    email: 'trang.vo@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
    status: 'active',
    availability: 'SCHEDULED',
    role: 'Nail Technician',
  },
  {
    id: '3',
    name: 'Kevin Le',
    phone: '5551000004',
    email: 'kevin.le@example.com',
    avatar: 'https://i.pravatar.cc/150?img=4',
    status: 'active',
    availability: 'SCHEDULED',
    role: 'Nail Technician',
  },
  {
    id: '4',
    name: 'Linh Pham',
    phone: '5551000003',
    email: 'linh.pham@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    status: 'active',
    availability: 'SCHEDULED',
    role: 'Nail Technician',
  },
  {
    id: '5',
    name: 'David Tran',
    phone: '5551000002',
    email: 'david.tran@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    status: 'active',
    availability: 'SCHEDULED',
    role: 'Nail Technician',
  },
  {
    id: '6',
    name: 'An Nguyen',
    phone: '5551000001',
    email: 'an.nguyen@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'active',
    availability: 'SCHEDULED',
    role: 'Branch Manager',
  },
  {
    id: '7',
    name: 'Mai Nguyen',
    phone: '0901234567',
    email: 'mai.nguyen@example.com',
    avatar: 'https://i.pravatar.cc/150?img=6',
    status: 'active',
    availability: 'ONLINE',
    role: 'Nail Technician',
  },
  {
    id: '8',
    name: 'Hoa Tran',
    phone: '0912345678',
    email: 'hoa.tran@example.com',
    avatar: 'https://i.pravatar.cc/150?img=7',
    status: 'active',
    availability: 'ONLINE',
    role: 'Nail Technician',
  },
  {
    id: '9',
    name: 'Lan Pham',
    phone: '0923456789',
    email: 'lan.pham@example.com',
    avatar: 'https://i.pravatar.cc/150?img=8',
    status: 'active',
    availability: 'SCHEDULED',
    role: 'Nail Technician',
  },
  {
    id: '10',
    name: 'Thao Le',
    phone: '0934567890',
    email: 'thao.le@example.com',
    avatar: 'https://i.pravatar.cc/150?img=9',
    status: 'active',
    availability: 'OFFLINE',
    role: 'Nail Technician',
  },
  {
    id: '11',
    name: 'Manager 02',
    phone: '0945678901',
    email: 'manager02@example.com',
    avatar: 'https://i.pravatar.cc/150?img=10',
    status: 'active',
    availability: 'ONLINE',
    role: 'Branch Manager',
  },
  {
    id: '12',
    name: 'Huyen Vo',
    phone: '0956789012',
    email: 'huyen.vo@example.com',
    avatar: 'https://i.pravatar.cc/150?img=11',
    status: 'active',
    availability: 'SCHEDULED',
    role: 'Nail Technician',
  },
  {
    id: '13',
    name: 'Nga Tran',
    phone: '0967890123',
    email: 'nga.tran@example.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
    status: 'active',
    availability: 'ONLINE',
    role: 'Nail Technician',
  },
  {
    id: '14',
    name: 'Quynh Pham',
    phone: '0978901234',
    email: 'quynh.pham@example.com',
    avatar: 'https://i.pravatar.cc/150?img=13',
    status: 'active',
    availability: 'OFFLINE',
    role: 'Nail Technician',
  },
  {
    id: '15',
    name: 'My Le',
    phone: '0989012345',
    email: 'my.le@example.com',
    avatar: 'https://i.pravatar.cc/150?img=14',
    status: 'active',
    availability: 'SCHEDULED',
    role: 'Nail Technician',
  },
  {
    id: '16',
    name: 'Dung Nguyen',
    phone: '0990123456',
    email: 'dung.nguyen@example.com',
    avatar: 'https://i.pravatar.cc/150?img=15',
    status: 'inactive',
    availability: 'OFFLINE',
    role: 'Nail Technician',
  },
  {
    id: '17',
    name: 'Huong Tran',
    phone: '0901234568',
    email: 'huong.tran@example.com',
    avatar: 'https://i.pravatar.cc/150?img=16',
    status: 'active',
    availability: 'ONLINE',
    role: 'Nail Technician',
  },
  {
    id: '18',
    name: 'Van Pham',
    phone: '0912345679',
    email: 'van.pham@example.com',
    avatar: 'https://i.pravatar.cc/150?img=17',
    status: 'active',
    availability: 'SCHEDULED',
    role: 'Nail Technician',
  },
  {
    id: '19',
    name: 'Loan Le',
    phone: '0923456780',
    email: 'loan.le@example.com',
    avatar: 'https://i.pravatar.cc/150?img=18',
    status: 'active',
    availability: 'OFFLINE',
    role: 'Nail Technician',
  },
  {
    id: '20',
    name: 'Manager 03',
    phone: '0934567891',
    email: 'manager03@example.com',
    avatar: 'https://i.pravatar.cc/150?img=19',
    status: 'active',
    availability: 'ONLINE',
    role: 'Branch Manager',
  },
  {
    id: '21',
    name: 'Bich Vo',
    phone: '0945678902',
    email: 'bich.vo@example.com',
    avatar: 'https://i.pravatar.cc/150?img=20',
    status: 'active',
    availability: 'SCHEDULED',
    role: 'Nail Technician',
  },
  {
    id: '22',
    name: 'Hang Tran',
    phone: '0956789013',
    email: 'hang.tran@example.com',
    avatar: 'https://i.pravatar.cc/150?img=21',
    status: 'active',
    availability: 'ONLINE',
    role: 'Nail Technician',
  },
  {
    id: '23',
    name: 'Lien Pham',
    phone: '0967890124',
    email: 'lien.pham@example.com',
    avatar: 'https://i.pravatar.cc/150?img=22',
    status: 'inactive',
    availability: 'OFFLINE',
    role: 'Nail Technician',
  },
  {
    id: '24',
    name: 'Tuyet Le',
    phone: '0978901235',
    email: 'tuyet.le@example.com',
    avatar: 'https://i.pravatar.cc/150?img=23',
    status: 'active',
    availability: 'SCHEDULED',
    role: 'Nail Technician',
  },
  {
    id: '25',
    name: 'Nhung Nguyen',
    phone: '0989012346',
    email: 'nhung.nguyen@example.com',
    avatar: 'https://i.pravatar.cc/150?img=24',
    status: 'active',
    availability: 'ONLINE',
    role: 'Nail Technician',
  },
  {
    id: '26',
    name: 'Phuong Tran',
    phone: '0990123457',
    email: 'phuong.tran@example.com',
    avatar: 'https://i.pravatar.cc/150?img=25',
    status: 'active',
    availability: 'OFFLINE',
    role: 'Nail Technician',
  },
  {
    id: '27',
    name: 'Diep Pham',
    phone: '0901234569',
    email: 'diep.pham@example.com',
    avatar: 'https://i.pravatar.cc/150?img=26',
    status: 'active',
    availability: 'SCHEDULED',
    role: 'Nail Technician',
  },
  {
    id: '28',
    name: 'Hong Le',
    phone: '0912345680',
    email: 'hong.le@example.com',
    avatar: 'https://i.pravatar.cc/150?img=27',
    status: 'active',
    availability: 'ONLINE',
    role: 'Nail Technician',
  },
  {
    id: '29',
    name: 'Manager 04',
    phone: '0923456781',
    email: 'manager04@example.com',
    avatar: 'https://i.pravatar.cc/150?img=28',
    status: 'active',
    availability: 'OFFLINE',
    role: 'Branch Manager',
  },
  {
    id: '30',
    name: 'Thuy Vo',
    phone: '0934567892',
    email: 'thuy.vo@example.com',
    avatar: 'https://i.pravatar.cc/150?img=29',
    status: 'active',
    availability: 'SCHEDULED',
    role: 'Nail Technician',
  },
  {
    id: '31',
    name: 'Nhi Tran',
    phone: '0945678903',
    email: 'nhi.tran@example.com',
    avatar: 'https://i.pravatar.cc/150?img=30',
    status: 'active',
    availability: 'ONLINE',
    role: 'Nail Technician',
  },
  {
    id: '32',
    name: 'Uyen Pham',
    phone: '0956789014',
    email: 'uyen.pham@example.com',
    avatar: 'https://i.pravatar.cc/150?img=31',
    status: 'active',
    availability: 'OFFLINE',
    role: 'Nail Technician',
  },
  {
    id: '33',
    name: 'Vy Le',
    phone: '0967890125',
    email: 'vy.le@example.com',
    avatar: 'https://i.pravatar.cc/150?img=32',
    status: 'inactive',
    availability: 'OFFLINE',
    role: 'Nail Technician',
  },
  {
    id: '34',
    name: 'Kieu Nguyen',
    phone: '0978901236',
    email: 'kieu.nguyen@example.com',
    avatar: 'https://i.pravatar.cc/150?img=33',
    status: 'active',
    availability: 'SCHEDULED',
    role: 'Nail Technician',
  },
  {
    id: '35',
    name: 'Manager 05',
    phone: '0989012347',
    email: 'manager05@example.com',
    avatar: 'https://i.pravatar.cc/150?img=34',
    status: 'active',
    availability: 'ONLINE',
    role: 'Branch Manager',
  },
];

export default function UsersManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterList, setFilterList] = useState<FilterItem[]>([]);

  // Define filter options
  // Helper function to check if a filter matches
  const matchesFilter = (key: string, value: string): boolean => {
    const filter = filterList.find((f) => f.key === key);
    if (!filter || filter.values.length === 0) return true;
    return filter.values.includes(value);
  };

  // Filter users based on search query and filters
  const filteredUsers = mockUsers.filter((user) => {
    // Search filter
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply filters from filterList
    const matchesStatus = matchesFilter('status', user.status);
    const matchesAvailability = matchesFilter('availability', user.availability);
    const matchesRole = matchesFilter('role', user.role);

    return (
      matchesSearch && matchesStatus && matchesAvailability && matchesRole
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const getStatusBadgeVariant = (status: string) => {
    return status === 'active' ? 'dashed-success' : 'dashed-destructive';
  };

  const getAvailabilityBadgeVariant = (availability: string) => {
    if (availability === 'ONLINE') return 'dashed-success';
    if (availability === 'SCHEDULED') return 'dashed-info';
    return 'dashed';
  };

  const getRoleBadgeVariant = (role: string) => {
    if (role === 'Branch Manager') return 'dashed-rose';
    return 'outline';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Search and Filters - Fixed */}
      <div className="mb-4 space-y-4 flex-shrink-0">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                className="transition-all focus:ring-2 focus:ring-primary/20 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 duration-300 h-10 pl-10"
                placeholder="Search users by name, phone, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <FilterPopover
              filterOptions={USER_FILTER_OPTIONS}
              filterList={filterList}
              onFilterListChange={setFilterList}
              open={isFilterOpen}
              onOpenChange={setIsFilterOpen}
            />
            <Button size="sm" className="w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              Add new user
            </Button>
          </div>
        </div>
      </div>

      {/* Users Grid - Scrollable */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <ScrollArea className="h-full w-full pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 p-2">
            {paginatedUsers.map((user) => (
              <Card
                key={user.id}
                className="bg-card text-card-foreground flex flex-col gap-2 rounded-xl border shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200 p-3 sm:p-4"
              >
                <CardContent className="p-0 h-full flex flex-col">
                  {/* Mobile Layout */}
                  <div className="flex sm:hidden w-full items-start space-x-3 mb-3">
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <Avatar className="w-16 h-16 rounded-lg flex-shrink-0 relative">
                          <AvatarImage
                            src={user.avatar}
                            alt={user.name}
                            className="aspect-square size-full rounded-lg object-cover w-full h-full"
                          />
                        </Avatar>
                      </div>
                      <div className="mb-2">
                        <Badge variant={getStatusBadgeVariant(user.status)}>
                          {user.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-semibold text-sm truncate leading-tight mb-2"
                        title={user.name}
                      >
                        {user.name}
                      </h3>
                      <p
                        className="text-xs text-muted-foreground truncate leading-tight mb-3"
                        title={user.phone}
                      >
                        {user.phone}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        <Badge variant={getAvailabilityBadgeVariant(user.availability)}>
                          {user.availability}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.role}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:flex w-full">
                    <div className="flex flex-col items-center justify-center w-20 flex-shrink-0">
                      <div className="relative">
                        <Avatar className="w-16 h-16 rounded-lg flex-shrink-0 relative">
                          <AvatarImage
                            src={user.avatar}
                            alt={user.name}
                            className="aspect-square size-full rounded-lg object-cover w-full h-full"
                          />
                        </Avatar>
                      </div>
                      <div className="mt-2">
                        <Badge variant={getStatusBadgeVariant(user.status)}>
                          {user.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                    <Separator orientation="vertical" className="mx-3 flex-shrink-0" />
                    <div className="flex-1 flex flex-col justify-center space-y-2 min-w-0 py-2">
                      <div>
                        <h3
                          className="font-semibold text-sm truncate leading-tight"
                          title={user.name}
                        >
                          {user.name}
                        </h3>
                      </div>
                      <div>
                        <p
                          className="text-xs text-muted-foreground truncate leading-tight"
                          title={user.phone}
                        >
                          {user.phone}
                        </p>
                      </div>
                      <div>
                        <div className="flex flex-wrap gap-1.5">
                          <Badge variant={getAvailabilityBadgeVariant(user.availability)}>
                            {user.availability}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-wrap gap-1.5">
                          <Badge variant={getRoleBadgeVariant(user.role)}>
                            {user.role}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Pagination - Fixed */}
      <div className="mt-4 flex-shrink-0">
        <Card className="bg-card text-card-foreground flex flex-col gap-2 rounded-xl border py-4 shadow-sm">
          <CardContent className="px-2">
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-sm text-muted-foreground">Show</span>
                <select
                  className="flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-16 h-8"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                </select>
                <span className="text-sm text-muted-foreground">per page</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages || 1}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="h-4 w-4" />
                  <span className="hidden sm:inline ml-1">First</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline ml-1">Prev</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <span className="hidden sm:inline mr-1">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <span className="hidden sm:inline mr-1">Last</span>
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

