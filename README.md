# Sara's Flashcards (web)

A plain HTML/JS app (PWA). Flashcards are stored in Firebase Firestore and are private to the Google account you sign in with. The same URL works on phone and computer.

**Files**

| File | Purpose |
|---|---|
| `index.html` | The whole app |
| `config.js` | Firebase project settings (not secret; the security rules protect the data) |
| `firestore.rules` | Security rules: each user can only read and write their own data |
| `sw.js`, `manifest.json` | Offline use and "Add to Home screen" |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`, `favicon-32.png`, `favicon.ico` | The app icon: browser tab icon (favicon), logo in the app, and the home-screen icon on Android and iPhone |
| `icon.svg` | Old placeholder icon, no longer used (can be deleted) |

---
# Resources
1. https://a20sarle.github.io/flashcards/
2. https://firebase.google.com/
---

## Setup record (what was done, in order)

All six steps are **completed**. Follow them again to rebuild the setup from scratch.

### Step 1. Create a Firebase project
1. Open <https://console.firebase.google.com> and click **Create a project**.
2. Name: `Flashcards` (project ID `flashcards-290df`), free **Spark plan**.

### Step 2. Turn on Google sign-in
1. In the console, click the **magnifier** in the left sidebar and search for **Authentication**.
2. Click **Get started**.
3. Under **Sign-in method**, choose **Google** and switch it to **Enable**.
4. Select a support email (your own) and click **Save**.

### Step 3. Create the database and add the security rules
1. Search for **Firestore Database** and click **Create database**.
2. Location: **eur3** (Europe multi-region), chosen for availability and EU data storage. It **cannot be changed later**.
3. Choose **Start in production mode**, then click **Create**.
4. Open the **Rules** tab and replace everything with the contents of `firestore.rules`.
5. Click **Publish**.

### Step 4. Register the web app and fill in `config.js`
1. Click the **gear** icon in the left sidebar, then **General**.
2. Scroll to **Your apps** and click the **`</>`** (web) icon.
3. Nickname (for example `Flashcards web`). Leave **Firebase Hosting** unticked and click **Register app**.
4. Copy `apiKey`, `authDomain`, `projectId` and `appId` from the code shown into `config.js`.

### Step 5. Publish the site on GitHub Pages
1. On <https://github.com> click **+ > New repository**.
2. Name it (for example `flashcards`), set it to **Public**, and leave **README, .gitignore and license unticked**. Click **Create repository**.
3. On the empty repo page click **uploading an existing file**. Drag in the files from `C:\SF\SaraFlashcardsWeb` (the files themselves, not the folder, so `index.html` is at the top level) and click **Commit changes**.
4. Go to **Settings > Pages > Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and **Save**.
5. After a minute the site is live at `https://<your-username>.github.io/<repository-name>/`.

### Step 6. Allow your site to sign in
1. In the Firebase console, open **Authentication > Settings > Authorized domains**.
2. Click **Add domain** and enter only `<your-username>.github.io` (no `https://`, no repository name).

Without this step, the Google sign-in popup fails on the published site.

---

## Using the app

- **Computer:** open the GitHub Pages URL and sign in with Google.
- **Phone:** open the same URL in Chrome, sign in with the same account, then use the browser menu > **Add to Home screen**.
- **Bring over the Android data:** on the deck list tap **Import file** and select the Android app's backup `.json`. Old rich text (bold, colors, sizes) is converted automatically.
- **Decks:** the home screen shows decks as colourful tiles. Use the pencil on a tile to rename a deck and the bin to delete it (you are asked first, and can **Undo** straight afterwards). Inside a deck, the pencil in the top bar renames it; with more than 5 cards a search box appears; the switch on each card puts it in or out of practice.
- **Undo and dialogs:** the app uses its own dialogs and a small message bar instead of browser pop-ups. Deleting a card, a source or a deck shows **Undo** for a few seconds. Leaving the card editor with unsaved changes asks first.
- **Dark mode:** the app follows the light/dark setting of your phone or computer.
- **Backups:** **Back up now** (bottom of the home screen) saves a snapshot of all decks, cards and sources inside the app (in Firebase). Snapshots are listed under **Backups**, where each can be renamed, restored (replaces items with the same id and keeps everything else) or deleted.
- **Practice:** inside a deck, **▶ Practice** opens a full-screen feed in the style of a reels feed. Swipe (or scroll) up for the next card, tap anywhere on the screen to flip the card, and tap the **♡ I know this one** button to take it out of the rotation. The feed keeps looping through the cards you don't know yet and ends with a "You know all the cards" screen. **←** returns to the deck. On the back of a card, an **archive icon** under the heart opens a small speech bubble with the card's General info (sources and extra notes); the icon only appears when the card has some.
- **Read aloud:** inside a deck, the voice and language picker sits under the buttons. Voices are grouped by language, your own language first. Choosing one plays a short sample. **🔊 Read aloud** opens one calm list of all the cards: it is built once and never swapped out while reading. The card being read is highlighted softly (and the front/back part being spoken), and the list glides along with it. Tap a card in the list to continue from it; ⏮ ⏯ ⏭ control playback. All changes are slow fades without flashing, and if your phone or computer has "reduce motion" switched on, the list moves without animation.
- **Editing a card:** a full-screen editor in the style of a notes app. The top bar has **←** and **✓ Save**; **Front**, **Back** and **General info** are on the same page, each about a third of the screen tall. Drag the grip bar under a field to make it taller or shorter. A one-line, icon-only formatting bar (in the style of Samsung Notes) sits right above the keyboard: text colour, highlight, text size, undo, redo, **B**, *I*, <u>U</u>, strikethrough, numbered list, bullet list and clear formatting. Select some text, then:
  - **Text colour / highlight:** tap the icon to open a small colour menu and tap a colour to apply it (the strip under the icon shows the colour in use). The multicoloured swatch in the menu opens **Add a colour**: type a hex code (for example `#FF8800`) and tap **Add** to put it in the colour list. Your own colours and the last colour used are remembered.
  - **Text size:** the number with a small arrow (for example `12 ▾`) opens a menu of sizes. The standard size of card text is 12 in the editor, in practice and in read aloud (change `--txt` in the styles to alter it).
- **Sources:** next to the **General info** label, one dropdown holds your saved sources. Pick one to add its text on a new line, then keep typing. The last entries of the dropdown are **＋ New source…** (saves a new one and adds it) and **Remove a source…** (opens a list with a bin for each source; cards that already use a source keep their text).

## Test mode (local only)

When the app runs from `localhost` (see *Test locally*), the sign-in screen shows **🧪 Test mode (no login)**. It keeps data in that browser instead of Firebase. The button does not appear on the published site.

## Updating the site

Edit the files, then on GitHub use **Add file > Upload files** (or the pencil icon on a single file) and commit. Pages redeploys in about a minute. Refresh twice, because the app caches files for offline use.

## Test locally (optional)

Run this in the project folder:

```
python -m http.server 8000
```

Then open <http://localhost:8000>. `localhost` is already an authorized domain in Firebase.
