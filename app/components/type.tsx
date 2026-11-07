/** The red dot that ends every heading. It is the site's one recurring mark. */
export function FullStop() {
  return <span aria-hidden className="full-stop" />
}

/** Heading text ending in the full stop, with the last word and dot kept on one line. */
export function Stopped({ text }: { text: string }) {
  const words = text.split(' ')
  const last = words.pop()

  return (
    <>
      {words.length > 0 && `${words.join(' ')} `}
      <span className="whitespace-nowrap">
        {last}
        <FullStop />
      </span>
    </>
  )
}

const tiles = Array.from({ length: 48 })

/** Tiles in the colour of the section above, which crumble away as this section scrolls in. */
export function Seam({ color }: { color: string }) {
  return (
    <div data-seam aria-hidden className="seam" style={{ color }}>
      {tiles.map((_, i) => (
        <span key={i} />
      ))}
    </div>
  )
}

/** Dots that drift past at different speeds. Positions are percentages of the section. */
export function Dots({ items }: { items: { top: string; left: string; size: number; speed: number; ring?: boolean; mint?: boolean }[] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-clip">
      {items.map((dot) => (
        <span
          key={dot.top + dot.left}
          data-float={dot.speed}
          className={`float-dot ${dot.ring ? 'float-dot-ring' : ''} ${dot.mint ? 'float-dot-mint' : ''}`}
          style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size }}
        />
      ))}
    </div>
  )
}
