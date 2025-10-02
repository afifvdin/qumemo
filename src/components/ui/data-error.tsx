import Image from "next/image";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function DataError() {
  const router = useRouter();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center font-sans">
      <div className="relative aspect-square min-h-64">
        <Image
          src="/cloud.svg"
          fill
          className="bg-cover object-cover"
          alt="qumemo"
        />
      </div>
      <p className="text-2xl font-black sm:text-3xl">Something went wrong</p>
      <div className="flex items-center justify-center gap-4">
        <Button variant="custom_secondary" size="custom" asChild>
          <Link href="/">Back to home</Link>
        </Button>
        <Button
          onClick={() => {
            router.refresh();
          }}
          variant="custom_primary"
          size="custom"
        >
          Reload
        </Button>
      </div>
    </div>
  );
}
