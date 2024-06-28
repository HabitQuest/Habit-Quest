const StarSVG = ({ top, right, left, bottom }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      className={`absolute ${top} ${right} ${left} ${bottom}`}
    >
      <path
        d="M17 0L21.5915 12.4085L34 17L21.5915 21.5915L17 34L12.4085 21.5915L0 17L12.4085 12.4085L17 0Z"
        fill="url(#paint0_linear_18_261)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_18_261"
          x1="17"
          y1="0"
          x2="17"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#999999" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default StarSVG;
