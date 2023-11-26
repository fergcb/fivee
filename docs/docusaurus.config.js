// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Fivee',
  tagline: 'A D&D 5e API',
  favicon: '/docs/img/favicon.svg',
  url: 'https://fivee.co',
  baseUrl: '/docs/',
  organizationName: 'fergcb',
  projectName: 'fivee',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        blog: false,
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/fergcb/fivee/tree/main/docs',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/fivee-social-card.jpg',
      colorMode: {
        defaultMode: 'dark'
      },
      navbar: {
        logo: {
          alt: 'Fivee Logo',
          src: '/docs/img/fivee-logo.svg',
          srcDark: '/docs/img/fivee-logo-dark.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'graphqlSidebar',
            position: 'left',
            label: 'GraphQL',
          },
          {
            type: 'docSidebar',
            sidebarId: 'snippetsSidebar',
            position: 'left',
            label: 'Snippets',
          },
          {
            href: 'https://github.com/fergcb/fivee',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'GraphQL',
                to: '/docs/graphql',
              },
              {
                label: 'Snippets',
                to: '/docs/snippets',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/cVkQhm9QFm',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/fergcb/fivee',
              },
            ],
          },
        ],
      },
      prism: {
        theme: prismThemes.vsLight,
        darkTheme: prismThemes.vsDark,
      },
    }),
};

export default config;
