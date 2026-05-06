import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  const dashboardUser = process.env.DASHBOARD_USER;
  const dashboardPassword = process.env.DASHBOARD_PASSWORD;

  if (!dashboardUser || !dashboardPassword) {
    return new NextResponse("Not found", { status: 404 });
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader?.startsWith("Basic ")) {
    const encodedCredentials = authHeader.split(" ")[1];
    const [username, password] = atob(encodedCredentials).split(":");

    if (username === dashboardUser && password === dashboardPassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    headers: {
      "WWW-Authenticate": 'Basic realm="Private dashboard"',
    },
    status: 401,
  });
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
