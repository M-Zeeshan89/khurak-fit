# khurakfit.com · how the website works

| Address | What it is |
|---|---|
| https://khurakfit.com/ | Home page (features, video, FAQ) |
| https://khurakfit.com/app/ | The web app (works on iPhone: Safari → Share → Add to Home Screen) |
| https://khurakfit.com/privacy.html | Privacy policy (for Google Play) |
| https://khurakfit.com/delete-account.html | Account deletion (for Google Play) |
| https://khurakfit.com/terms.html | Terms of use |
| https://khurakfit.com/support.html | Help & support (support@khurakfit.com) |

## Automatic upload to the hosting

Every change merged into `main` is uploaded to the hosting by **Actions → Upload website to hosting**. Only changed files are sent.

One-time setup, in this repository: **Settings → Secrets and variables → Actions**

**Secrets** (tab "Secrets" → New repository secret):

| Name | Value (from your hosting panel → FTP accounts) |
|---|---|
| `FTP_SERVER` | FTP host, for example `ftp.khurakfit.com` or the IP address |
| `FTP_USERNAME` | FTP username |
| `FTP_PASSWORD` | FTP password |

**Variables** (tab "Variables", only if needed):

| Name | When to set it |
|---|---|
| `FTP_DIR` | Folder the site goes in, ending with `/`. Leave empty if your FTP login opens straight into the website folder; use `public_html/` if it opens one level above it. |
| `FTP_PROTOCOL` | `ftps` (default, encrypted). Change to `ftp` only if the upload fails with a TLS/SSL error. |
| `FTP_PORT` | Only if your host uses a port other than 21. |

Then open **Actions → Upload website to hosting → Run workflow** to send the first upload.

## Before making this repository private

1. Check that https://khurakfit.com/privacy.html opens.
2. In Play Console, change the privacy policy and account deletion links to the khurakfit.com addresses above.
3. Then Settings → General → Danger zone → Change visibility → Private. (The free github.io copy of the site stops working at that point, which is fine once Play Console uses khurakfit.com.)
