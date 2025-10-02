import Image from "next/image";
import { LoginButton } from "./_components/login-button";
import { getCurrentSession } from "@/lib/auth";
import { ChaptersUI } from "./_components/chapters";

export default async function Home() {
  const session = await getCurrentSession();

  if (!session) {
    return (
      <div className="font-sans text-lg font-bold">
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
          <div className="relative aspect-square min-h-64">
            <Image
              src="/cloud.svg"
              fill
              className="bg-cover object-cover"
              alt="qumemo"
            />
          </div>
          <p className="text-secondary-foreground text-center text-3xl font-bold">
            Whoops!. We need to check you first
          </p>
          <LoginButton />
        </div>
      </div>
    );
  }
  return <ChaptersUI />;
}
