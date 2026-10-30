# BRUTAL Design System: Visual Foundations

_A neo-brutalist visual base for all my apps. Colours, type, spacing, borders and shadows only._

## 1. Principles

1. **Hard edges.** Radius is always 0.
2. **Black borders.** Every surface has a solid black border.
3. **Flat shadows.** Shadows are solid black rectangles offset down and right. No blur.
4. **Colour has a job.** Each colour means one thing. Never use colour just to decorate.
5. **Black text.** Text is black on every coloured surface.

## 2. Colour

| Token       | Hex     | Use                                                 |
| ----------- | ------- | --------------------------------------------------- |
| ink         | #000000 | Text, borders, shadows, icon strokes                |
| paper       | #FFFFFF | Default surface: cards, inputs, unselected controls |
| primary     | #8AD8FF | Brand, main actions, selected states, banners       |
| danger      | #FF6B4A | Critical, destructive, error only                   |
| accent      | #D4B5FF | Categories, time, secondary identity                |
| success     | #10B981 | Done, progress, confirmed                           |
| warning     | #FFD84D | Needs attention, caution                            |
| sand        | #E7E5DF | Grouped areas, tertiary buttons, nested rows        |
| cream       | #F4F3EF | Small pills on a white card                         |
| textMuted   | #4B5563 | Secondary text                                      |
| placeholder | #6B7280 | Input placeholder text                              |

**Rules**

- `danger` is the only alert colour. Never use it decoratively.
- `success` and `warning` are for status only, not branding.
- `primary` and `accent` are the two brand colours. An app may swap them, as long as black text on them still reaches 4.5:1 contrast.
- Never put white text on a colour. White text is only allowed on black.

**Contrast (normal text needs 4.5:1)**

| Pair                           | Ratio        | Result   |
| ------------------------------ | ------------ | -------- |
| ink on paper                   | 21:1         | Pass     |
| ink on primary                 | about 13:1   | Pass     |
| ink on accent                  | about 12:1   | Pass     |
| ink on success                 | about 8:1    | Pass     |
| ink on warning                 | about 15:1   | Pass     |
| ink on danger                  | about 7.4:1  | Pass     |
| primary on ink                 | about 13:1   | Pass     |
| textMuted on paper             | about 7.6:1  | Pass     |
| placeholder on paper           | about 4.8:1  | Pass     |
| white on danger                | about 2.8:1  | **Fail** |
| #9CA3AF or plain grey on paper | 2.5 to 4.0:1 | **Fail** |

## 3. Typography

**Font:** Outfit, the only family.

**Weights**

| Weight   | Font name       |
| -------- | --------------- |
| Regular  | Outfit-Regular  |
| SemiBold | Outfit-SemiBold |
| Bold     | Outfit-Bold     |
| Black    | Outfit-Black    |

On React Native, always pick a weight through the font name (`Outfit-Bold`), not `fontWeight`. On web, map these to weights 400, 600, 700 and 900.

**Scale**

| Style      | Size         | Weight   | Letter spacing | Use                                 |
| ---------- | ------------ | -------- | -------------- | ----------------------------------- |
| display    | 64 (line 68) | Bold     | 0              | Splash, hero numbers                |
| headline   | 24           | Bold     | 0              | Empty and error messages            |
| title      | 20           | Bold     | 0              | Banner and dialog titles            |
| heading    | 16           | Bold     | 0              | Wordmark, input text, header titles |
| subheading | 14           | Bold     | 0              | Card titles, section labels         |
| button     | 16           | SemiBold | 0              | Button labels                       |
| value      | 18           | Bold     | 0              | Dates, amounts, key figures         |
| chip       | 12           | Bold     | 0              | Selectable chips                    |
| body       | 12           | SemiBold | 0              | Compact text and rows               |
| prose      | 12           | Regular  | 0              | Long text                           |
| label      | 10           | Bold     | 1              | Field labels, counters              |
| tag        | 10           | Bold     | 0              | Tags and pills                      |
| strapline  | 10           | SemiBold | 2              | Tagline strip                       |

**Rules**

- Labels, tags, chips, buttons and straplines are UPPERCASE (use `textTransform`, so stored text keeps its case).
- Minimum size is 10.
- Messages and long text use sentence case.

## 4. Spacing

| Token | px  | Typical use                               |
| ----- | --- | ----------------------------------------- |
| xxs   | 2   | Tiny gaps, tag vertical padding           |
| xs    | 4   | Chip gap, icon-to-text gap                |
| sm    | 6   | Gap inside cards, tag horizontal padding  |
| md    | 8   | Input horizontal padding                  |
| lg    | 10  | Gap between sections                      |
| xl    | 12  | Panel padding, input vertical padding     |
| xxl   | 16  | Screen edge padding, large button padding |
| xxxl  | 20  | Large stack gap                           |
| huge  | 32  | Between major regions                     |

**Layout:** header height 56, screen edge padding 16, gap between sections 10. On tablet and web, keep content to a maximum width of 640, centred.

## 5. Borders and radius

| Token    | px  | Use                                              |
| -------- | --- | ------------------------------------------------ |
| hairline | 0.5 | Tiny square bullets                              |
| thin     | 1.5 | Tags, tabs, progress fill edge                   |
| base     | 2   | Cards, inputs, buttons, header divider (default) |
| heavy    | 4   | Hero call-to-action only                         |

- **Radius:** 0 everywhere.
- **Border colour:** always ink.

## 6. Shadows

Always ink, 100% opacity, no blur, offset down and right.

| Token | Offset (px) | Use                                      |
| ----- | ----------- | ---------------------------------------- |
| xs    | 1           | Tags, pills, avatars, progress track     |
| sm    | 1.5         | Chips, icon tiles, small fields          |
| md    | 2           | Cards, panels, buttons, inputs (default) |
| lg    | 4           | Hero call-to-action, dialogs, sheets     |

Don't stack more than two shadow levels. React Native's shadow props don't render on Android, so draw the shadow as a black rectangle behind the element. This looks the same on iOS, Android and web.

## 7. Icons

- Stroke style with square ends, drawn on a 24 grid, stroke weight matching the base border.
- Always black.

| Size | px  | Use                        |
| ---- | --- | -------------------------- |
| xs   | 12  | Inline in compact cards    |
| sm   | 16  | Inside icon tiles          |
| md   | 20  | Leading icon in buttons    |
| lg   | 24  | Inline actions in inputs   |
| xl   | 32  | Header actions, checkboxes |
| xxl  | 40  | Banner glyph               |

An **icon tile** is a square coloured tile with a base border, sm shadow and 6 padding, holding a 16 icon.

## 8. Scaling

Use one scaling function across the whole app: `s(n) = moderateScale(n, 0.2)`. Pass every number in this document (spacing, borders, shadows, sizes) through it. Don't use a second scale factor.

## 9. Quick reference

```ts
export const palette = {
  ink: "#000000",
  paper: "#FFFFFF",
  primary: "#8AD8FF",
  danger: "#FF6B4A",
  accent: "#D4B5FF",
  success: "#10B981",
  warning: "#FFD84D",
  sand: "#E7E5DF",
  cream: "#F4F3EF",
  textMuted: "#4B5563",
  placeholder: "#6B7280",
};

export const space = {
  xxs: 2,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
  xxl: 16,
  xxxl: 20,
  huge: 32,
};
export const border = { hairline: 0.5, thin: 1.5, base: 2, heavy: 4 };
export const shadow = { xs: 1, sm: 1.5, md: 2, lg: 4 };
export const font = {
  regular: "Outfit-Regular",
  semibold: "Outfit-SemiBold",
  bold: "Outfit-Bold",
  black: "Outfit-Black",
};
```

## 10. Don'ts

- No rounded corners, blur, gradients or transparency effects.
- No white text on colour, and no grey text lighter than `textMuted`.
- No text below 10.
- No decorative use of `danger`, `success` or `warning`.
- No raw hex or pixel values in screens; use the tokens above.
