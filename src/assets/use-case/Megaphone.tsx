interface MegaphoneProps {
  className?: string;
}

export default function Megaphone({ className }: MegaphoneProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.1947 3.30827L6.20514 5.70339C5.82113 5.88772 5.41082 5.9339 4.99256 5.8402C4.71883 5.77888 4.58194 5.74822 4.47172 5.73563C3.10307 5.57934 2.25 6.66256 2.25 7.90822V8.59177C2.25 9.83745 3.10307 10.9207 4.47172 10.7644C4.58194 10.7518 4.71884 10.7211 4.99256 10.6598C5.41082 10.5661 5.82113 10.6123 6.20514 10.7966L11.1947 13.1917C12.34 13.7416 12.9127 14.0164 13.5513 13.8022C14.1898 13.5879 14.4089 13.1281 14.8473 12.2085C16.0509 9.6834 16.0509 6.81664 14.8473 4.29147C14.4089 3.37189 14.1898 2.91211 13.5513 2.69782C12.9127 2.48355 12.34 2.75845 11.1947 3.30827Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 12.75V13.125C9.75 14.0881 9.75 14.5696 9.582 14.8415C9.35797 15.2039 8.9484 15.4088 8.52398 15.3704C8.20568 15.3418 7.82047 15.0528 7.05 14.475L6.15 13.8C5.4169 13.2502 5.25 12.9163 5.25 12V10.875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.625 10.5V6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
