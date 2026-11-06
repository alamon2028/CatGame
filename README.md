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
4. Happiness slowly fades, and fades faster the happier the cat is. Doing the same thing over and over gets boring (each repeat is worth less), so mix it up!
5. Fill the bar to 100% to win. Your best time for each cat is saved in your browser.

## Files

- `index.html` contains the screens and the living room / kitchen scene (inline SVG)
- `style.css` holds the layout, cat moods and animations
- `game.js` has the cats, game logic, cat artwork generator and sound effects (Web Audio)
