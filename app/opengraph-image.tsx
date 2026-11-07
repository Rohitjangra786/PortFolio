import { ImageResponse } from 'next/og'

export const alt = 'Rohit Kumar, full-stack developer and Assistant Professor'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          color: '#ffffff',
          background: 'radial-gradient(900px 600px at 85% 0%, #3b2d71, #131424 70%)',
        }}
      >
        <div style={{ display: 'flex', fontSize: 120, letterSpacing: -4, lineHeight: 1 }}>
          Rohit Kumar<span style={{ color: '#f13024' }}>.</span>
        </div>
        <div style={{ fontSize: 38, marginTop: 28, color: '#d7d3e8' }}>
          Full-Stack Developer · Assistant Professor · EdTech Founder
        </div>
      </div>
    ),
    size,
  )
}
