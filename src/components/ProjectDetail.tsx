import { useEffect, useState } from 'react'

// Renders inline SVG safely by injecting it as innerHTML.
// The SVG content is from a trusted local data file, not user input.
export function Arch({ svg }: { svg: string }) {
  const [ref, setRef] = useState<HTMLDivElement | null>(null)
  useEffect(() => {
    if (ref) ref.innerHTML = svg
  }, [svg, ref])
  return <div ref={setRef} className="arch-wrap" />
}
