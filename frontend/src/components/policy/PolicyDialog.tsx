
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PolicyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  content: React.ReactNode;
}

const PolicyDialog = ({
  isOpen,
  onClose,
  title,
  description,
  content,
}: PolicyDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <ScrollArea className="flex-grow overflow-auto max-h-[60vh] pr-4">
          <div className="space-y-4 text-sm">
            {content}
          </div>
        </ScrollArea>
        <DialogFooter className="pt-4">
          <Button onClick={onClose}>I understand</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PolicyDialog;
