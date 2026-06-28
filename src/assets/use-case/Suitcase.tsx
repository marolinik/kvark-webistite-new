interface SuitcaseProps {
  className?: string;
}

export default function Suitcase({ className }: SuitcaseProps) {
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
        d="M6.375 4.875C6.375 3.82166 6.375 3.29498 6.62779 2.91664C6.73723 2.75286 6.87786 2.61223 7.04164 2.50279C7.41998 2.25 7.94662 2.25 9 2.25C10.0534 2.25 10.58 2.25 10.9583 2.50279C11.1221 2.61223 11.2627 2.75286 11.3722 2.91664C11.625 3.29498 11.625 3.82166 11.625 4.875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 10.5V10.125C16.5 7.65015 16.5 6.41269 15.7312 5.64385C14.9623 4.875 13.7248 4.875 11.25 4.875H6.75C4.27513 4.875 3.03769 4.875 2.26885 5.64385C1.5 6.41269 1.5 7.65015 1.5 10.125V10.5C1.5 12.9748 1.5 14.2123 2.26885 14.9812C3.03769 15.75 4.27513 15.75 6.75 15.75H11.25C13.7248 15.75 14.9623 15.75 15.7312 14.9812C16.5 14.2123 16.5 12.9748 16.5 10.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.125 10.5C14.6801 10.1321 16.3125 7.5 16.3125 7.5M1.6875 7.5C1.6875 7.5 3.31991 10.1321 7.875 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.875 10.5V9.75C7.875 9.54292 8.04292 9.375 8.25 9.375H9.75C9.95708 9.375 10.125 9.54292 10.125 9.75V10.5C10.125 11.1213 9.6213 11.625 9 11.625C8.3787 11.625 7.875 11.1213 7.875 10.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
