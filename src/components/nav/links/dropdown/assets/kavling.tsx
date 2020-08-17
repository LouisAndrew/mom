import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/tslint/config
function SvgKavlingHover(props: any) {
    return (
        <svg width={228} height={153} fill="none" {...props}>
            <g filter="url(#kavling-hover_svg__filter0_d)">
                <path
                    d="M110.205 133.966l.253.098.22-.159 100.919-72.858 11.262 3.153-112.547 80.238L5.089 104.875l10.973-7.315 94.143 36.406z"
                    stroke="#fff"
                />
            </g>
            <g filter="url(#kavling-hover_svg__filter1_d)">
                <path
                    d="M5.103 93.88l105.372-68.343 112.348 27.688-112.511 80.213L5.103 93.881z"
                    stroke="#fff"
                />
            </g>
            <g filter="url(#kavling-hover_svg__filter2_d)" stroke="#fff">
                <path
                    d="M113.318 4.2l7.327 8.4 8.29-8.4"
                    strokeMiterlimit={10}
                />
                <path d="M106.877 32.5V.5h3.628v32h-3.628z" />
                <path d="M107.456 31.3V1.1h3.049v30.2h-3.049z" />
                <path d="M105.721 6.7v-5h27.92v5h-27.92z" />
                <path d="M133.063 6.1h-26.764V2.3h26.764v3.8zM112.662 25.3V12.5h16.93v12.8h-16.93z" />
                <path d="M112.662 24.7V12.5h16.93v12.2h-16.93z" />
                <path d="M114.975 15.1v-.2H126.7v.2h-11.725zM117.289 17.5v-.2h7.676v.2h-7.676zM116.132 19.9v-.2h9.99v.2h-9.99zM114.975 22.3v-.2H126.7v.2h-11.725z" />
            </g>
            <defs>
                <filter
                    id="kavling-hover_svg__filter0_d"
                    x={0}
                    y={60.5}
                    width={228}
                    height={92.5}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy={4} />
                    <feGaussianBlur stdDeviation={2} />
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow"
                    />
                    <feBlend
                        in="SourceGraphic"
                        in2="effect1_dropShadow"
                        result="shape"
                    />
                </filter>
                <filter
                    id="kavling-hover_svg__filter1_d"
                    x={0}
                    y={25}
                    width={228}
                    height={117}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy={4} />
                    <feGaussianBlur stdDeviation={2} />
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow"
                    />
                    <feBlend
                        in="SourceGraphic"
                        in2="effect1_dropShadow"
                        result="shape"
                    />
                </filter>
                <filter
                    id="kavling-hover_svg__filter2_d"
                    x={101.221}
                    y={0}
                    width={36.92}
                    height={41}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy={4} />
                    <feGaussianBlur stdDeviation={2} />
                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow"
                    />
                    <feBlend
                        in="SourceGraphic"
                        in2="effect1_dropShadow"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
}

export default SvgKavlingHover;
