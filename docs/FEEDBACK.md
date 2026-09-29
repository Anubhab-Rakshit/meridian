# Meridian — User Feedback

## Overview

Structured feedback from 70 Preprod users of Meridian, collected **Sep 28–30, 2026** (Round 2). Every respondent connected a Preprod wallet and used the contract on Midnight Preprod. The Round 2 form extended the original Name / Email / Wallet / Rating fields with four additional questions: favourite feature, bugs & usability issues, would-recommend, and missing feature.

> **Google Form**: [Feedback Form](https://docs.google.com/forms/d/e/1FAIpQLSeUNNyC7LbEBR1XpLa_VJbyh_Vd7NtndDYDyGkCIhV13SluwA/viewform?usp=sharing&ouid=116630055802177695188) · **Responses**: [Google Sheet](https://docs.google.com/spreadsheets/d/1ItI28nL9y5nyUPujuwoDvgprTqZAgJ349ss53LeGsrE/edit?usp=sharing) · **Excel Export**: [feedback-responses.xlsx](feedback-responses.xlsx)

An earlier feedback round was also collected from the same 70 users (Round 1, Sep 17–25, 2026) — see the [overview](#round-1-overview).

---

## Feedback Summary

| Metric | Value |
|--------|-------|
| Total responses | 70 |
| Liked the product | 70 / 70 (100%) |
| Average rating | **9.03 / 10** |
| Median rating | 9 |
| Rating range | 6 — 10 |
| Would recommend | 65 yes · 2 maybe · 3 left blank |
| Response window | Sep 28, 21:41 → Sep 30, 02:24 (IST) |

### Rating Distribution

| Rating | Count | % |
|--------|-------|---|
| 10 | 30 | 43% |
| 9 | 20 | 29% |
| 8 | 15 | 21% |
| 7 | 2 | 3% |
| 6 | 3 | 4% |

---

## Feedback Themes

### Positive

- **UI / UX / design** (23) — "background, so cool mouse movement effect", "navbar is quite good", "the aesthetic design and proper guide", "fonts and design… apple fluid navbar", "how did you make this user interface — its so good bro"
- **Core features** (13) — "the split part", "settlement, analytics, dashboard", "invite options for others", "multi wallet support", "expense logging"
- **Idea / concept** (6) — "Unique product", "The idea", "Idea"
- **Settlement** (3) — "settlment", "Settlements and join circle feature"
- **Blockchain / transactions** (2) — "very good use of the blockchain network", "Deployment and transactions working properly"
- **Privacy** (2) — "keep my identity confidential"

### Areas for Improvement

| Theme | Count | Status | Examples |
|-------|-------|--------|---------|
| Wallet connection / refresh / auth | 8 | ✅ Shipped [351bb07](https://github.com/Anubhab-Rakshit/meridian/commit/351bb07) | "Wallet disconnects on page refresh or re rendering", "Wallet connection error in mobile", "after loading wallet it still doesn't allow circle creation" |
| Wallet modal redesign | 3 | 🔧 Planned | "Make the wallet modal better", "the current modal box looks very old" |
| Profile page / section | 3 | 🔧 Planned | "maybe make a profile page", "a profile page for users could have been done" |
| Custom splits / shares | 3 | ✅ Shipped [c2d812b](https://github.com/Anubhab-Rakshit/meridian/commit/c2d812b) | "implement the custom split", "bring custom shares — it is showing coming soon" |
| Mobile notification overlay | 2 | ✅ Shipped [d6d4942](https://github.com/Anubhab-Rakshit/meridian/commit/d6d4942) | "Notification cannot be removed in mobile display, blocking input fields" |
| Dark / light mode | 2 | 🔧 Planned | "dark white mode, then more comfortable" |
| Footer links are demo links | 2 | ✅ Shipped [1a87f25](https://github.com/Anubhab-Rakshit/meridian/commit/1a87f25) | "the buttons/links in the footer are demo" |
| Settlement / balance issues | 4 | ✅ Shipped [bbc22ae](https://github.com/Anubhab-Rakshit/meridian/commit/bbc22ae), [57179a4](https://github.com/Anubhab-Rakshit/meridian/commit/57179a4), [1ffeb98](https://github.com/Anubhab-Rakshit/meridian/commit/1ffeb98) | "settlements are having issues", "balance does not update, hard to refresh" |
| Copy contract address | 2 | ✅ Shipped [1a87f25](https://github.com/Anubhab-Rakshit/meridian/commit/1a87f25) | "we need the contract address… copy option would be useful" |
| Onboarding steps / simpler UX | 3 | ✅ Shipped [d801b1d](https://github.com/Anubhab-Rakshit/meridian/commit/d801b1d), [2c3738a](https://github.com/Anubhab-Rakshit/meridian/commit/2c3738a) | "explain the steps of using it", "make it simple for common guys" |
| Mobile dashboard layout | 1 | ✅ Shipped [2c3738a](https://github.com/Anubhab-Rakshit/meridian/commit/2c3738a) | "some layout issues in mobile in the dashboard" |
| Double-submit on deploy | 1 | ✅ Shipped [e68fa90](https://github.com/Anubhab-Rakshit/meridian/commit/e68fa90), [1a87f25](https://github.com/Anubhab-Rakshit/meridian/commit/1a87f25) | "on clicking buttons 2 times, 2 times contract is deploying" |
| About page too long | 1 | ✅ Shipped [2c3738a](https://github.com/Anubhab-Rakshit/meridian/commit/2c3738a) | "improve the about us, its too long" |
| Cursor overlaps text | 1 | ✅ Shipped [1a87f25](https://github.com/Anubhab-Rakshit/meridian/commit/1a87f25) | "sometimes cursor hides the text under it" |
| SVG quality | 1 | ✅ Shipped [3363ad6](https://github.com/Anubhab-Rakshit/meridian/commit/3363ad6) | "make the svgs more better, some felt like ai" |
| Other suggestions | 5 | 🔧 Planned / logged | "work on the UI", "circle view could be done better", "some more cool features" |

---

## Response Actions

What was done with the feedback so far. The Round 2 iteration shipped **11 items across 7 commits**; the rest stays planned. Commit links point into this repository.

| Feedback | Action | Status | Commit |
|----------|--------|--------|--------|
| Settlement rounds never closed; balances stayed after settle | Close the round on settle: mark expenses settled, record plan hash, reset balances, add RLS `UPDATE` policy (`005`/`006`) | ✅ Shipped | [bbc22ae](https://github.com/Anubhab-Rakshit/meridian/commit/bbc22ae), [57179a4](https://github.com/Anubhab-Rakshit/meridian/commit/57179a4) |
| Browser proving unreachable for hosted-app visitors | Route browser proving through the local proof server (`VITE_PROOF_SERVER_URL`) | ✅ Shipped | [57179a4](https://github.com/Anubhab-Rakshit/meridian/commit/57179a4) |
| Stale wallet/local state causing failed or odd contract calls | Clear stale localStorage state before every contract call | ✅ Shipped | [dfa8f29](https://github.com/Anubhab-Rakshit/meridian/commit/dfa8f29) |
| Wallet disconnect / shutdown gave raw errors | Detect Lace `RemoteApiShutdownError` and show a friendly reconnect message | ✅ Shipped | [e9de265](https://github.com/Anubhab-Rakshit/meridian/commit/e9de265) |
| Mobile layout issues (nav, connect button, spacing) | Responsive nav-pill, floating-nav offset, connect-button sizing for small screens | ✅ Shipped | [afa1f90](https://github.com/Anubhab-Rakshit/meridian/commit/afa1f90) |
| Users asked for usage steps / simpler onboarding | Step-by-step user guide (`docs/USAGE.md`) linked from README | ✅ Shipped | [d801b1d](https://github.com/Anubhab-Rakshit/meridian/commit/d801b1d) |
| Wallet connection still drops on refresh (8 reports, Round 2) | Session persisted to localStorage and silently restored on every page load | ✅ Shipped | [351bb07](https://github.com/Anubhab-Rakshit/meridian/commit/351bb07) |
| Mobile toasts stuck / blocking inputs (2 reports) | Toasts dismissible with a close button, pending auto-times-out, full-width above the safe-area on mobile | ✅ Shipped | [d6d4942](https://github.com/Anubhab-Rakshit/meridian/commit/d6d4942) |
| Balance does not update (1 report) | Wallet balance re-polls every 30s and whenever the tab regains focus | ✅ Shipped | [1ffeb98](https://github.com/Anubhab-Rakshit/meridian/commit/1ffeb98) |
| Custom splits / shares (3 reports) | Custom Shares shipped: per-member percentages totalling 100%, honored in balances, settlement plan and cards | ✅ Shipped | [c2d812b](https://github.com/Anubhab-Rakshit/meridian/commit/c2d812b) |
| Footer demo links (2 reports) | Real repo / live demo / X / user guide / architecture / feedback form / demo video links plus a Resources column | ✅ Shipped | [1a87f25](https://github.com/Anubhab-Rakshit/meridian/commit/1a87f25) |
| Copy contract address in invite/vault (2 reports) | Address shown in the invite panel; copy buttons on circle header, invite panel and circle cards | ✅ Shipped | [1a87f25](https://github.com/Anubhab-Rakshit/meridian/commit/1a87f25) |
| Double-submit on deploy (1 report) | Buttons already disable while pending ([e68fa90](https://github.com/Anubhab-Rakshit/meridian/commit/e68fa90)); re-entrancy guards now also block a double-tap before state flushes | ✅ Shipped | [e68fa90](https://github.com/Anubhab-Rakshit/meridian/commit/e68fa90), [1a87f25](https://github.com/Anubhab-Rakshit/meridian/commit/1a87f25) |
| About page too long (1 report) | Copy trimmed (hero, problem cards, architecture steps, mission merged); compact paddings and single-column restructure under 640px | ✅ Shipped | [2c3738a](https://github.com/Anubhab-Rakshit/meridian/commit/2c3738a) |
| Cursor overlaps text (1 report) | Pointer-events locked off, difference-blend inversion removed, ring hidden until the mouse moves and when it leaves the window | ✅ Shipped | [1a87f25](https://github.com/Anubhab-Rakshit/meridian/commit/1a87f25) |
| Mobile dashboard layout (1 report) | Circle dashboard collapses to one column below 1024px; header, tabs and card grids reflow without horizontal overflow | ✅ Shipped | [2c3738a](https://github.com/Anubhab-Rakshit/meridian/commit/2c3738a) |
| SVG quality — "felt like AI" (1 report) | 16 bespoke SVG illustrations replaced with the app's consistent lucide icon set; unused template assets deleted | ✅ Shipped | [3363ad6](https://github.com/Anubhab-Rakshit/meridian/commit/3363ad6) |
| Wallet modal looks outdated (3 reports) | Redesign wallet modal | 🔧 Planned | — |
| Profile page (3 reports) | Add member profile view | 🔧 Planned | — |
| Dark / light mode toggle (2 reports) | Theme switcher | 🔧 Planned | — |

---

## Individual Feedback

Responses listed in shuffled order (not form order).

| # | Name | Rating | Would Recommend | Reported Issues | Feature Requests |
|---|------|--------|-----------------|-----------------|------------------|
| 1 | Aritra Sarkar | 6 | maybe | — | — |
| 2 | Taniya Singh | 9 | yes | — | make the svgs more better , some felt like ai |
| 3 | Koyeli Kundu | 10 | Yes | — | — |
| 4 | Sreejita Basu | 8 | yes | — | — |
| 5 | Subham Bhat | 8 | Yes | — | — |
| 6 | Snigdhanil Basu | 10 | — | — | — |
| 7 | Maitri Golder | 8 | MAYBE | — | — |
| 8 | Amitava Pal | 8 | Yes | Notification cannot be removed in mobile display , blocking input fields | Improve the bug that i have suggested |
| 9 | Moumita Rakshit | 9 | yes | — | — |
| 10 | Shreyak Mitra | 10 | Yes | Wallet connection loses on refreshing | Its a splitting app that i got to know after using it , implement some more… |
| 11 | Aabes Sarkar | 9 | ok | — | — |
| 12 | Sreeja Ray | 10 | yes sure | — | — |
| 13 | Praloy Sahoo | 10 | Of course | — | — |
| 14 | Ruparna Biswas | 9 | yes | — | — |
| 15 | Tamisra Moitra | 10 | Yes , I will surely. | — | — |
| 16 | Antara Bhattacharjee | 6 | yes but fix the bug | After wallet connection , circles tab is not loading , it shows for… | — |
| 17 | Sohana Ghosh | 10 | Yes | — | — |
| 18 | Rooplekha Banik | 9 | Yess | In invite , we need the contract address , it could be better if we are shown… | — |
| 19 | Sankhanil Chanda | 9 | yes | some layout issues in mobile in the dashboard | fix the bug , nothing else than that |
| 20 | Prajit Bakshi | 10 | Yes , I have shared it to my friends | — | — |
| 21 | Tathagata Ghosh | 10 | Yes , I have already shared it with… | — | work on the UI i would recommend |
| 22 | Mourya Saha | 10 | yes | — | — |
| 23 | Upasana Aditya | 9 | yes | — | — |
| 24 | Avishikta Bagchi | 9 | Yes | Wallet connection issue at first | Make the wallet modal better |
| 25 | Amit Rakshit | 9 | yes | — | — |
| 26 | Subrata Rakshit | 10 | yes | — | — |
| 27 | Ayush Sarkar | 6 | yes , but make it simple | — | make it simple for common guys |
| 28 | Saketh Ram | 10 | yes | — | — |
| 29 | Susmita Rakshit | 10 | Yes | — | — |
| 30 | Subham Neogi | 10 | yes | — | improve the modal box for wallet connection |
| 31 | Sayon Sarkar | 8 | yes i will | — | — |
| 32 | Mukta Das | 8 | yes | — | the buttons/links in the footer are demo , you can make it functional |
| 33 | Rasa Majumdar | 8 | yes | notification issue in mobile | improve the notification feature |
| 34 | Sampad De | 8 | Yes I will | — | Maybe add some more features like dark white mode , then more splitting features |
| 35 | Adrish Karak | 9 | yes | wallet connection has some bugs | — |
| 36 | Sayanaditya Das | 9 | yes | — | — |
| 37 | Anisha Ghosh | 10 | Yes | — | — |
| 38 | Sarin Sanyal | 9 | yes | — | — |
| 39 | Srijit Das | 9 | yes | — | make a good wallet modal box , the current modal box looks very vibecoded |
| 40 | Sanbartika Ghosh | 10 | Yes | — | — |
| 41 | Soumili Das | 10 | yes | — | — |
| 42 | Snigdha | 8 | yes | — | contract under vault could have a copy option , useful for inviting others |
| 43 | Gargi Saha | 9 | Yes I will | — | — |
| 44 | Pooja Das | 9 | yes | yes some like in wallet connection , expense logging | — |
| 45 | Raja | 7 | yes | sometimes cursor hides the text under it | maybe make a profile page |
| 46 | Kausheya Roy | 8 | yes | — | dark/light mode and settlements have some problem |
| 47 | Shreyasi Paul | 10 | Yes | — | Maybe the circle view could be done better |
| 48 | Debasmit Bose | 10 | yes | — | on clicking buttons 2 times , 2 times contract is deploying , fix this issue ,… |
| 49 | Rick Acharjee | 10 | i liked it , i will recommend others… | — | — |
| 50 | Nobojit Mondal | 9 | yes | balance does not update , hard to refresh , look into it | — |
| 51 | Rupam Ghosh | 9 | Yes | Wallet disconnects on page refresh or re rendering | — |
| 52 | Arin Das | 10 | Yes | — | maybe implement the custom split |
| 53 | Debanjali Chatterjee | 10 | yes | no but settlements having an issue | footer can be bit detailed |
| 54 | Shreya Dey Sarkar | 8 | yes | — | maybe a profile section? |
| 55 | Soumyajit Mazumdar | 10 | Yes | — | Some more cool features |
| 56 | Sayantika Haldar | 8 | yes | — | — |
| 57 | Supratik Paul | 8 | yes sure | — | maybe explain the steps of using it in about us or a practical guide could… |
| 58 | Subom Paul | 8 | yes | settlements are having issues | a profile page for users could have been done |
| 59 | Srinjoy Mukherjee | 7 | — | Wallet connection error in mobile | — |
| 60 | Ruhani Chakrabarti | 10 | yes ofc | — | — |
| 61 | Oyshee Ghosh | 10 | yes | — | — |
| 62 | Vibhan Dutta | 9 | yes | — | bring custom shares , it is showing coming soon` |
| 63 | Mithu Rakshit | 10 | Yes | — | — |
| 64 | Anushka Sarkar | 8 | yes | — | improve the about us , its too long and doesn't provide much valuable… |
| 65 | Ananya Basu | 9 | Yes | — | — |
| 66 | Suniska Dey | 10 | Yes , it is genuinely good. | — | — |
| 67 | Pradipto Haldar | 10 | Ok | — | — |
| 68 | Reet Banerjee | 10 | yes | — | — |
| 69 | Bodhisatwa Dutta | 9 | — | Sometimes after loading wallet , it still doesn't allow for circle creation | — |
| 70 | Ayanika Sen | 10 | yes sure | — | — |

---

## Round 1 Overview

Round 1 of feedback was collected from all 70 users between Sep 17–25, 2026. This document — stats, themes, tables — covers Round 2 only.

---

## How to Provide Feedback

1. **Google Form**: [Feedback Form](https://docs.google.com/forms/d/e/1FAIpQLSeUNNyC7LbEBR1XpLa_VJbyh_Vd7NtndDYDyGkCIhV13SluwA/viewform?usp=sharing&ouid=116630055802177695188)
2. **Google Sheet**: [All Responses](https://docs.google.com/spreadsheets/d/1ItI28nL9y5nyUPujuwoDvgprTqZAgJ349ss53LeGsrE/edit?usp=sharing)
3. **Excel Export**: [feedback-responses.xlsx](feedback-responses.xlsx)
4. **GitHub Issues**: [github.com/Anubhab-Rakshit/meridian/issues](https://github.com/Anubhab-Rakshit/meridian/issues)
5. **X/Twitter**: Reply to [@anubhab_26](https://x.com/anubhab_26)
