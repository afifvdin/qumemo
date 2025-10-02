export type StateResult = {
  choice: number | null;
  correct: boolean;
};

export type StateOptions = {
  resultOpen: boolean;
  stage: number;
  choice: number | null;
  checked: boolean;
  correct: boolean;
};
