import { ImageResponse } from 'next/og';
import { profile } from '@/content/portfolio';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

/** Favicon: the header's ink monogram box. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0D0D0C',
          color: '#ECEBE7',
          fontSize: 34,
          fontWeight: 900,
          letterSpacing: -2,
        }}
      >
        {profile.initials}
      </div>
    ),
    size,
  );
}
