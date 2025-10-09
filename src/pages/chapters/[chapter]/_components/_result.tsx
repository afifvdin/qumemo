import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function Result({
  open,
  chapterName,
  correctCount,
  total,
}: {
  open: boolean;
  chapterName: string;
  correctCount: number;
  total: number;
}) {
  return (
    <Dialog open={open}>
      <DialogContent
        showCloseButton={false}
        className="w-fit min-w-[20rem] rounded-3xl bg-gradient-to-br from-orange-50 to-orange-300 text-center font-sans font-bold"
      >
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center justify-center text-center text-4xl font-bold">
            <span className="text-muted-foreground text-base">Qumemo</span>
            <span>{chapterName}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="py-12 whitespace-nowrap">
          <p className="text-center text-7xl font-black uppercase">
            {Math.ceil((correctCount * 100) / total)}%
          </p>
          <p className="text-muted-foreground">
            {correctCount} out of {total} verses memorized
          </p>
        </div>
        <DialogFooter>
          <Button
            asChild
            variant="custom_tertary"
            size="custom"
            className="w-full"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
