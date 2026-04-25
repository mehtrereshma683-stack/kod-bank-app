import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kodbank — Banking, beautifully simple" },
      { name: "description", content: "Kodbank: a modern, secure customer banking experience. Sign up, log in, and check your balance instantly." },
      { name: "author", content: "Kodbank" },
      { property: "og:title", content: "Kodbank — Banking, beautifully simple" },
      { property: "og:description", content: "Kodbank: a modern, secure customer banking experience. Sign up, log in, and check your balance instantly." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Kodbank — Banking, beautifully simple" },
      { name: "twitter:description", content: "Kodbank: a modern, secure customer banking experience. Sign up, log in, and check your balance instantly." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fccfee9c-d133-4639-b862-2141c6c36a02/id-preview-c391a7e1--a4c9a94a-9b77-42fb-8c61-c507e5588142.lovable.app-1777097623386.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fccfee9c-d133-4639-b862-2141c6c36a02/id-preview-c391a7e1--a4c9a94a-9b77-42fb-8c61-c507e5588142.lovable.app-1777097623386.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
