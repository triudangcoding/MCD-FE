import { useState, useEffect } from 'react';
import { Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Combobox } from '@/components/custom/Combobox';

interface BranchSelectProps {
  collapsed?: boolean;
  className?: string;
}

export function BranchSelect({ collapsed = false, className }: BranchSelectProps) {
  const [selectedBranch, setSelectedBranch] = useState<string>('');

  const mockBranches = [
    { id: '1', name: 'Main Branch', address: '123 Main St, City' },
    { id: '2', name: 'Downtown Branch', address: '456 Center Ave, City' },
    { id: '3', name: 'Uptown Branch', address: '789 North Rd, City' },
  ];

  useEffect(() => {
    const savedBranch = localStorage.getItem('selectedBranch');
    const branchExists = mockBranches.some((branch) => branch.id === savedBranch);
    if (savedBranch && branchExists) {
      setSelectedBranch(savedBranch);
    } else {
      const firstBranch = mockBranches[0];
      setSelectedBranch(firstBranch?.id || '');
      if (firstBranch?.id) localStorage.setItem('selectedBranch', firstBranch.id);
    }
  }, []);

  const handleBranchChange = (value: string | string[]) => {
    const branchId = Array.isArray(value) ? value[0] : value;
    setSelectedBranch(branchId);
    localStorage.setItem('selectedBranch', branchId);
  };

  const selectedBranchData = mockBranches.find((branch) => branch.id === selectedBranch);

  if (collapsed) {
    return (
      <div className={cn("px-2", className)}>
        <Button
          variant="ghost"
          size="icon"
          className="w-full h-8 justify-center"
        >
          <Building className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  // With mock data we always have branches

  return (
    <div className={cn("px-2", className)}>
      <div className="space-y-2">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
          Branch
        </div>

        <Combobox
          className="w-full"
          label="branch"
          dataArr={mockBranches.map((branch) => ({
            value: branch.id,
            label: branch.name
          }))}
          value={selectedBranch}
          onChange={handleBranchChange}
          contentTrigger={
            <div className="flex items-center gap-2 w-full">
              <Building className="h-4 w-4 text-muted-foreground shrink-0" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="truncate cursor-pointer text-sm">
                    {selectedBranchData && selectedBranchData.name.length > 20
                      ? `${selectedBranchData.name.substring(0, 12)}...`
                      : selectedBranchData?.name || 'Select branch'}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs mx-4">
                  <p className="wrap-break-word">{selectedBranchData?.name || 'Select branch'}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          }
          variantTrigger="outline"
        />

        {selectedBranchData && (
          <div className="text-xs text-muted-foreground px-3">
            {selectedBranchData.address && selectedBranchData.address.length > 30 ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="truncate cursor-pointer">
                    {selectedBranchData.address.substring(0, 22)}...
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs">
                  <p className="wrap-break-word">{selectedBranchData.address}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <div className="truncate">
                {selectedBranchData.address || 'No address'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 