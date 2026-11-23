/**
 * The EC4YOU mark, redrawn as SVG from the official icon (Icon_Logo_-_EC4You.png):
 * 20 dots and dashes on a 5 × 6 grid. `currentColor` lets it sit on any surface.
 */
const SHAPES = '<circle cx="1006" cy="26.5" r="26"/><rect x="186" y="216" width="181" height="51"/><circle cx="519.5" cy="241.5" r="26"/><rect x="672" y="216" width="181" height="51"/><circle cx="1006" cy="241.5" r="26"/><circle cx="31.5" cy="457" r="26"/><circle cx="275" cy="457" r="26"/><circle cx="518" cy="457" r="26"/><circle cx="761.5" cy="457" r="26"/><rect x="914" y="431" width="181" height="52"/><rect x="184" y="647" width="182" height="51"/><circle cx="518" cy="672.5" r="26"/><rect x="671" y="647" width="181" height="51"/><rect x="914" y="647" width="181" height="51"/><rect x="428" y="862" width="181" height="51"/><rect x="671" y="862" width="181" height="51"/><rect x="914" y="862" width="181" height="51"/><circle cx="518" cy="1103" r="26"/><circle cx="761.5" cy="1103" r="26"/><rect x="914" y="1077" width="181" height="52"/>';

export function LogoMark({size = 28, className = '', title}: {size?: number; className?: string; title?: string}) {
  return (
    <svg
      width={size}
      height={(size * 1130) / 1100}
      viewBox="0 0 1100 1130"
      fill="currentColor"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      dangerouslySetInnerHTML={{__html: (title ? `<title>${title}</title>` : '') + SHAPES}}
    />
  );
}

/** Icon + "EC4YOU" wordmark set in Poppins, as in the official secondary logo. */
export function Logo({size = 26, className = ''}: {size?: number; className?: string}) {
  return (
    <span className={`brand-logo ${className}`}>
      <LogoMark size={size} />
      <span className="brand-logo__word">EC4YOU</span>
    </span>
  );
}
