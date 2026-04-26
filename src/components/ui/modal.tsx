"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Modal({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
}

export function ModalTrigger({ children }: { children: React.ReactNode }) {
  return <Dialog.Trigger asChild>{children}</Dialog.Trigger>;
}

export function ModalContent({
  children,
  className,
  title,
  description,
  eyebrow,
}: {
  children: React.ReactNode;
  className?: string;
  title: string;
  description?: string;
  eyebrow?: string;
}) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-emerald-deep/55 backdrop-blur-sm data-[state=open]:animate-fade-in" />
      <Dialog.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-lg max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[24px] border border-line bg-paper p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] focus:outline-none sm:p-8",
          className
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            {eyebrow && (
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-saffron-deep">
                {eyebrow}
              </p>
            )}
            <Dialog.Title className="mt-2 font-display text-3xl italic leading-tight text-foreground">
              {title}
            </Dialog.Title>
            {description && (
              <Dialog.Description className="mt-2 text-sm leading-6 text-muted-strong">
                {description}
              </Dialog.Description>
            )}
          </div>
          <Dialog.Close
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-card transition hover:border-emerald hover:text-emerald"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Dialog.Close>
        </div>
        <div className="mt-6">{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
