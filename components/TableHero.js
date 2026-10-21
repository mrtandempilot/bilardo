// Üstten bilardo masası: 3 bant vuruş çizgisi sayfa açılışında bir kez çizilir.
export default function TableHero() {
  const diamonds = [];
  for (let i = 1; i < 8; i++) {
    diamonds.push(<circle key={"t" + i} cx={40 + i * 65} cy={20} r={3} fill="#E9DCC0" />);
    diamonds.push(<circle key={"b" + i} cx={40 + i * 65} cy={300} r={3} fill="#E9DCC0" />);
  }
  for (let i = 1; i < 4; i++) {
    diamonds.push(<circle key={"l" + i} cx={20} cy={40 + i * 65} r={3} fill="#E9DCC0" />);
    diamonds.push(<circle key={"r" + i} cx={580} cy={40 + i * 65} r={3} fill="#E9DCC0" />);
  }
  return (
    <svg viewBox="0 0 600 320" className="table" role="img"
      aria-label="Üstten bilardo masası ve üç banda değen bir vuruşun izi">
      <rect x="0" y="0" width="600" height="320" rx="18" fill="#4A2418" />
      <rect x="40" y="40" width="520" height="240" fill="#11694A" />
      <rect x="40" y="40" width="520" height="240" fill="none" stroke="#0B4A33" strokeWidth="6" />
      {diamonds}
      <path className="shot" d="M150 210 L470 52 L552 150 L330 272 L246 128"
        fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 7" strokeLinecap="round" />
      <circle cx="150" cy="210" r="9" fill="#F7F4EC" />
      <circle cx="420" cy="200" r="9" fill="#E8B923" />
      <circle cx="246" cy="128" r="9" fill="#C8102E" />
    </svg>
  );
}
