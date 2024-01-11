import { GOOGLE_ANALYTICS_ID } from '../../../config/env';
import assets from '../../../public/assets/manifest.json';

const createFontAweScript = () => `<script src="https://kit.fontawesome.com/23b277731a.js"></script>`;
const createAppScript = () => `<script async type="text/javascript" charset="utf-8" src="/assets/${assets['app.js']}"></script>`;
const createVendorScript = () => `<script async type="text/javascript" charset="utf-8" src="/assets/${assets['vendor.js']}"></script>`;

const createTrackingScript = () => (GOOGLE_ANALYTICS_ID ? createAnalyticsSnippet(GOOGLE_ANALYTICS_ID) : '');

const createAnalyticsSnippet = (id) => `<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '${id}', 'auto');
ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>`;

const createStylesheets = () => `
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap" />
<link rel="stylesheet" href="/assets/${assets['app.css']}" />
`;



{/* <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins&display=swap" /> */ }



export {
    createAppScript, createVendorScript, createTrackingScript, createStylesheets, createFontAweScript
};
