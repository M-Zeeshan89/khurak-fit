# Khurak Fit website: iPhone app, privacy policy and account deletion

This folder is a complete website. Put it online for free with GitHub Pages and you get:

- **The iPhone version.** People open the site in Safari and tap Share → **Add to Home Screen**. It then opens like an app, works offline and keeps its data on the phone. It also works on any computer or Android browser.
- **Your privacy policy page** (`privacy.html`). Google Play requires a link to it.
- **Your account deletion page** (`delete-account.html`). Google Play also requires this link for apps with accounts.

## Put it online (about 5 minutes)

1. On github.com, click **+ → New repository**. Name it `khurak-fit`, choose **Public** (GitHub Pages is free for public repositories), and click **Create repository**.
2. Click **uploading an existing file**. Drag in **everything inside this folder**, including the `gifs` and `icons` folders and the hidden `.nojekyll` file. Click **Commit changes**.
3. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. Wait 1–2 minutes. Your site will be at:
   `https://YOUR-GITHUB-NAME.github.io/khurak-fit/`

Your links for Google Play Console:
- Privacy policy: `https://YOUR-GITHUB-NAME.github.io/khurak-fit/privacy.html`
- Account deletion: `https://YOUR-GITHUB-NAME.github.io/khurak-fit/delete-account.html`

## Fill in your details (once)

These appear in three places. The easiest way is to send the values to Claude, which will rebuild everything for you. To do it yourself, open each file in GitHub (pencil icon), use Ctrl+F, and edit:

| What | Where | Line to edit |
|---|---|---|
| Support email | `index.html` and the Android `index.html` | `const KF_LINKS={contact:"you@example.com",site:"https://YOUR-NAME.github.io/khurak-fit"};` |
| Backup server (from BACKUP-SETUP.md) | `index.html`, Android `index.html` and `delete-account.html` | `const KF_CLOUD={apiKey:"AIza...",dbURL:"https://...firebaseio.com"};` |
| AI server (from AI-SERVER-SETUP.md) | `index.html` and Android `index.html` | `const KF_AI={url:"https://khurak-ai....workers.dev"};` |

The privacy page shows your support email once `KF_LINKS.contact` is set and the site is rebuilt. Claude can do that for you.

## Updating later

Upload the new `index.html` (and any new files) to the same repository. The site updates within a minute, and installed iPhone apps pick up the new version the next time they're opened online.

## What's different on iPhone

- **Steps:** counted only while the app is open, after the person allows motion access. The Android app counts in the background.
- **Reminders:** shown while the app is open. iPhone home-screen apps can't get the Android app's background alarms.
- **Everything else works:** diet plans, calculator, barcode scan, workouts with the moving coach, languages, backup and the AI coach.
