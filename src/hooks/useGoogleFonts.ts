/* eslint-disable immutable/no-mutation, @typescript-eslint/tslint/config  */
import { useEffect } from 'react';

const useGoogleFonts = () => {
    const createLink = (): HTMLLinkElement => {
        const link: HTMLLinkElement = document.createElement('link');

        link.href =
            'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Raleway:wght@400;700&display=swap';
        link.rel = 'stylesheet';

        return link;
    };

    useEffect(() => {
        const link: HTMLLinkElement = createLink();
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);
};

export default useGoogleFonts;
