const MONTHS = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
] as const;

function parseIsoMonth(value: string) {
  const [year, month = 1] = value.split("-").map(Number);
  return { year, month };
}

export function formatDuration(start: string, end: string | "present") {
  const from = parseIsoMonth(start);
  const to =
    end === "present"
      ? { year: new Date().getFullYear(), month: new Date().getMonth() + 1 }
      : parseIsoMonth(end);
  const totalMonths = Math.max(
    0,
    (to.year - from.year) * 12 + (to.month - from.month) + 1
  );
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [];

  if (years) parts.push(`${years} ${years === 1 ? "año" : "años"}`);
  if (months) parts.push(`${months} ${months === 1 ? "mes" : "meses"}`);

  return parts.join(" ") || "Menos de un mes";
}

export function formatPeriod(start: string, end: string | "present") {
  const format = (value: string) => {
    const { year, month } = parseIsoMonth(value);
    return value.includes("-") ? `${MONTHS[month - 1]} ${year}` : `${year}`;
  };

  return `${format(start)} — ${end === "present" ? "Presente" : format(end)}`;
}
