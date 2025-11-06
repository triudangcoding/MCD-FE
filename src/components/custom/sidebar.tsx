import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  PanelLeft,
  LogOut,
  ChevronDown,
  PanelLeftClose,
  Group,
  Settings,
  Key,
  AlertTriangle,
  Building,
  ListOrdered,
  Brush,
  Contact,
  Sparkles,
  Ticket,
  Calendar,
  Calculator
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
// Removed app-specific BranchSelect usage for mock-only Sidebar
import { BranchSelect } from '@/components/global/branch-select';

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  isMobile: boolean;
}

interface SidebarGroupProps {
  title: string;
  items: typeof menuItems;
  collapsed: boolean;
  isMobile: boolean;
  renderMenuItem: (item: typeof menuItems[0]) => React.ReactNode;
  defaultExpanded?: boolean;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', category: 'main', path: '/' },
  { icon: ListOrdered, label: 'Order', category: 'main', path: '/orders' },
  { icon: User, label: 'User', category: 'management', path: '/user' },
  { icon: Group, label: 'Customer', category: 'management', path: '/customer' },
  { icon: Building, label: 'Branch', category: 'management', path: '/branch' },
  { icon: Sparkles, label: 'Service', category: 'management', path: '/service' },
  { icon: Brush, label: 'Department', category: 'management', path: '/department' },
  { icon: Ticket, label: 'Voucher', category: 'management', path: '/voucher' },
  { icon: Calendar, label: 'Schedule', category: 'management', path: '/schedule' },
  { icon: Contact, label: 'Customer Care', category: 'management', path: '/customer-care' },
  { icon: Calculator, label: 'Simulator Algorithm', category: 'main', path: '/simulator-algorithm' },
  { icon: Settings, label: 'Basic Settings', category: 'system', path: '/system/basic' },
  { icon: Key, label: 'Permission System', category: 'system', path: '/system/permission' },
  { icon: AlertTriangle, label: 'Danger Zone', category: 'system', path: '/system/danger' },
];

// Simple grouping without external logic
const filteredMainItems = menuItems.filter((item) => item.category === 'main');
const filteredManagementItems = menuItems.filter((item) => item.category === 'management');
const filteredSystemItems = menuItems.filter((item) => item.category === 'system');

function SidebarGroup({ title, items, collapsed, renderMenuItem, defaultExpanded = true }: SidebarGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    if (!collapsed) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="px-2">
      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.div
            key="group-header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
              className="w-full px-3 py-2 h-auto justify-start hover:bg-accent/50 transition-colors duration-150"
            >
              <div className="flex items-center justify-between w-full">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {title}
                </h2>
                <motion.div
                  animate={{ rotate: isExpanded ? 0 : -90 }}
                  transition={{ duration: 0.15 }}
                >
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </motion.div>
              </div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          height: (isExpanded || collapsed) ? "auto" : 0,
          opacity: (isExpanded || collapsed) ? 1 : 0
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut"
        }}
        className="overflow-hidden"
      >
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.label}>
              {renderMenuItem(item)}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function Sidebar({ collapsed, onCollapse, isMobile }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock user data
  const user = {
    fullName: 'Jane Doe',
    phone: '0123456789',
    avatar: null as null | { url: string },
    hardRole: 'USER',
    roles: [] as Array<string>
  };

  const avatarUrl = user?.avatar?.url ?? '';
  const isDefault = !avatarUrl;

  const handleLogout = () => {
    // Mock logout action
    console.log('Logged out');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  const renderMenuItem = (item: typeof menuItems[0]) => {
    const isActive = location.pathname === item.path ||
      (item.path === '/' && location.pathname === '/');

    const menuButton = (
      <Button
        key={item.label}
        variant={isActive ? "default" : "ghost"}
        size={collapsed ? "icon" : "sm"}
        className={cn(
          "w-full group relative will-change-transform",
          "transition-all duration-150 ease-out",
          collapsed ? "h-8 px-0" : "justify-start h-8 px-3",
          isActive
            ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
            : "hover:bg-accent hover:text-accent-foreground",
          !collapsed && "text-sm font-medium"
        )}
        onClick={() => handleMenuItemClick(item.path)}
        onMouseEnter={() => setHoveredItem(item.label)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <item.icon className={cn(
          "h-4 w-4 flex-shrink-0",
          !collapsed && "mr-2"
        )} />

        {!collapsed && (
          <span className="truncate">{item.label}</span>
        )}

        {/* Tooltip for collapsed state */}
        {collapsed && hoveredItem === item.label && !isMobile && (
          <div className="absolute left-full ml-3 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-md whitespace-nowrap z-50 shadow-md border border-border animate-in fade-in-0 zoom-in-95 duration-150">
            {item.label}
          </div>
        )}
      </Button>
    );

    if (collapsed && !isMobile) {
      return (
        <TooltipProvider key={item.label}>
          <Tooltip>
            <TooltipTrigger asChild>
              {menuButton}
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium">
              {item.label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return menuButton;
  };

  // Animation variants cho sidebar width - đơn giản hóa
  const sidebarVariants = {
    expanded: {
      width: isMobile ? 256 : 192, // w-64 : w-48
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: [0.4, 0.0, 0.2, 1] as [number, number, number, number]
      }
    },
    collapsed: {
      width: isMobile ? 256 : 64, // Keep width on mobile for proper animation
      opacity: isMobile ? 0 : 1,
      x: isMobile ? -256 : 0, // Slide out on mobile
      transition: {
        duration: 0.15,
        ease: [0.4, 0.0, 0.6, 1] as [number, number, number, number]
      }
    }
  };

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <motion.div
      className={cn(
        "bg-card border-r border-border flex flex-col will-change-transform",
        isMobile
          ? "fixed left-0 top-0 h-full z-50 shadow-lg"
          : "relative h-full z-30",
        isMobile && collapsed && "pointer-events-none"
      )}
      animate={collapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      initial={false}
      style={isMobile && collapsed ? { visibility: 'hidden' } : undefined}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-border bg-card/50">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              key="logo-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-primary-foreground font-bold text-sm">D</span>
              </div>
              <div className="flex flex-col">
                <span className="text-foreground font-semibold text-sm">NAILISM</span>
                <span className="text-muted-foreground text-xs">Dashboard</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onCollapse(!collapsed)}
            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-100 ease-out"
          >
            {collapsed ?
              <PanelLeft className="h-4 w-4" /> :
              <PanelLeftClose className="h-4 w-4" />
            }
          </Button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" isHiddenScrollBar={true}>
          <div className="space-y-2 py-4">
            {/* Branch Selector */}
            <BranchSelect collapsed={collapsed} />
            <Separator className="mx-3" />

            {/* Main Navigation Group */}
            {filteredMainItems.length > 0 && (
              <SidebarGroup
                title="Main"
                items={filteredMainItems}
                collapsed={collapsed}
                isMobile={isMobile}
                renderMenuItem={renderMenuItem}
              />
            )}

            {filteredMainItems.length > 0 && (filteredManagementItems.length > 0 || filteredSystemItems.length > 0) && (
              <Separator className="mx-3" />
            )}

            {filteredManagementItems.length > 0 && (
              <SidebarGroup
                title="Management"
                items={filteredManagementItems}
                collapsed={collapsed}
                isMobile={isMobile}
                renderMenuItem={renderMenuItem}
              />
            )}

            {filteredManagementItems.length > 0 && filteredSystemItems.length > 0 && (
              <Separator className="mx-3" />
            )}

            {/* System Group */}
            {filteredSystemItems.length > 0 && (
              <SidebarGroup
                title="System"
                items={filteredSystemItems}
                collapsed={collapsed}
                isMobile={isMobile}
                renderMenuItem={renderMenuItem}
                defaultExpanded={false}
              />
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Footer - đơn giản hóa */}
      <div className="border-t border-border bg-card/50 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center ring-2 ring-background">
            <span className="text-primary text-sm font-medium">
              <Avatar className="h-8 w-8 relative">
                {!isDefault && !isImageLoaded && (
                  <Skeleton className="absolute w-full h-full rounded-full" />
                )}
                <AvatarImage
                  className={`${user?.avatar ? 'object-cover w-full h-full' : ''}`}
                  src={avatarUrl}
                  alt="User"
                  onLoad={() => setIsImageLoaded(true)}
                  onError={() => setIsImageLoaded(false)}
                  style={{ display: isDefault || isImageLoaded ? 'block' : 'none' }}
                />
                <AvatarFallback className="text-xs">
                  {user ? user.avatar ? user.avatar.url : getInitials(user.fullName) : 'U'}
                </AvatarFallback>
              </Avatar>
            </span>
          </div>

          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                key="user-info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.fullName || 'User'}
                </p>

                <p className="text-xs text-muted-foreground truncate">
                  {user?.phone || 'No phone'}
                </p>
                <Badge variant="secondary" className="font-medium text-xs px-2 py-0">
                  Member
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                key="logout-expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="h-8 w-8 text-muted-foreground hover:text-red-600 hover:bg-red-50"
                  aria-label="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {collapsed && !isMobile && (
            <motion.div
              key="logout-collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleLogout}
                      className="w-full h-8 mt-2 text-muted-foreground hover:text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="font-medium">
                    Sign out
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          )}
        </AnimatePresence>

        {collapsed && isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="w-full h-8 mt-2 text-muted-foreground hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}