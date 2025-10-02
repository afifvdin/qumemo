"use client";

import { DataError } from "@/components/ui/data-error";
import { DataLoader } from "@/components/ui/data-loader";
import { useVerses } from "@/services/verses";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { Choice } from "./_components/choice";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";
import { Result } from "./_components/result";
import { QuranChapter, Quiz } from "@/types/content";
import { StateOptions, StateResult } from "@/types/state";

export default function ChapterUI() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const verses = useVerses({ id, enabled: false });
  const [result, setResult] = React.useState<StateResult[]>([]);
  const [options, setOptions] = React.useState<StateOptions>({
    resultOpen: false,
    stage: 0,
    choice: null,
    checked: false,
    correct: false,
  });
  const correctCount = useMemo(() => {
    const correct = result.filter((r) => r.correct);
    return correct.length + 1;
  }, [result]);

  const chapter: QuranChapter | null = useMemo(() => {
    if (verses.isFetching || verses.isPending || verses.isError) {
      return null;
    }
    return verses.data.chapter;
  }, [verses.data]);

  const quizes: Quiz = useMemo(() => {
    if (verses.isFetching || verses.isPending || verses.isError)
      return { verses: [], quizes: [] };

    const data = [];

    for (let i = 0; i < verses.data.verses.length - 1; i++) {
      const choices = Array.from(
        { length: verses.data.verses.length },
        (_, id) => id,
      ).filter((id) => id !== i && id !== i + 1);
      const candidates = [
        i + 1,
        ...choices.sort(() => Math.random() - 0.5).slice(0, 3),
      ].sort(() => Math.random() - 0.5);
      data.push({
        verseId: i,
        choices: candidates,
        answerId: i + 1,
      });
    }

    return { verses: verses.data.verses, quizes: data };
  }, [verses.data]);

  const onMark = (choice: number) => {
    if (options.checked) return;
    setOptions({ ...options, choice });
  };

  const onPrevious = () => {
    if (!options.stage) return;
    const res = result[options.stage - 1];
    setOptions({
      resultOpen: false,
      stage: options.stage - 1,
      correct: res.correct,
      checked: true,
      choice: res.choice,
    });
  };

  const onNext = () => {
    if (result[options.stage + 1]) {
      const nextRes = result[options.stage + 1];
      setOptions({
        resultOpen: false,
        stage: options.stage + 1,
        choice: nextRes.choice,
        correct: nextRes.correct,
        checked: true,
      });
    } else {
      setOptions({
        resultOpen: false,
        stage: options.stage + 1,
        choice: null,
        correct: false,
        checked: false,
      });
    }
  };

  const onCheck = () => {
    if (options.checked || options.choice === null) return;
    const answerId = quizes.quizes[options.stage].answerId;
    const choiceId = quizes.quizes[options.stage].choices[options.choice];
    const correct = choiceId === answerId;
    setResult([
      ...result,
      {
        choice: options.choice,
        correct,
      },
    ]);
    setOptions({
      ...options,
      checked: true,
      correct,
      resultOpen: options.stage === quizes.quizes.length - 1,
    });
  };

  const onFinish = () => {
    setOptions({
      ...options,
      resultOpen: true,
    });
  };

  useEffect(() => {
    const numId = Number(id);
    if (numId && numId < 114 && numId > 0) {
      verses.refetch();
    } else if (numId === 0 || numId) {
      router.push("/");
    }
  }, [id]);

  if (
    verses.isFetching ||
    verses.isPending ||
    !quizes.verses.length ||
    !quizes.quizes.length
  ) {
    return <DataLoader />;
  }

  if (verses.isError) {
    return <DataError />;
  }

  return (
    <div className="flex h-screen max-h-screen w-screen max-w-screen flex-col items-center justify-center font-sans font-bold">
      <Result
        open={options.resultOpen}
        chapterName={chapter!.name_complex}
        correctCount={correctCount}
        total={quizes.verses.length}
      />
      <Navbar
        stage={options.resultOpen ? options.stage + 1 : options.stage}
        verseLength={quizes.verses.length}
        onFinish={onFinish}
      />
      <div className="grid w-full grow grid-cols-1 items-center justify-center overflow-y-auto">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-8 p-4 sm:gap-12 sm:p-8">
          <div className="w-full">
            <p>
              {options.stage + 2} of {quizes.quizes.length + 1}
            </p>
            <p className="w-full text-2xl sm:text-3xl">Continue it</p>
          </div>
          <p className="font-arab text-2xl sm:text-3xl">
            {quizes.verses[options.stage].text}
          </p>
          <div className="font-arab grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <Choice
              disabled={options.checked}
              incorrect={
                options.checked && options.choice === 0 && !options.correct
              }
              marked={options.choice === 0}
              onClick={() => {
                onMark(0);
              }}
            >
              {quizes.verses[quizes.quizes[options.stage].choices[0]].text}
            </Choice>
            <Choice
              disabled={options.checked}
              incorrect={
                options.checked && options.choice === 1 && !options.correct
              }
              marked={options.choice === 1}
              onClick={() => {
                onMark(1);
              }}
            >
              {quizes.verses[quizes.quizes[options.stage].choices[1]].text}
            </Choice>
            <Choice
              disabled={options.checked}
              incorrect={
                options.checked && options.choice === 2 && !options.correct
              }
              marked={options.choice === 2}
              onClick={() => {
                onMark(2);
              }}
            >
              {quizes.verses[quizes.quizes[options.stage].choices[2]].text}
            </Choice>
            <Choice
              disabled={options.checked}
              incorrect={
                options.checked && options.choice === 3 && !options.correct
              }
              marked={options.choice === 3}
              onClick={() => {
                onMark(3);
              }}
            >
              {quizes.verses[quizes.quizes[options.stage].choices[3]].text}
            </Choice>
          </div>
        </div>
      </div>
      <Footer
        stage={options.stage}
        checked={options.checked}
        choice={options.choice}
        correct={options.correct}
        quizLength={quizes.quizes.length}
        onPrevious={onPrevious}
        onNext={onNext}
        onCheck={onCheck}
      />
    </div>
  );
}
