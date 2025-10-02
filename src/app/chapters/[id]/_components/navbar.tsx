import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { FlagIcon, XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export function Navbar({
  stage,
  verseLength,
  onFinish,
}: {
  stage: number;
  verseLength: number;
  onFinish: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="w-full border-b-2">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-2 py-4 sm:gap-8 sm:px-4 sm:py-8">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" size="icon" className="border-2">
              <XIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <DialogTitle className="font-sans text-2xl font-black">
                Do you want to exit?
              </DialogTitle>
              <DialogDescription className="font-sans text-xl">
                This action cannot be undone. And any changes is unsaved{" "}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="custom_tertary"
                  size="custom"
                  className="border-2 font-sans font-black uppercase"
                >
                  Close
                </Button>
              </DialogClose>
              <Button
                asChild
                variant="custom_danger"
                size="custom"
                className=""
              >
                <Link href="/">Exit</Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Progress
          className="w-full grow"
          value={Math.ceil(((stage + 1) * 100) / verseLength)}
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild className="hidden sm:block">
            <Button variant="custom_danger_alt">Finish instead</Button>
          </DialogTrigger>
          <DialogTrigger asChild className="sm:hidden">
            <Button
              variant="custom_danger_alt"
              size="icon"
              className="sm:hidden"
            >
              <FlagIcon className="fill-white" />
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <DialogTitle className="font-sans text-2xl font-black">
                Finish instead?
              </DialogTitle>
              <DialogDescription className="font-sans text-xl">
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="custom_tertary"
                  size="custom"
                  className="border-2 font-sans font-black uppercase"
                >
                  Close
                </Button>
              </DialogClose>
              <Button
                variant="custom_danger"
                size="custom"
                onClick={() => {
                  setOpen(false);
                  onFinish();
                }}
              >
                Finish
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
