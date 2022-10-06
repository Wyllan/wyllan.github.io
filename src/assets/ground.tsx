const SvgDesign: React.FunctionComponent = () => {
  return (
    <>
      <svg
        viewBox="0 0 904 565"
        height="565"
        width="904"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <g transform-origin="center" transform="scale(1, 1) rotate(0)">
          <rect x="0" y="0" width="904" height="565" fill="#41c1ff00"></rect>
          <linearGradient id="linear-gradient-r8">
            <stop offset="0%" stop-color="#c7b49dff" stop-opacity="100%"></stop>
            <stop
              offset="100%"
              stop-color="#41ca41ff"
              stop-opacity="100%"
            ></stop>
          </linearGradient>
          <filter id="shadow-r8" x="0" width="100%" y="-20%" height="150%">
            <feDropShadow
              dx="-27"
              dy="0"
              stdDeviation="10"
              flood-color="#00000061"
            ></feDropShadow>
          </filter>
          <path
            d="M0 0 0,503.53087575650306 C 60.266666666666666,493.1268136454718 180.8,457.2095600345386 301.3333333333333,451.51056520134676 C 421.8666666666666,445.8115703681549 482.13333333333327,465.1023678608397 602.6666666666666,475.0359015905438 C 723.1999999999999,484.9694353202479 843.7333333333333,495.94976739800256 904,501.17823384986724 L904 565 L0 565Z"
            fill="none"
            strokeLinecap="round"
            filter="url(#shadow-r8)"
            strokeWidth="1"
            style={{
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0s",
              fill: "url('#linear-gradient-r8')",
            }}
          ></path>
          <path
            d="M0 0 0,540.6864283327922 C 60.26666666666667,537.4691183923879 180.8,543.5268262621486 301.3333333333333,524.5998786307708 C 421.8666666666666,505.6729309993931 482.13333333333327,461.3114901877251 602.6666666666666,446.0516901759035 C 723.2,430.79189016408196 843.7333333333333,447.85104089251115 904,448.3008785716631 L904 565 L0 565Z"
            fill="none"
            strokeLinecap="round"
            filter="url(#shadow-r8)"
            strokeWidth="1"
            style={{
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0s",
              fill: "url('#linear-gradient-r8')",
            }}
          ></path>
        </g>
      </svg>
    </>
  );
};

export default SvgDesign;
