import { redirect } from "next/navigation";
export async function GET(request: Request, { params }: { params: Promise<{ ghslug: string }> }) {
  const { ghslug } = await params;
  return redirect(`https://github.com/Badbird5907/${ghslug}`);
}