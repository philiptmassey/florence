import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'Missing URL' }, { status: 400 });
    }

    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch URL' }, { status: 500 });
    }

    const html = await res.text();

    // Simple way to extract text from HTML (strip tags)
    const text = html.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '') // remove scripts
                     .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '')   // remove styles
                     .replace(/<\/?[^>]+(>|$)/g, ' ')                   // remove HTML tags
                     .replace(/\s+/g, ' ')                              // collapse whitespace
                     .trim();

    return NextResponse.json({ text });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}