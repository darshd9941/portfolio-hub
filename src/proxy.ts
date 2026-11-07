import { NextResponse, type NextRequest } from "next/server";

// Compares two strings in constant time so the password can't be guessed
// character-by-character from response timing.
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) {
    return false;
  }

  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

function isAuthorized(request: NextRequest, user: string, password: string) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Basic ")) {
    return false;
  }

  let decoded: string;
  try {
    decoded = atob(authHeader.slice("Basic ".length).trim());
  } catch {
    return false;
  }

  // Split on the first ":" only, so passwords may contain colons.
  const separator = decoded.indexOf(":");
  if (separator === -1) {
    return false;
  }

  const givenUser = decoded.slice(0, separator);
  const givenPassword = decoded.slice(separator + 1);

  // Evaluate both so the check takes the same time either way.
  const userOk = safeEqual(givenUser, user);
  const passwordOk = safeEqual(givenPassword, password);
  return userOk && passwordOk;
}

export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  const dashboardUser = process.env.DASHBOARD_USER;
  const dashboardPassword = process.env.DASHBOARD_PASSWORD;

  if (!dashboardUser || !dashboardPassword) {
    return new NextResponse("Not found", { status: 404 });
  }

  if (isAuthorized(request, dashboardUser, dashboardPassword)) {
    return NextResponse.next();
  }

  return new NextResponse("Authentication required", {
    headers: {
      "WWW-Authenticate": 'Basic realm="Private dashboard"',
    },
    status: 401,
  });
}

export const config = {
  // /api is included: every API route reads or writes the private database.
  matcher: ["/private/:path*", "/dashboard/:path*", "/api/:path*"],
};
