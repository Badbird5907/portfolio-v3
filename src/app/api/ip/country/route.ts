export async function GET(request: Request) {
  const country = request.headers.get("X-Vercel-IP-Country") ?? "CA";
  return new Response(country);
}
