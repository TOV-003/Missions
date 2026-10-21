import { SvgXml } from "react-native-svg";

const clock = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.33333 7.58335C2.33333 10.159 4.4244 12.25 7 12.25C9.5756 12.25 11.6667 10.159 11.6667 7.58335C11.6667 5.00775 9.5756 2.91669 7 2.91669C4.4244 2.91669 2.33333 5.00775 2.33333 7.58335V7.58335" stroke-width="1.16667" stroke="#121212"/>
<path d="M7 5.25V7.58333L8.16667 8.75M2.91667 1.75L1.16667 3.5M12.8333 3.5L11.0833 1.75" stroke-width="1.16667" stroke="#121212"/>
</svg>
`;

const calendar = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.75 2.33331H12.25V12.8333H1.75V2.33331Z" stroke-width="1.16667" stroke-linecap="square" stroke="#121212"/>
<path d="M9.33333 1.16669V3.50002" stroke-width="1.16667" stroke="#121212"/>
<path d="M4.66667 1.16669V3.50002" stroke-width="1.16667" stroke="#121212"/>
<path d="M1.75 5.83331H12.25" stroke-width="1.16667" stroke="#121212"/>
</svg>
`;

const deleteIcon = `<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_336_1930)">
<rect width="40" height="40" fill="white" shape-rendering="crispEdges"/>
<rect x="1" y="1" width="38" height="38" stroke="#121212" stroke-width="2" shape-rendering="crispEdges"/>
<path d="M25.8334 15.8333L25.1109 25.9517L23.4484 27.5H16.5517L14.8892 25.9517L14.1667 15.8333M25.8334 15.8333H22.5M25.8334 15.8333H26.6667M14.1667 15.8333H13.3334M14.1667 15.8333H17.5M18.3334 19.1667V24.1667M21.6667 19.1667V24.1667M22.5 15.8333V13.3333C22.5 12.8731 22.1269 12.5 21.6667 12.5H18.3334C17.8731 12.5 17.5 12.8731 17.5 13.3333V15.8333M22.5 15.8333H17.5" stroke-width="1.66667" stroke-linecap="square" stroke="#121212"/>
</g>
<defs>
<filter id="filter0_d_336_1930" x="0" y="0" width="42" height="42" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="2" dy="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_336_1930"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_336_1930" result="shape"/>
</filter>
</defs>
</svg>
`;

const edit = `<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_336_1927)">
<rect width="40" height="40" fill="white" shape-rendering="crispEdges"/>
<rect x="1" y="1" width="38" height="38" stroke="#121212" stroke-width="2" shape-rendering="crispEdges"/>
<path d="M19.1666 14.1667H13.3334L13.3334 26.6667H25.8333V20.8333M17.5 20.1433L24.655 12.9883L26.2759 12.5338L27.4662 13.7242L27.0117 15.345L19.8567 22.5H17.5V20.1433Z" stroke-width="1.66667" stroke-linecap="square" stroke="#121212"/>
</g>
<defs>
<filter id="filter0_d_336_1927" x="0" y="0" width="42" height="42" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="2" dy="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_336_1927"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_336_1927" result="shape"/>
</filter>
</defs>
</svg>
`;

const back = `<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_336_1918)">
<rect width="40" height="40" fill="#8AD8FF" shape-rendering="crispEdges"/>
<rect x="1" y="1" width="38" height="38" stroke="#121212" stroke-width="2" shape-rendering="crispEdges"/>
<path d="M22.5 25.8333L16.6667 20L22.5 14.1667" stroke-width="2.5" stroke-linecap="square" stroke="#121212"/>
</g>
<defs>
<filter id="filter0_d_336_1918" x="0" y="0" width="42" height="42" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="2" dy="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_336_1918"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_336_1918" result="shape"/>
</filter>
</defs>
</svg>
`;

const checked = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_336_1988)">
<rect width="24" height="24" fill="#8AD8FF" shape-rendering="crispEdges"/>
<rect x="1" y="1" width="22" height="22" stroke="#121212" stroke-width="2" shape-rendering="crispEdges"/>
<path d="M7.33331 12.6667L9.99998 15.3334L16.6666 8.66669" stroke-width="2.33333" stroke-linecap="square" stroke="#121212"/>
</g>
<defs>
<filter id="filter0_d_336_1988" x="0" y="0" width="26" height="26" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="2" dy="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_336_1988"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_336_1988" result="shape"/>
</filter>
</defs>
</svg>
`;

const unchecked = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_336_2006)">
<rect width="24" height="24" fill="white"/>
<rect x="1" y="1" width="22" height="22" stroke="#121212" stroke-width="2"/>
</g>
<defs>
<filter id="filter0_d_336_2006" x="0" y="0" width="26" height="26" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="2" dy="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 0 0.0705882 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_336_2006"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_336_2006" result="shape"/>
</filter>
</defs>
</svg>
`;

const subtaskdone = `<svg width="66" height="30" viewBox="0 0 66 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="65" height="29" fill="#8AD8FF"/>
<rect x="0.5" y="0.5" width="65" height="29" stroke="#121212"/>
<path d="M12.088 21V18.28H14.744C15.3413 18.28 15.8587 18.1733 16.296 17.96C16.7333 17.736 17.0693 17.4 17.304 16.952C17.5387 16.504 17.656 15.9493 17.656 15.288C17.656 14.6267 17.5333 14.0773 17.288 13.64C17.0533 13.2027 16.7173 12.8773 16.28 12.664C15.8533 12.44 15.3413 12.328 14.744 12.328H11.928V9.608H14.744C15.64 9.608 16.4613 9.74133 17.208 10.008C17.9653 10.2747 18.6213 10.6587 19.176 11.16C19.7307 11.6613 20.1573 12.264 20.456 12.968C20.7653 13.6613 20.92 14.44 20.92 15.304C20.92 16.168 20.7653 16.952 20.456 17.656C20.1573 18.3493 19.7307 18.9467 19.176 19.448C18.6213 19.9493 17.9707 20.3333 17.224 20.6C16.4773 20.8667 15.6613 21 14.776 21H12.088ZM9.944 21V9.608H13.144V21H9.944ZM27.8573 21.224C26.9613 21.224 26.1346 21.0747 25.3773 20.776C24.6306 20.4773 23.9746 20.0613 23.4093 19.528C22.8546 18.9947 22.4226 18.3653 22.1132 17.64C21.8039 16.9147 21.6493 16.1307 21.6493 15.288C21.6493 14.4347 21.7986 13.6507 22.0972 12.936C22.4066 12.2213 22.8386 11.5973 23.3932 11.064C23.9479 10.5307 24.5986 10.12 25.3452 9.832C26.1026 9.53333 26.9293 9.384 27.8253 9.384C28.7213 9.384 29.5426 9.53333 30.2892 9.832C31.0466 10.12 31.7026 10.5307 32.2573 11.064C32.8119 11.5973 33.2386 12.2267 33.5373 12.952C33.8466 13.6667 34.0013 14.4507 34.0013 15.304C34.0013 16.1467 33.8466 16.9307 33.5373 17.656C33.2386 18.3707 32.8119 19 32.2573 19.544C31.7026 20.0773 31.0519 20.4933 30.3053 20.792C29.5586 21.08 28.7426 21.224 27.8573 21.224ZM27.8253 18.408C28.4226 18.408 28.9399 18.28 29.3773 18.024C29.8146 17.768 30.1506 17.4053 30.3853 16.936C30.6199 16.4667 30.7373 15.9173 30.7373 15.288C30.7373 14.8187 30.6679 14.3973 30.5293 14.024C30.4013 13.64 30.2093 13.3147 29.9533 13.048C29.6973 12.7707 29.3879 12.5627 29.0252 12.424C28.6733 12.2747 28.2733 12.2 27.8253 12.2C27.2279 12.2 26.7106 12.328 26.2733 12.584C25.8359 12.8293 25.4999 13.1867 25.2653 13.656C25.0306 14.1147 24.9132 14.6587 24.9132 15.288C24.9132 15.768 24.9773 16.2 25.1052 16.584C25.2439 16.968 25.4412 17.2987 25.6973 17.576C25.9533 17.8427 26.2572 18.0507 26.6092 18.2C26.9719 18.3387 27.3773 18.408 27.8253 18.408ZM35.319 21V9.608H37.559L38.519 12.008V21H35.319ZM43.159 21L36.551 12.696L37.559 9.608L44.167 17.912L43.159 21ZM43.159 21L42.359 18.472V9.608H45.559V21H43.159ZM47.444 21V9.608H50.644V21H47.444ZM50.036 21V18.344H56.148V21H50.036ZM50.036 16.488V13.896H55.556V16.488H50.036ZM50.036 12.264V9.608H56.052V12.264H50.036Z" fill="#121212"/>
</svg>
`;

const subtaskpending = `<svg width="93" height="30" viewBox="0 0 93 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="92" height="29" fill="#D4B5FF"/>
<rect x="0.5" y="0.5" width="92" height="29" stroke="#121212"/>
<path d="M12.536 17V14.696H14.6C14.8453 14.696 15.0693 14.648 15.272 14.552C15.4853 14.4453 15.656 14.2907 15.784 14.088C15.912 13.8747 15.976 13.6133 15.976 13.304C15.976 12.9947 15.912 12.7387 15.784 12.536C15.656 12.3227 15.4853 12.168 15.272 12.072C15.0693 11.9653 14.8453 11.912 14.6 11.912H12.536V9.608H15.224C15.96 9.608 16.6213 9.75733 17.208 10.056C17.8053 10.344 18.2747 10.7653 18.616 11.32C18.968 11.864 19.144 12.5253 19.144 13.304C19.144 14.072 18.968 14.7333 18.616 15.288C18.2747 15.8427 17.8053 16.2693 17.208 16.568C16.6213 16.856 15.96 17 15.224 17H12.536ZM9.944 21V9.608H13.144V21H9.944ZM20.2878 21V9.608H23.4878V21H20.2878ZM22.8798 21V18.344H28.9918V21H22.8798ZM22.8798 16.488V13.896H28.3997V16.488H22.8798ZM22.8798 12.264V9.608H28.8958V12.264H22.8798ZM30.5065 21V9.608H32.7465L33.7065 12.008V21H30.5065ZM38.3465 21L31.7385 12.696L32.7465 9.608L39.3545 17.912L38.3465 21ZM38.3465 21L37.5465 18.472V9.608H40.7465V21H38.3465ZM44.7755 21V18.28H47.4315C48.0288 18.28 48.5462 18.1733 48.9835 17.96C49.4208 17.736 49.7568 17.4 49.9915 16.952C50.2262 16.504 50.3435 15.9493 50.3435 15.288C50.3435 14.6267 50.2208 14.0773 49.9755 13.64C49.7408 13.2027 49.4048 12.8773 48.9675 12.664C48.5408 12.44 48.0288 12.328 47.4315 12.328H44.6155V9.608H47.4315C48.3275 9.608 49.1488 9.74133 49.8955 10.008C50.6528 10.2747 51.3088 10.6587 51.8635 11.16C52.4182 11.6613 52.8448 12.264 53.1435 12.968C53.4528 13.6613 53.6075 14.44 53.6075 15.304C53.6075 16.168 53.4528 16.952 53.1435 17.656C52.8448 18.3493 52.4182 18.9467 51.8635 19.448C51.3088 19.9493 50.6582 20.3333 49.9115 20.6C49.1648 20.8667 48.3488 21 47.4635 21H44.7755ZM42.6315 21V9.608H45.8315V21H42.6315ZM54.9128 21V9.608H58.1128V21H54.9128ZM60.0065 21V9.608H62.2465L63.2065 12.008V21H60.0065ZM67.8465 21L61.2385 12.696L62.2465 9.608L68.8545 17.912L67.8465 21ZM67.8465 21L67.0465 18.472V9.608H70.2465V21H67.8465ZM77.7475 21.192C76.8622 21.192 76.0408 21.048 75.2835 20.76C74.5368 20.4613 73.8808 20.0453 73.3155 19.512C72.7608 18.9787 72.3288 18.3547 72.0195 17.64C71.7102 16.9253 71.5555 16.1467 71.5555 15.304C71.5555 14.4507 71.7155 13.6667 72.0355 12.952C72.3662 12.2373 72.8195 11.6187 73.3955 11.096C73.9822 10.5627 74.6595 10.152 75.4275 9.864C76.1955 9.56533 77.0168 9.416 77.8915 9.416C78.9475 9.416 79.8915 9.59733 80.7235 9.96C81.5662 10.3227 82.2488 10.8133 82.7715 11.432L80.6115 13.592C80.2168 13.1333 79.8062 12.792 79.3795 12.568C78.9528 12.344 78.4408 12.232 77.8435 12.232C77.2782 12.232 76.7662 12.36 76.3075 12.616C75.8488 12.8613 75.4808 13.2133 75.2035 13.672C74.9368 14.1307 74.8035 14.6693 74.8035 15.288C74.8035 15.9067 74.9262 16.4507 75.1715 16.92C75.4275 17.3787 75.7795 17.736 76.2275 17.992C76.6755 18.248 77.1982 18.376 77.7955 18.376C78.3715 18.376 78.8568 18.264 79.2515 18.04C79.6462 17.816 79.9448 17.496 80.1475 17.08C80.3608 16.664 80.4675 16.1733 80.4675 15.608L82.6595 17L77.3635 16.84V14.28H83.6835V14.76C83.6835 16.1253 83.4328 17.288 82.9315 18.248C82.4408 19.208 81.7475 19.9387 80.8515 20.44C79.9662 20.9413 78.9315 21.192 77.7475 21.192Z" fill="#121212"/>
</svg>
`;

const check = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.16669 10.8333L7.50002 14.1666L15.8334 5.83331" stroke-width="2.91667" stroke-linecap="square" stroke="#121212"/>
</svg>
`;

const deleteborderless = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.8958 4.16671L14.083 14.285L12.2127 15.8334H4.45394L2.58363 14.285L1.77081 4.16671M14.8958 4.16671H11.1458M14.8958 4.16671H15.8333M1.77081 4.16671H0.833313M1.77081 4.16671H5.52081M6.45831 7.50004V12.5M10.2083 7.50004V12.5M11.1458 4.16671V1.66671C11.1458 1.20647 10.7261 0.833374 10.2083 0.833374H6.45831C5.94055 0.833374 5.52081 1.20647 5.52081 1.66671V4.16671M11.1458 4.16671H5.52081" stroke-width="1.66667" stroke-linecap="square" stroke="#121212"/>
</svg>
`;

const editborderless = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.66657 2.56691H0.833313L0.833373 15.0669H13.3332V9.23358M4.99996 8.54358L12.155 1.38858L13.7758 0.934082L14.9661 2.1244L14.5116 3.74524L7.35663 10.9002H4.99996V8.54358Z" stroke-width="1.66667" stroke-linecap="square" stroke="#121212"/>
</svg>
`;

export function Clock({ size = 40 }: { size?: number }) {
  return <SvgXml xml={clock} width={size} height={size} />;
}
export function Calendar({ size = 40 }: { size?: number }) {
  return <SvgXml xml={calendar} width={size} height={size} />;
}
export function Delete({ size = 40 }: { size?: number }) {
  return <SvgXml xml={deleteIcon} width={size} height={size} />;
}
export function Edit({ size = 40 }: { size?: number }) {
  return <SvgXml xml={edit} width={size} height={size} />;
}
export function DeleteBorderless({ size = 40 }: { size?: number }) {
  return <SvgXml xml={deleteborderless} width={size} height={size} />;
}
export function EditBorderless({ size = 40 }: { size?: number }) {
  return <SvgXml xml={editborderless} width={size} height={size} />;
}
export function Back({ size = 40 }: { size?: number }) {
  return <SvgXml xml={back} width={size} height={size} />;
}
export function Checked({ size = 40 }: { size?: number }) {
  return <SvgXml xml={checked} width={size} height={size} />;
}
export function Unchecked({ size = 40 }: { size?: number }) {
  return <SvgXml xml={unchecked} width={size} height={size} />;
}
export function Check({ size = 40 }: { size?: number }) {
  return <SvgXml xml={check} width={size} height={size} />;
}
export function SubtaskDone({ size = 66 }: { size?: number }) {
  return <SvgXml xml={subtaskdone} width={size} />;
}
export function SubtaskPending({ size = 66 }: { size?: number }) {
  return <SvgXml xml={subtaskpending} width={size} />;
}
