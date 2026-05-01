export const formatDate = (
  date: Date,
  opts?:
    | { readonly part: 'date'; readonly withMilliseconds?: never }
    | { readonly part: 'time'; readonly withMilliseconds?: boolean }
    | { readonly part?: never; readonly withMilliseconds?: boolean },
): string => {
  if (opts?.part === 'date') return formatDatePartDate(date);
  if (opts?.part === 'time') return formatDatePartTime(date, opts.withMilliseconds);
  return `${formatDatePartDate(date)} ${formatDatePartTime(date, opts?.withMilliseconds)}`;
};

const formatDatePartDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  return `${year}-${month}-${day}`;
};

const formatDatePartTime = (date: Date, withMilliseconds?: boolean): string => {
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const milliseconds = pad(date.getMilliseconds(), 3);

  return `${hours}:${minutes}:${seconds}${withMilliseconds ? '.' + milliseconds : ''}`;
};

const pad = (n: number, length: number = 2): string => n.toString().padStart(length, '0');
