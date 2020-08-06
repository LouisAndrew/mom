import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/tslint/config
function SvgKavling(props: any) {
    return (
        <svg width={220} height={145} fill="none" {...props}>
            <path
                d="M106.385 36L220 64l-113.615 81L0 105l106.385-69z"
                fill="#2EC4B6"
            />
            <path
                d="M106.385 25L220 53l-113.615 81L0 94l106.385-69z"
                fill="#fff"
            />
            <path
                d="M109.318 4.2l7.327 8.4 8.29-8.4"
                stroke="#37474F"
                strokeMiterlimit={10}
            />
            <path
                d="M107.005 0h-4.628v33h4.628V0z"
                fill="url(#kavling_svg__paint0_linear)"
            />
            <path d="M107.005.6h-4.049v31.2h4.049V.6z" fill="#F5F5F5" />
            <path
                d="M130.141 1.2h-28.92v6h28.92v-6z"
                fill="url(#kavling_svg__paint1_linear)"
            />
            <path d="M101.799 1.8v4.8h27.764V1.8h-27.764z" fill="#F5F5F5" />
            <path
                d="M126.092 12h-17.93v13.8h17.93V12z"
                fill="url(#kavling_svg__paint2_linear)"
            />
            <path d="M126.092 12h-17.93v13.2h17.93V12z" fill="#2EC4B6" />
            <path
                d="M123.2 14.4h-12.725v1.2H123.2v-1.2zM121.465 16.8h-8.676V18h8.676v-1.2zM122.622 19.2h-10.99v1.2h10.99v-1.2zM123.2 21.6h-12.725v1.2H123.2v-1.2z"
                fill="#fff"
            />
            <defs>
                <linearGradient
                    id="kavling_svg__paint0_linear"
                    x1={311.621}
                    y1={24690.6}
                    x2={311.621}
                    y2={15450.6}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="gray" stopOpacity={0.25} />
                    <stop offset={0.54} stopColor="gray" stopOpacity={0.12} />
                    <stop offset={1} stopColor="gray" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient
                    id="kavling_svg__paint1_linear"
                    x1={4352.49}
                    y1={3173.04}
                    x2={4352.49}
                    y2={2879.76}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="gray" stopOpacity={0.25} />
                    <stop offset={0.54} stopColor="gray" stopOpacity={0.12} />
                    <stop offset={1} stopColor="gray" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient
                    id="kavling_svg__paint2_linear"
                    x1={1468.91}
                    y1={8675.09}
                    x2={4544.89}
                    y2={8675.09}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="gray" stopOpacity={0.25} />
                    <stop offset={0.54} stopColor="gray" stopOpacity={0.12} />
                    <stop offset={1} stopColor="gray" stopOpacity={0.1} />
                </linearGradient>
            </defs>
        </svg>
    );
}

export default SvgKavling;
