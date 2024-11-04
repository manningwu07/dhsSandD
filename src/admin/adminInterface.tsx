'use client';

import { useState, useEffect, useCallback } from 'react';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Button } from '~/components/ui/button';
import { fetchFullContent } from '~/utils/pageUtils';
import { DataStructure, transformFullContent } from '~/utils/dataStructure';
import { renderEditField } from './renderEditField';
import { DeployDialog } from './DeployDialog';
import { PreviewPane } from './PreviewPane';
import { EmailManagementDialog } from './emailManagementDialog';

export default function AdminInterface() {
  const [data, setData] = useState<DataStructure | null>(null);
  const [activePage, setActivePage] = useState('landing');
  const [sliderPosition, setSliderPosition] = useState(33);
  const [isDragging, setIsDragging] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);

  useEffect(() => {
    async function loadFullContent() {
      const fullContent = await fetchFullContent();
      if (fullContent) {
        const formattedData: DataStructure = transformFullContent(fullContent);
        setData(formattedData as DataStructure);
      } else {
        console.error('Failed to load content for admin interface.');
      }
    }

    loadFullContent();
  }, []);

  const handleEdit = (path: string, value: any) => {
    setData((prev) => setNestedValue(prev, path, value));
  };

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newPosition = (e.clientX / window.innerWidth) * 100;
        setSliderPosition(Math.max(10, Math.min(90, newPosition)));
      }
    },
    [isDragging],
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <div className="border-b p-4 flex justify-between items-center">
        <DeployDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          isDeploying={isDeploying}
          setIsDeploying={setIsDeploying}
          data={data}
        />
        <EmailManagementDialog
          isOpen={isEmailDialogOpen}
          setIsOpen={setIsEmailDialogOpen}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <ScrollArea className="border-r" style={{ width: `${sliderPosition}%` }}>
          <div className="space-y-8 p-8">
            <ScrollArea className="w-full">
              <div className="flex pb-4 flex-wrap">
                {['landing', 'about', 'board', 'parents', 'tournament', 'clubEvents'].map((page) => ( // Change this to page names
                  <Button
                    key={page}
                    onClick={() => setActivePage(page)}
                    variant={activePage === page ? 'default' : 'outline'}
                    className="m-2"
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </Button>
                ))}
              </div>
            </ScrollArea>
            {data &&
              renderEditField(
                `pages.${activePage}`,
                data.pages[activePage as keyof typeof data.pages],
                handleEdit
              )}
            {renderEditField('components', data.components, handleEdit)}
          </div>
        </ScrollArea>

        <div
          className="w-1 cursor-col-resize bg-gray-300 hover:bg-gray-400 active:bg-gray-500"
          onMouseDown={handleMouseDown}
        />

        <PreviewPane
          data={data}
          activePage={activePage}
          width={100 - sliderPosition}
        />
      </div>
    </div>
  );
}

function setNestedValue(obj: any, path: string, value: any) {
  const newObj = { ...obj };
  const parts = path.split('.');
  const last = parts.pop()!;
  const target = parts.reduce((acc, part) => acc[part], newObj);
  target[last] = value;
  return newObj;
}