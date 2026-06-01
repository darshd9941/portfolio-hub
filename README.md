# Portfolio Hub

A Next.js portfolio site with a public homepage and a private dashboard foundation.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Safety

The `/dashboard` route is protected in production by `src/proxy.ts`.

Set these environment variables in the hosting provider before using the dashboard:

```bash
DASHBOARD_USER=your-username
DASHBOARD_PASSWORD=use-a-long-random-password
```

If those values are missing in production, `/dashboard` returns `404`.

## Deploy Fast With Vercel

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Add `DASHBOARD_USER` and `DASHBOARD_PASSWORD` in Vercel project settings.
4. Add your custom domain in Vercel.
5. Point your domain DNS records to Vercel.

## Scripts

```bash
npm run lint
npm run build
npm run dev
```
