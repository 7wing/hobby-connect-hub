Got it — outdoor and real-world hobby vibes: trains, birdwatching, hunting, architecture, urban exploration, hiking, astronomy, fishing, etc. Here's the page-by-page layout plan:

---

## App.tsx — routes to keep/rename

Remove `/live` entirely. Replace with `/classes`. Keep `/`, `/explore`, `/profile`, `/chat`.

---

## HomePage

**Header** — greeting + notification bell (keep as is)

**Search bar** — stays, just update placeholder to "Search hobbies, classes, events..."

**Upcoming Classes strip** — horizontal scroll cards showing class name, date, instructor name, spots left. Replaces the current "Upcoming Events" section.

**Your Feed** — hobby cards only, no live badges anywhere. Remove `LiveBadge` imports and `isLive` logic entirely. Cards show image, title, member count, join button.

**FAB** — remove "Go Live" option. Keep "New Group" and add "Browse Classes".

---

## ExplorePage

**Header** — keep search + category chips, remove the map toggle or repurpose it to filter by indoor/outdoor.

**Category chips** — update to: All, Trains, Birdwatching, Hunting, Architecture, Astronomy, Fishing, Hiking, Urban Exploration

**Remove "Live Now" section entirely**

**Featured section** — rename "Featured Sponsors" to "Featured Instructors" — show instructor name, specialty hobby, and rating.

**Browse Hobbies grid** — stays the same structure, just no live badges on cards.

---

## Classes page (new, replaces LiveViewerPage)

This is the main new page.

**Top** — back button + page title "Classes"

**Filter bar** — chips for: All, Free, Paid, Beginner, Intermediate, Advanced, In-Person, Virtual

**Class card list** — each card shows:
- Cover image (hobby photo)
- Class title
- Instructor name + avatar
- Date and time
- Duration
- Price (or "Free")
- Spots remaining badge
- Star rating
- "Sign up" button

**Class detail view** (when a card is tapped) — full screen with:
- Large image
- Title, instructor, rating
- What you'll learn (bullet points)
- Materials needed
- Session dates
- Spots left / waitlist if full
- Price + "Book now" CTA
- Reviews section at bottom

---

## ChatPage

Very minimal changes. Remove the "Go Live Together" card that appears inside conversations. Remove the `LiveBadge` on group chats. Otherwise keep it — messaging between hobbyists makes total sense.

---

## ProfilePage

**Stats row** — change "Live Streams: 12" to "Classes Taken: 12"

**Remove "Live History" section** — replace with "Classes Attended" showing past class name, instructor, date, and a "Leave review" button if no review yet.

**"Go Live" button** — change to "Browse Classes" linking to `/classes`

**Deals for You** — keep as is, sponsorships from outdoor gear brands fit perfectly (binoculars, train kits, fishing gear).

**My Hobbies tags** — update examples to outdoor ones: 🚂 Model Trains, 🐦 Birdwatching, 🏹 Hunting, 🏛️ Architecture, 🌌 Astronomy

---

## BottomTabBar

Change the four tabs to: Home, Explore, Classes (replaces Chat icon, use a `GraduationCap` icon), Chat, Profile — or drop one if five feels crowded. The natural drop is keeping all five since classes is the new core feature.

---

## Components to delete or gut

- `LiveBadge.tsx` — delete entirely
- `LiveViewerPage.tsx` — delete, replace with `ClassesPage.tsx`
- `SponsoredCard.tsx` — keep but update brand names to outdoor sponsors
- `HobbyCard.tsx` — remove `isLive`, `viewers` props and all live-related rendering

---

Great question! When you click "Join" on a hobby card in the feed, it should lead to a **Hobby Group Page** — think of it like a community hub for that specific hobby. Here's how it would look:

---

## HobbyGroupPage (drill-in from feed card)

```
┌─────────────────────────────────┐
│ [← Back]              [Share]   │
│ ┌─────────────────────────────┐ │
│ │       [large cover image]   │ │
│ └─────────────────────────────┘ │
│ Model Train Builders            │
│ 🚂 Trains · 2,340 members       │
│ [    ✓ Joined    ] [Message]    │
├─────────────────────────────────┤
│ ABOUT                           │
│ A community for model train     │
│ builders of all skill levels.   │
│ Share layouts, tips, and builds.│
├─────────────────────────────────┤
│ STATS                           │
│ ┌────────┐ ┌────────┐ ┌──────┐ │
│ │ 2,340  │ │   12   │ │  ★4.8│ │
│ │Members │ │Classes │ │Rating│ │
│ └────────┘ └────────┘ └──────┘ │
├─────────────────────────────────┤
│ CLASSES IN THIS GROUP           │
│ ┌─────────────────────────────┐ │
│ │ [img] Intro to Model Trains │ │
│ │       Dave T. · Jun 25      │ │
│ │       $30 · 8 spots [Book]  │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ [img] Advanced Layout Build │ │
│ │       Dave T. · Jul 9       │ │
│ │       $50 · 12 spots [Book] │ │
│ └─────────────────────────────┘ │
│                       See all → │
├─────────────────────────────────┤
│ MEMBERS YOU MAY KNOW            │
│ [SM●] [JR] [PK●]    See all →  │
├─────────────────────────────────┤
│ RECENT POSTS                    │
│ ┌─────────────────────────────┐ │
│ │ [AJ] Alex · 2h ago          │ │
│ │ Just finished my mountain   │ │
│ │ layout — took 3 weekends!   │ │
│ │ [image thumbnail]           │ │
│ │ ❤ 24   💬 8 comments        │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ [SM] Sarah · 5h ago         │ │
│ │ Anyone recommend a good HO  │ │
│ │ scale track brand?          │ │
│ │ ❤ 6    💬 14 comments       │ │
│ └─────────────────────────────┘ │
│                  [+ New Post]   │
├─────────────────────────────────┤
│ UPCOMING GROUP EVENTS           │
│ ┌─────────────────────────────┐ │
│ │ 📅 Train Expo Meet          │ │
│ │    Jul 15 · Portland, OR    │ │
│ │    32 going    [RSVP]       │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ [Home] [Explore] [Classes]      │
│        [Chat]    [Profile]      │
└─────────────────────────────────┘
```

---

The key idea is that joining a hobby group unlocks three things for the user — **classes** tied to that hobby, **community posts** to browse and contribute to, and **local events** to RSVP to. The "Join" button on the feed card essentially subscribes them to all of that and brings them here.

A few interaction notes worth thinking about:

The "Joined" button at the top toggles back to "Join" if they want to leave the group. The "Message" button opens a group chat thread in the Chat tab. Posts support images, and clicking a post would open a full comment thread. The "New Post" button at the bottom of the posts section lets members share builds, questions, or tips with the group.

Here's the post detail and comment thread page layout:

---

## PostDetailPage (drill-in from group post)

```
┌─────────────────────────────────┐
│ [← Back]              [⋯ More] │
├─────────────────────────────────┤
│ ORIGINAL POST                   │
│ ┌─────────────────────────────┐ │
│ │ [AJ] Alex Johnson      2h   │ │
│ │       Member · Trains        │ │
│ │                              │ │
│ │ Just finished my mountain    │ │
│ │ layout — took 3 weekends!    │ │
│ │ Really happy with how the    │ │
│ │ scenery came out 🚂          │ │
│ │                              │ │
│ │ ┌──────────────────────────┐ │ │
│ │ │     [post image]         │ │ │
│ │ └──────────────────────────┘ │ │
│ │                              │ │
│ │ [🚂 Trains] [🏔 Scenery]    │ │
│ │                              │ │
│ │ ❤ 24 likes   💬 8 comments  │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ [❤ Like]  [💬 Comment]      │ │
│ │ [↗ Share] [🔖 Save]         │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ RELATED CLASS                   │
│ ┌─────────────────────────────┐ │
│ │ 📚 Scenery & Landscaping    │ │
│ │    Dave T. · Jul 9 · $40    │ │
│ │    Learn what Alex did here │ │
│ │                   [Book →]  │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ COMMENTS (8)          [Newest ▾]│
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ [SM] Sarah M.  · 1h ago     │ │
│ │ This is incredible! How did │ │
│ │ you do the rock formations? │ │
│ │ ❤ 4        [Reply]          │ │
│ │                             │ │
│ │   ┌─────────────────────┐   │ │
│ │   │ [AJ] Alex · 45m     │   │ │
│ │   │ Thanks Sarah! I used │   │ │
│ │   │ foam and plaster mix │   │ │
│ │   │ ❤ 2     [Reply]     │   │ │
│ │   └─────────────────────┘   │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ [JR] Jake R.   · 2h ago     │ │
│ │ What scale is this? HO?     │ │
│ │ ❤ 1        [Reply]          │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ [PK] Priya K.  · 3h ago     │ │
│ │ The trees look so realistic!│ │
│ │ What did you use for those? │ │
│ │ ❤ 3        [Reply]          │ │
│ │                             │ │
│ │   ┌─────────────────────┐   │ │
│ │   │ [AJ] Alex · 2h      │   │ │
│ │   │ Woodland Scenics     │   │ │
│ │   │ foliage clusters!    │   │ │
│ │   │ ❤ 5     [Reply]     │   │ │
│ │   └─────────────────────┘   │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ [TW] Tom W.    · 4h ago     │ │
│ │ You should sign up for      │ │
│ │ Dave's advanced class next! │ │
│ │ ❤ 2        [Reply]          │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ [LC] Lily C.   · 5h ago     │ │
│ │ Goals! I'm still on my      │ │
│ │ first flat layout 😅        │ │
│ │ ❤ 7        [Reply]          │ │
│ │                             │ │
│ │   ┌─────────────────────┐   │ │
│ │   │ [SM] Sarah · 4h     │   │ │
│ │   │ Same 😂 we're just  │   │ │
│ │   │ getting started!    │   │ │
│ │   │ ❤ 3     [Reply]     │   │ │
│ │   └─────────────────────┘   │ │
│ └─────────────────────────────┘ │
│                                 │
│         Load 3 more comments    │
│                                 │
├─────────────────────────────────┤
│ WRITE A COMMENT                 │
│ ┌─────────────────────────────┐ │
│ │ [AJ] Add a comment...   [📷]│ │
│ └─────────────────────────────┘ │
│                          [Post] │
├─────────────────────────────────┤
│ MORE FROM THIS GROUP            │
│ ┌──────────┐ ┌──────────┐      │
│ │ [img]    │ │ [img]    │      │
│ │ Sarah's  │ │ Anyone   │      │
│ │ new wheel│ │ rec track│      │
│ │ pottery  │ │ brands?  │      │
│ └──────────┘ └──────────┘      │
├─────────────────────────────────┤
│ [Home] [Explore] [Classes]      │
│        [Chat]    [Profile]      │
└─────────────────────────────────┘
```

---

A few things worth noting about how this page works:

**The related class card** is a smart contextual nudge — if someone is posting about scenery techniques, the app surfaces a relevant class right inside the post. This is a natural upsell that doesn't feel forced.

**Nested replies** go one level deep only — replies to replies don't nest further, keeping threads readable. Tapping "Reply" on any comment opens the keyboard with that person's name pre-filled as a mention.

**The ⋯ More button** at the top gives options like Report Post, Mute User, or Copy Link depending on whether it's your post or someone else's.

**The 📷 icon** in the comment box lets members attach a photo to their comment — useful for hobbyists who want to share a reference image directly in reply.

**More from this group** at the bottom keeps users browsing within the same community rather than going back to the feed.

Here's a full audit of every page we've designed so far:

---

## Pages Confirmed ✅

**1. HomePage** — feed, upcoming classes strip, search, FAB

**2. ExplorePage** — search, category chips, featured instructors, hobby grid

**3. ClassesPage** — filter chips, class card list with spots/price/rating

**4. ClassDetailPage** — full class info, instructor, what you'll learn, materials, session dates, book CTA, reviews

**5. ChatPage (list view)** — conversation list with unread badges

**6. ChatPage (conversation view)** — message thread with class card nudge inside chat

**7. ProfilePage** — stats, hobbies, classes attended, connections, deals, appearance

**8. HobbyGroupPage** — cover, stats, classes in group, members, posts, events

**9. PostDetailPage** — original post, reactions, nested comments, related class card, more from group

**10. NotFound** — already exists in repo

---

## Pages We Are Missing ❓

These are flows that naturally exist but we have not designed yet:

**11. InstructorProfilePage** — when you tap an instructor name anywhere, you should see their bio, all their classes, ratings and reviews, and a follow button

**12. ClassSignupPage** — the actual booking flow after tapping "Book Now", covering date selection, payment or free confirmation, and success state

**13. EventDetailPage** — when you tap an RSVP event inside a group, you need a full event page with location, date, attendees, and RSVP button

**14. SearchResultsPage** — when someone searches and hits enter, a dedicated results page filtering across hobbies, classes, instructors, and groups

**15. OnboardingPage** — new users need a flow to pick their hobby interests before landing on the home feed

---

Here are the markdown layouts for all 5 missing pages:

---

## InstructorProfilePage

```
┌─────────────────────────────────┐
│ [← Back]              [Share]   │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │      [cover banner image]   │ │
│ └─────────────────────────────┘ │
│         [large avatar]          │
│       Dave Turner               │
│       Model Train Expert        │
│       📍 Portland, OR           │
│                                 │
│ ┌────────┐ ┌────────┐ ┌──────┐ │
│ │  120   │ │  ★4.9  │ │  38  │ │
│ │Taught  │ │ Rating │ │Review│ │
│ └────────┘ └────────┘ └──────┘ │
│                                 │
│ [     Follow     ] [Message]    │
├─────────────────────────────────┤
│ ABOUT                           │
│ Model train builder with 15+    │
│ years of experience. Specialist │
│ in HO scale layouts, scenery    │
│ design, and track wiring.       │
│ Former expo judge 2019–2024.    │
├─────────────────────────────────┤
│ SPECIALTIES                     │
│ [🚂 HO Scale] [🏔 Scenery]      │
│ [⚡ Wiring] [🎨 Painting]        │
├─────────────────────────────────┤
│ CLASSES (12)                    │
│ ┌─────────────────────────────┐ │
│ │ [img] Intro to Model Trains │ │
│ │       Jun 25 · $30 · ★4.9  │ │
│ │       8 spots left  [Book]  │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ [img] Advanced Layout Build │ │
│ │       Jul 9  · $50 · ★5.0  │ │
│ │       12 spots left [Book]  │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ [img] Scenery & Landscaping │ │
│ │       Jul 20 · $40 · ★4.8  │ │
│ │       Full  [Waitlist]      │ │
│ └─────────────────────────────┘ │
│                       See all → │
├─────────────────────────────────┤
│ REVIEWS (38)                    │
│ ┌─────────────────────────────┐ │
│ │ [JR] Jake R.    ★★★★★       │ │
│ │ Best class I've taken.      │ │
│ │ Dave explains everything    │ │
│ │ so clearly. Worth every $!  │ │
│ │ Intro to Model Trains · May │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ [PK] Priya K.   ★★★★☆       │ │
│ │ Really knowledgeable, could │ │
│ │ use more hands-on time but  │ │
│ │ overall great experience.   │ │
│ │ Advanced Layout · Apr       │ │
│ └─────────────────────────────┘ │
│                  Load more →    │
├─────────────────────────────────┤
│ [Home] [Explore] [Classes]      │
│        [Chat]    [Profile]      │
└─────────────────────────────────┘
```

---

## ClassSignupPage

```
┌─────────────────────────────────┐
│ [← Back]          Book a Class  │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ [img] Intro to Model Trains │ │
│ │       Dave Turner  · ★4.9   │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ STEP 1 — PICK A SESSION         │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ ○  Jun 25 · 2pm–4pm         │ │
│ │    8 spots left             │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ ●  Jul 9  · 2pm–4pm         │ │
│ │    12 spots left  ← selected│ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ ○  Jul 23 · 2pm–4pm         │ │
│ │    Full — join waitlist?    │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ STEP 2 — YOUR DETAILS           │
│                                 │
│ Full Name                       │
│ ┌─────────────────────────────┐ │
│ │ Alex Johnson                │ │
│ └─────────────────────────────┘ │
│                                 │
│ Email                           │
│ ┌─────────────────────────────┐ │
│ │ alex@email.com              │ │
│ └─────────────────────────────┘ │
│                                 │
│ Experience Level                │
│ ┌─────────────────────────────┐ │
│ │ Beginner                  ▾ │ │
│ └─────────────────────────────┘ │
│                                 │
│ Special requests (optional)     │
│ ┌─────────────────────────────┐ │
│ │                             │ │
│ │                             │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ STEP 3 — PAYMENT                │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 💳 Card ending in 4242      │ │
│ │    Visa                [✓]  │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ + Add new card              │ │
│ └─────────────────────────────┘ │
│                                 │
│ ORDER SUMMARY                   │
│ ┌─────────────────────────────┐ │
│ │ Intro to Model Trains       │ │
│ │ Jul 9 · 2pm–4pm             │ │
│ │ 1 x class              $30  │ │
│ │ Platform fee            $2  │ │
│ │ ─────────────────────────── │ │
│ │ Total                  $32  │ │
│ └─────────────────────────────┘ │
│                                 │
│ [    Confirm Booking — $32  ]   │
│                                 │
│ 🔒 Secure checkout              │
│ Free cancellation up to 24hrs   │
└─────────────────────────────────┘
```

---

## ClassSignupPage — Success State

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│         ┌───────────┐           │
│         │     ✓     │           │
│         └───────────┘           │
│                                 │
│      You're booked in!          │
│                                 │
│   Intro to Model Trains         │
│   Jul 9 · 2pm–4pm               │
│   with Dave Turner              │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 📅 Add to Calendar          │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ 📧 Confirmation sent to     │ │
│ │    alex@email.com           │ │
│ └─────────────────────────────┘ │
│                                 │
│ MATERIALS NEEDED                │
│ • Starter kit (provided)        │
│ • Comfortable clothing          │
│ • Notebook for notes            │
│                                 │
│ LOCATION                        │
│ 📍 Portland Hobby Center        │
│    123 Train St, Portland OR    │
│    [View on Map]                │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 💬 Message Dave Turner      │ │
│ └─────────────────────────────┘ │
│                                 │
│ [    View My Classes       ]    │
│ [    Back to Home          ]    │
│                                 │
└─────────────────────────────────┘
```

---

## EventDetailPage

```
┌─────────────────────────────────┐
│ [← Back]              [Share]   │
│ ┌─────────────────────────────┐ │
│ │      [event cover image]    │ │
│ └─────────────────────────────┘ │
│ Train Expo Meet 2026            │
│ Hosted by Model Train Builders  │
├─────────────────────────────────┤
│ ┌──────────────────────────────┐│
│ │ 📅 Jul 15, 2026              ││
│ │    10:00 AM – 4:00 PM        ││
│ └──────────────────────────────┘│
│ ┌──────────────────────────────┐│
│ │ 📍 Portland Expo Center      ││
│ │    456 Hobby Ave, Portland   ││
│ │    [View on Map]             ││
│ └──────────────────────────────┘│
│ ┌──────────────────────────────┐│
│ │ 👥 32 going · 14 interested  ││
│ └──────────────────────────────┘│
│                                 │
│ [      ✓ RSVP Going      ]     │
│ [        Interested        ]    │
├─────────────────────────────────┤
│ ABOUT THIS EVENT                │
│ Annual meetup for model train   │
│ enthusiasts in the Portland     │
│ area. Bring your layouts, swap  │
│ parts, and meet fellow builders.│
│ All skill levels welcome.       │
├─────────────────────────────────┤
│ WHAT TO BRING                   │
│ • Your best layout or model     │
│ • Business cards or contacts    │
│ • Cash for the parts swap       │
├─────────────────────────────────┤
│ SCHEDULE                        │
│ ┌─────────────────────────────┐ │
│ │ 10:00am  Doors open         │ │
│ │ 11:00am  Layout showcase    │ │
│ │ 1:00pm   Parts swap begins  │ │
│ │ 2:30pm   Best layout vote   │ │
│ │ 4:00pm   Event closes       │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ GOING (32)                      │
│ [AJ] [SM●] [JR] [PK●] [TW]    │
│ [LC] [MD] [+26 more]  See all →│
├─────────────────────────────────┤
│ RELATED CLASSES                 │
│ ┌─────────────────────────────┐ │
│ │ 📚 Prep for the Expo        │ │
│ │    Dave T. · Jul 1 · $25    │ │
│ │    Get ready before the day │ │
│ │                    [Book →] │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ COMMENTS                        │
│ ┌─────────────────────────────┐ │
│ │ [SM] Sarah · 1d ago         │ │
│ │ So excited for this! Will   │ │
│ │ there be a raffle this year?│ │
│ │ ❤ 4        [Reply]          │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ Add a comment...      [Post]│ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ [Home] [Explore] [Classes]      │
│        [Chat]    [Profile]      │
└─────────────────────────────────┘
```

---

## SearchResultsPage

```
┌─────────────────────────────────┐
│ [←] 🔍 model trains        [✕] │
├─────────────────────────────────┤
│ [All][Hobbies][Classes]         │
│ [Instructors][Groups]           │
├─────────────────────────────────┤
│ HOBBIES (2)                     │
│ ┌─────────────────────────────┐ │
│ │ [img] Model Train Builders  │ │
│ │       2,340 members  [Join] │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ [img] Train Photography     │ │
│ │       890 members   [Join]  │ │
│ └─────────────────────────────┘ │
│                       See all → │
├─────────────────────────────────┤
│ CLASSES (4)                     │
│ ┌─────────────────────────────┐ │
│ │ [img] Intro to Model Trains │ │
│ │       Dave T. · Jun 25      │ │
│ │       $30 · 8 spots [Book]  │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ [img] Advanced Layout Build │ │
│ │       Dave T. · Jul 9       │ │
│ │       $50 · 12 spots [Book] │ │
│ └─────────────────────────────┘ │
│                       See all → │
├─────────────────────────────────┤
│ INSTRUCTORS (2)                 │
│ ┌─────────────────────────────┐ │
│ │ [av] Dave Turner            │ │
│ │      Model Train Expert     │ │
│ │      ★4.9 · 120 taught      │ │
│ │                  [Follow]   │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ [av] Marco Rivera           │ │
│ │      Train Photographer     │ │
│ │      ★4.7 · 45 taught       │ │
│ │                  [Follow]   │ │
│ └─────────────────────────────┘ │
│                       See all → │
├─────────────────────────────────┤
│ GROUPS (1)                      │
│ ┌─────────────────────────────┐ │
│ │ [img] Pacific Northwest     │ │
│ │       Train Collectors      │ │
│ │       456 members  [Join]   │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ NO RESULTS FOR EVENTS           │
│ Try a different search term     │
├─────────────────────────────────┤
│ [Home] [Explore] [Classes]      │
│        [Chat]    [Profile]      │
└─────────────────────────────────┘
```

---

## OnboardingPage

```
┌─────────────────────────────────┐
│                    Skip →       │
│                                 │
│         ●●●○○  Step 1 of 5     │
│                                 │
├─────────────────────────────────┤
│                                 │
│   SCREEN 1 — WELCOME            │
│                                 │
│         [app logo]              │
│                                 │
│      Welcome to HobbyHub        │
│   Discover outdoor hobbies,     │
│   join communities, and book    │
│   classes near you.             │
│                                 │
│   [   Get Started   ]           │
│   Already have an account?      │
│              Log in →           │
│                                 │
├─────────────────────────────────┤
│                                 │
│   SCREEN 2 — PICK YOUR HOBBIES  │
│                                 │
│   What are you into?            │
│   Pick as many as you like      │
│                                 │
│ ┌──────────┐  ┌──────────┐     │
│ │ 🚂       │  │ 🐦       │     │
│ │ Trains   │  │ Birding  │     │
│ └──────────┘  └──────────┘     │
│ ┌──────────┐  ┌──────────┐     │
│ │ 🏹       │  │ 🏛        │     │
│ │ Hunting  │  │ Architect│     │
│ └──────────┘  └──────────┘     │
│ ┌──────────┐  ┌──────────┐     │
│ │ 🌌       │  │ 🎣       │     │
│ │ Astronomy│  │ Fishing  │     │
│ └──────────┘  └──────────┘     │
│ ┌──────────┐  ┌──────────┐     │
│ │ 🥾       │  │ 🏚        │     │
│ │ Hiking   │  │ Urbex    │     │
│ └──────────┘  └──────────┘     │
│                                 │
│   [   Continue   ]              │
│                                 │
├─────────────────────────────────┤
│                                 │
│   SCREEN 3 — SKILL LEVEL        │
│                                 │
│   How experienced are you?      │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 🌱 Beginner                 │ │
│ │    Just starting out        │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ ⚡ Intermediate  ← selected  │ │
│ │    I know the basics        │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ 🏆 Advanced                 │ │
│ │    I could teach this       │ │
│ └─────────────────────────────┘ │
│                                 │
│   [   Continue   ]              │
│                                 │
├─────────────────────────────────┤
│                                 │
│   SCREEN 4 — LOCATION           │
│                                 │
│   Where are you based?          │
│   We'll show nearby classes     │
│   and events                    │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 📍 Portland, Oregon         │ │
│ └─────────────────────────────┘ │
│                                 │
│ [  Use My Location  ]           │
│ [  Enter Manually   ]           │
│                                 │
│   [   Continue   ]              │
│                                 │
├─────────────────────────────────┤
│                                 │
│   SCREEN 5 — NOTIFICATIONS      │
│                                 │
│         🔔                      │
│                                 │
│   Stay in the loop              │
│   Get notified about new        │
│   classes, group activity,      │
│   and upcoming events.          │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 🔔 New classes near me  [✓] │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ 💬 Messages & replies   [✓] │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ 📅 Event reminders      [✓] │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ 🎉 Group updates        [ ] │ │
│ └─────────────────────────────┘ │
│                                 │
│   [   Take Me In   ]            │
│                                 │
└─────────────────────────────────┘
```

---

## Full Page Inventory — All 15 Pages ✅

1. HomePage
2. ExplorePage
3. ClassesPage
4. ClassDetailPage
5. ChatPage (list)
6. ChatPage (conversation)
7. ProfilePage
8. HobbyGroupPage
9. PostDetailPage
10. InstructorProfilePage
11. ClassSignupPage + Success State
12. EventDetailPage
13. SearchResultsPage
14. OnboardingPage (5 screens)
15. NotFound

---

All 15 pages are now fully designed.
