# FCM & CMO form email configuration

The website form endpoint is `/api/fcm-cmo-submit`. It sends submitted form data to `info@niaznet.net` using Resend.

The current Vercel project has no configured environment variables, so online submission intentionally returns HTTP 503 until these two variables are configured:

- `RESEND_API_KEY` — a Resend API key with permission to send email.
- `FCM_EMAIL_FROM` — a sender identity verified in the Resend account, for example `NIAZ NET Website <forms@niaznet.net>` only after that address/domain has been verified.

Configure both variables in Vercel Project Settings → Environment Variables for Preview and Production. Do not put the API key in frontend code, GitHub files, or chat messages. After saving them, redeploy the preview branch and test a submission to confirm delivery to `info@niaznet.net`.

No Production deployment has been promoted as part of this change.
