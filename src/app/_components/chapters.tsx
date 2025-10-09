"use client";

import { Button } from "@/components/ui/button";
import { DataError } from "@/components/ui/data-error";
import { DataLoader } from "@/components/ui/data-loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChapters } from "@/services/fetchers";
import { useRouter } from "next/navigation";
import React from "react";

export function ChaptersUI() {
  const chapters = useChapters();
  const router = useRouter();
  const [id, setId] = React.useState(0);

  if (chapters.isLoading || chapters.isValidating) {
    return <DataLoader />;
  }

  if (chapters.error) {
    return <DataError />;
  }

  return (
    <div className="min-h-screen w-screen max-w-screen font-sans font-bold">
      <div className="flex min-h-screen flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-black">Are you ready?</h1>
        <div className="flex items-center justify-center gap-4">
          <Select
            onValueChange={(v) => {
              setId(Number(v));
            }}
          >
            <SelectTrigger className="rounded-lg">
              <SelectValue placeholder="Select your surah/chapter" />
            </SelectTrigger>
            <SelectContent>
              {chapters.data!.map((chapter) => {
                return (
                  <SelectItem value={chapter.id.toString()} key={chapter.id}>
                    {chapter.id}. {chapter.name_complex}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <Button
            disabled={!id}
            onClick={() => {
              if (!id) return;
              router.push(`/chapters/${id}`);
            }}
            variant="custom_primary"
          >
            Start Now
          </Button>
        </div>
      </div>
    </div>
  );
}
