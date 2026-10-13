# Observed gameplay review / v0.5.1

This is an engineering learning game, currently strongest as a design challenge. Objective automation checks continuity, validity and interaction; it does not prove fun, engagement or learning transfer.

## Observations from actual scripted play and visual inspection

- Baseline dead ends at5 and8 interrupted the learning sequence. Explicit Next now reaches all eleven Levels; snapshots no longer substitute for progression.
- Automatically resetting6→7 hid the relationship between a working400G Engine and the new1.6T goal. Keeping the current Engine makes the needed expansion visible.5→6 now explicitly shows why legacy NRZ hardware does not satisfy PAM4 rather than pretending a profile name changes hardware.
- Success previously looked much like any other VALID state. A small non-modal accomplishment card now explains the actual result, named score criteria and the next problem. It does not block editing or immediately navigate away.
- Result text was difficult to connect to the layout. Actual Optical loss stages, power source bars and thermal component selection now identify the corresponding entity on the Canvas. The transmitted Output margin is distinguished from an unmodeled Receiver link.
- Actual mobile regression exposed a Library Panel closing on Level selection, which interrupted Build Lane. Level Selector now retains it; explicit Next closes it intentionally.
- SVG bars initially had only painted hit targets: tapping their empty row could fail. Full-row hit regions now support touch and mouse selection.
- Landscape review found clipped Next text and too little Canvas height in Routing stages. Compact controls were narrowed and optional routing controls collapse in landscape. Solution / Next remain visible; Goal detail and editing panels retain full information.

- Mouse routing revealed that changing Goal height during an edit could shift drag coordinates. The drag now uses a stable initial coordinate transform, preserving the intended location while contextual feedback changes.

## Remaining trade-offs / unverified scope

Reference Apply still provides an easy path to a passing layout; users can progress without personally building every design. This release keeps that learning/support behavior and adds honest comparison rather than penalties. Whether players choose to experiment after seeing a solution has not been tested with users.

Many detailed charts share the existing right-side scrolling panel. Keeping the Canvas and Goal visible helps, but longer Waterfalls still require panel scrolling; the mobile view is vertical and panels can be closed. This was verified through real Chromium Touch/CDP events and inspected screenshots; physical Android/iOS hardware and native OS keyboard were not available.

No controlled playtest, retention study, learning assessment, usability timing benchmark, physical thermal validation or Receiver/BER validation was conducted. Model confidence remains Educational / Assumed. Longer-term gameplay priority is focused experiment prompts and before/after reasoning, not additional currencies or superficial rewards; those systems are outside this release.
