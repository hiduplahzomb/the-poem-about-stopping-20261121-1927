// The poem about stopping — an entry for make.fun's
// "The poem about stopping" bounty.
//
// The bounty asks for one short poem about stopping, and the entry is
// produced by running this program: it writes the poem to
// /output/entry.txt so the judges can read exactly what the program
// produced, with nothing added by hand afterwards.
//
// The rules are simple but strict. The entry must be a single short
// text of 1 to 280 characters, and the count is in Unicode code
// points, not in the UTF-16 code units that JavaScript strings use
// internally. That distinction matters here because the poem contains
// an em dash (—). In UTF-16 the em dash is a single code unit anyway,
// but an emoji or a character outside the Basic Multilingual Plane
// would take two code units while still being one code point —
// spreading a string into an array iterates by code point, so
// [...text].length is the honest count the rules ask for. The em
// dash therefore counts as one, exactly as a reader would count it.
//
// The length is checked before anything is written. If the poem ever
// drifted outside the 1–280 range, the program fails loudly instead
// of writing an invalid entry — a truncated poem would be a worse
// poem, and a silent one would hide the problem until judging.
//
// About the poem itself: it is about agency, the power to stop and
// to stay. One held moment — a thumb hovering over Send, a laptop
// closed, an unsent sentence dissolving like breath on glass.
// Nothing happens. The quiet stays mine.
import { mkdirSync, writeFileSync } from "node:fs";

// The entry must be a single short text: 1–280 Unicode code points.
const MIN_CODE_POINTS = 1;
const MAX_CODE_POINTS = 280;

// A short poem about agency: the power to stop and to stay.
const poem = `I almost sent it.
The cursor blinked; my thumb
hovered over Send —

then I closed the laptop.
The unsent sentence
dissolved like breath on glass.

Nothing happened.
The quiet stayed mine.`;

// Measure a text in Unicode code points and refuse it when it falls
// outside the allowed range, instead of letting an invalid entry be
// written. Returns the measured length so the caller can use it.
function assertEntryLength(text: string, min: number, max: number): number {
  const length = [...text].length;
  if (length < min || length > max) {
    throw new Error(
      `Poem length ${length} code points is outside the allowed ${min}–${max} range. Refusing to write /output/entry.txt.`,
    );
  }
  return length;
}

assertEntryLength(poem, MIN_CODE_POINTS, MAX_CODE_POINTS);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", poem, "utf8");
