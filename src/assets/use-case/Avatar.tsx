interface AvatarProps {
  className?: string;
}

export default function Avatar({ className }: AvatarProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_9362_2089)">
        <path
          d="M11.625 7.875C11.625 6.42525 10.4497 5.25 9 5.25C7.55025 5.25 6.375 6.42525 6.375 7.875C6.375 9.32475 7.55025 10.5 9 10.5C10.4497 10.5 11.625 9.32475 11.625 7.875Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5C13.1421 16.5 16.5 13.1421 16.5 9Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.5 15C13.5 12.5147 11.4853 10.5 9 10.5C6.51472 10.5 4.5 12.5147 4.5 15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_9362_2089">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
