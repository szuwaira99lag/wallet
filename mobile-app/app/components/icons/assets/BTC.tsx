import Svg, { Path, SvgProps } from "react-native-svg";

export function BTC(props: SvgProps): JSX.Element {
  return (
    <Svg height={32} width={32} viewBox="0 0 32 32" {...props}>
      <Path
        d="M31.521 19.87c-2.137 8.572-10.82 13.788-19.393 11.651C3.558 29.384-1.659 20.702.479 12.131 2.616 3.56 11.298-1.659 19.87.48c8.573 2.137 13.79 10.82 11.652 19.392z"
        fill="#F7931A"
      />

      <Path
        d="M22.96 14.04c.313-2.101-1.276-3.23-3.448-3.985l.705-2.846-1.72-.432-.686 2.772a67.899 67.899 0 00-1.379-.327l.691-2.79L15.404 6l-.705 2.846a57.2 57.2 0 01-1.099-.26l.002-.01-2.372-.596-.458 1.85s1.277.296 1.25.314c.696.175.822.64.801 1.008l-.802 3.243c.048.012.11.03.179.057l-.182-.045-1.125 4.543c-.085.213-.302.533-.789.412.018.025-1.25-.315-1.25-.315L8 21.031l2.239.562c.416.105.824.215 1.226.319l-.712 2.88 1.718.431.706-2.849c.469.129.925.247 1.37.359l-.702 2.835 1.72.432.712-2.874c2.934.56 5.14.334 6.068-2.339.748-2.152-.037-3.393-1.58-4.202 1.123-.261 1.97-1.006 2.196-2.545zm-4.012 5.8c-.497 1.961-3.858.901-4.948.635L14.883 17c1.09.267 4.584.796 4.065 2.84zm.991-6.05c-.538 1.993-3.861.98-4.939.732L15.95 11c1.079.248 4.55.712 3.99 2.79z"
        fill="#FFF"
      />
    </Svg>
  );
}
