# Happy Kitty 🐱

A cozy browser game: choose a cat, then spoil them with pets, toys, treats and catnip until their happiness bar hits 100%.

## How to play

1. Open `index.html` in any modern browser (no build step or server needed).
2. **Choose your cat.** Each of the 8 cats has a favorite activity (worth ×1.5 points) and a temperament: how fast their happiness fades (🐾 easy-going to 🐾🐾🐾 picky).
3. **Make them happy** in the living room / kitchen:

   | Action | Points | Cooldown |
   |--------|--------|----------|
   | ✋ Pet (or click the cat) | +2 | 0.5s |
   | 🧶 Toy | +3 | 1s |
   | 🐟 Treat | +6 | 2.5s |
   | 🌿 Catnip | +9 | 5s |

   Keyboard shortcuts: `1` pet, `2` toy, `3` treat, `4` catnip.
   Click the cat to pet it, or **stroke it** by dragging across it.
4. Happiness slowly fades, and fades faster the happier the cat is. Doing the same thing over and over gets boring (each repeat is worth less), so mix it up!
5. Fill the bar to 100% to win.

## Extra fun

- **Wishes 💭:** every few seconds the cat wishes for something. Give it within 5 seconds for **double points**; if you miss it, the cat sulks (−4).
- **Combos 🔥:** do *different* actions quickly one after another. A combo of ×3 gives +1 bonus point per action, and ×6 gives +2.
- **Surprises:** click them before they're gone!
  - 🐁 a toy mouse scurries across the floor (+8)
  - 🦋 a butterfly flutters by (+6)
  - 🌟 a golden treat falls from the sky (+15)
  - 🥒 a **scary cucumber** appears! The cat panics and loses happiness until you click the cucumber away.
- **Stars & hats ⭐:** each win earns 1–3 stars depending on your time. Stars unlock hats in the **Dress-up** row (🎀 bow, 🌸 flower, 🧢 cap, 👑 crown, 🎩 top hat, 🎓 grad cap). Stars, best times and your chosen hat are saved in your browser.

## Rooms 🏠

Pick where to play from the **Room** row on the choose-your-cat screen. New rooms unlock as you progress, and each has its own surprise:

| Room | What's there | How to unlock |
|------|--------------|---------------|
| 🛋️ Living Room | A sunny living room with a couch, bookshelf, swinging pendant lamp and a big comfy rug. The toy mouse 🐁 visits. | Open from the start |
| 🛏️ Cozy Bedroom | Fairy lights, a fluffy bed, a starry night window, a swinging star mobile and a cat-bed basket. A feather wand 🪶 pops out to play. | Win 3 games |
| 🌻 Sunny Catio | A screened-in patio with a cat tree, a hanging plant, sunflowers and a garden view. Birds 🐦 come to visit. | Collect 8 stars |

## Secret cats 🔒

Seven hidden cats appear as mystery silhouettes until you unlock them. Each locked card shows its goal and your progress.

| Cat | How to unlock |
|-----|---------------|
| ✨ Midas, the Golden Cat | Earn ★★★ with any cat |
| 👻 Boo, the Ghost Cat | Win with 4 different cats |
| 🌌 Cosmo, the Galaxy Cat | Catch 12 surprises |
| 🌈 Prism, the Rainbow Cat | Reach a ×15 combo |
| 🐯 Stripes, the Tiger Cub | Grant 20 wishes |
| 🍔 Sir Chonkington, the Absolute Unit | Give 50 treats |
| 🦁 King Leo, the Little Lion | Collect 20 stars |

Progress counts across all your games, even ones you don't finish. Newly unlocked cats are revealed on the win screen and get a **NEW!** badge.

## Files

- `index.html` contains the screens
- `rooms.js` holds the room artwork (inline SVG) and the room unlock rules
- `style.css` holds the storybook styling, layout, cat moods and animations (fonts: Fredoka and Nunito from Google Fonts, with system fallbacks)
- `game.js` has the cats, game logic, cat artwork generator and sound effects (Web Audio)
