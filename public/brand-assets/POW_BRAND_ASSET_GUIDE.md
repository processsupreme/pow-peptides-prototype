# POW! Peptides — Logo Asset Guide

Status: approved prototype identity system  
Direction: Velocity Strike + Impact Frame  
Last updated: August 28, 2026

## Approved design

The POW! identity combines:

- A heavy, forward-leaning wordmark
- A compact black impact frame
- A controlled electric-lime energy strike
- A restrained burst concentrated behind the exclamation point
- An electric-lime exclamation point as the brand's main shorthand

The exclamation point is required in every customer-facing spelling of `POW!`.

## Core colors

| Name | Hex | RGB | Use |
|---|---|---|---|
| POW Black | `#0A0A0A` | 10, 10, 10 | Frame, type, dark backgrounds |
| POW White | `#FFFFFF` | 255, 255, 255 | Main letters and reverse applications |
| Electric Lime | `#A5EF2E` | 165, 239, 46 | Exclamation, energy strike, interaction accent |
| Warm White | `#F5F2E9` | 245, 242, 233 | Preferred light website background; not part of the logo artwork |

Do not add red, yellow or gradients to the approved logo.

## Asset selection

| File | Use |
|---|---|
| `svg/pow-logo-primary.svg` | Default header, hero, packaging and large placements |
| `svg/pow-logo-flat.svg` | Light layouts where the impact frame would be too heavy |
| `svg/pow-icon-impact.svg` | Favicon, mobile navigation, social avatar, loading mark and small badges |
| `svg/pow-icon-impact-reversed.svg` | Standalone icon on black or very dark backgrounds |
| `svg/pow-icon-impact-mono.svg` | Single-color production or accessibility fallback |
| `png/pow-logo-primary-transparent.png` | High-resolution raster fallback |
| `png/pow-logo-primary-1024.png` | Common digital use |
| `png/pow-logo-primary-512.png` | Compact digital use |
| `favicon/favicon.svg` | Browser favicon source |
| `favicon/favicon-32.png` | 32-pixel browser fallback |
| `favicon/apple-touch-icon.png` | Apple touch icon |

## Clear space

Keep clear space around the primary mark equal to at least the height of the exclamation-point dot. Do not place typography, borders, photographs or interface controls inside this area.

## Minimum sizes

- Primary mark: do not display below 180 CSS pixels wide.
- Flat wordmark: do not display below 140 CSS pixels wide.
- Impact icon: may be used from 16 CSS pixels upward.
- Below 180 pixels, prefer the flat wordmark or impact icon.

## Background use

- The framed primary mark is suitable on warm white, white, neutral photography and black.
- On complex photography, place it on a clear field or dark scrim.
- The flat mark is intended for light, uncluttered backgrounds.
- Never place the lime exclamation on a similarly colored background.

## Do not

- Remove the exclamation point.
- Change the exclamation point to another color.
- Recolor individual `POW` letters.
- Stretch, condense, rotate or independently skew the finished asset.
- Extend the energy strike outside the approved logo bounds.
- Increase the burst until it competes with the wordmark.
- Add glows, bevels, gradients, textures or photographic effects.
- Re-typeset the wordmark with an ordinary font.
- imitate a named comic-book or superhero property.

## Codex implementation

1. Copy `brand-assets` into the website's public/static asset directory without renaming the files.
2. Use `pow-logo-primary.svg` in desktop headers at approximately 210–260 pixels wide.
3. Use `pow-logo-flat.svg` where a lighter visual footprint is needed.
4. Switch to `pow-icon-impact.svg` in the smallest mobile header state.
5. Use `favicon/favicon.svg` as the primary favicon, with the PNG fallbacks supplied.
6. Preserve intrinsic aspect ratios and never crop the logo.
7. Use `#A5EF2E` as the website's primary interactive accent so the interface ties back to the exclamation point.
8. Add accessible alternative text: `POW! Peptides` for wordmarks and `POW!` for the standalone icon.

## Production note

These assets are implementation-ready for the prototype and initial digital build. Before mass packaging, merchandise or trademark filing, commission a final specialist review of optical spacing, print separations and trademark availability.
