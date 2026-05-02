import { readdir } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

const IMAGE_EXT =
  /\.(png|jpe?g|webp|gif|svg|avif|bmp|ico)$/i;

export async function GET() {
  const dir = join(process.cwd(), "public", "images", "client");

  try {
    const entries = await readdir(dir, { withFileTypes: true });
    const paths = entries
      .filter((e) => e.isFile() && IMAGE_EXT.test(e.name))
      .map((e) => `/images/client/${e.name}`)
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

    return NextResponse.json(paths);
  } catch {
    return NextResponse.json(
      { error: "Failed to read client logos" },
      { status: 500 },
    );
  }
}
