import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Footer({
  checked,
  correct,
  stage,
  quizLength,
  choice,
  onCheck,
  onPrevious,
  onNext,
}: {
  checked: boolean;
  correct: boolean;
  stage: number;
  quizLength: number;
  choice: number | null;
  onCheck: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className={cn(
        "w-full border-t-2 transition-all",
        checked ? (correct ? "bg-blue-300" : "bg-red-300") : "",
      )}
    >
      <div className="mx-auto grid max-w-4xl grid-cols-3 items-center justify-between px-2 py-4 sm:px-4 sm:py-8">
        <div className="flex items-center">
          <Button
            disabled={!stage}
            onClick={onPrevious}
            size="custom"
            variant="custom_tertary"
          >
            Prev
          </Button>
        </div>
        <div>
          <p
            className={cn(
              "text-center text-xl font-black transition-all sm:text-3xl",
              correct ? "text-blue-500" : "text-red-500",
              checked ? "scale-100 opacity-100" : "scale-95 opacity-0",
            )}
          >
            {checked ? (correct ? "Correct!" : "Not Good!") : ""}
          </p>
        </div>
        <div className="flex items-center justify-end">
          <Button
            disabled={choice === null}
            size="custom"
            variant={checked ? "custom_primary" : "custom_alt"}
            onClick={checked ? onNext : onCheck}
          >
            {stage === quizLength - 1 ? "Finish" : checked ? "Next" : "Check"}
          </Button>
        </div>
      </div>
    </div>
  );
}
