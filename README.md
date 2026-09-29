# Sara's Flashcards (web)

A plain HTML/JS app (PWA). Flashcards are stored in Firebase Firestore and are private to the Google account you sign in with. The same URL works on phone and computer.

**Files**

| File | Purpose |
|---|---|
| `index.html` | The whole app |
| `config.js` | Firebase project settings (not secret; the security rules protect the data) |
| `firestore.rules` | Security rules: each user can only read and write their own data |
| `sw.js`, `manifest.json`, `icon.svg` | Offline use and "Add to Home screen" |

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
- **Bring over the Android data:** on the deck list tap **Restore** and select the Android app's backup `.json`. Old rich text (bold, colors, sizes) is converted automatically.
- **Backup:** **Backup** downloads all decks and cards as a `.json` file. The Android app cannot read this newer format.

## Updating the site

Edit the files, then on GitHub use **Add file > Upload files** (or the pencil icon on a single file) and commit. Pages redeploys in about a minute. Refresh twice, because the app caches files for offline use.

## Test locally (optional)

Run this in the project folder:

```
python -m http.server 8000
```

Then open <http://localhost:8000>. `localhost` is already an authorized domain in Firebase.
