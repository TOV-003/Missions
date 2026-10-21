import { SvgXml } from "react-native-svg";

const logoXml = `<svg width="103" height="103" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_358_245)">
<rect width="96.2207" height="96.2207" fill="#8AD8FF" shape-rendering="crispEdges"/>
<rect x="3.0069" y="3.0069" width="90.2069" height="90.2069" stroke="#121212" stroke-width="6.01379" shape-rendering="crispEdges"/>
<path d="M51.5925 18.1526L29.4659 52.1754H44.6539V77.9948L66.7805 43.581H51.5925V18.1526Z" fill="#FF6B4A" stroke="black" stroke-width="4.51035"/>
</g>
<defs>
<filter id="filter0_d_358_245" x="0" y="0" width="102.234" height="102.234" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="6.01379" dy="6.01379"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_358_245"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_358_245" result="shape"/>
</filter>
</defs>
</svg>
`;

export default function Logo({ size = 40 }: { size?: number }) {
  return <SvgXml xml={logoXml} width={size} height={size} />;
}
