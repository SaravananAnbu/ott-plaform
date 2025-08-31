/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom styles for UI components
      components: {
        // Button styles
        '.btn': {
          '@apply px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2': {},
        },
        '.btn-primary': {
          '@apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500': {},
        },
        '.btn-secondary': {
          '@apply bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500': {},
        },
        // Heading styles
        '.h1': {
          '@apply text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl': {},
        },
        '.h2': {
          '@apply text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl': {},
        },
        '.h3': {
          '@apply text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl': {},
        },
        '.h4': {
          '@apply text-xl font-bold tracking-tight text-gray-900 sm:text-2xl': {},
        },
        '.h5': {
          '@apply text-lg font-bold tracking-tight text-gray-900 sm:text-xl': {},
        },
        '.h6': {
          '@apply text-base font-bold tracking-tight text-gray-900 sm:text-lg': {},
        },
      }
    },
  },
  plugins: [
    // Plugin to register component styles
    function({ addComponents, theme }) {
      addComponents({
        // Button styles
        '.btn': {
          padding: theme('spacing.2') + ' ' + theme('spacing.4'),
          borderRadius: theme('borderRadius.lg'),
          fontWeight: theme('fontWeight.medium'),
          transitionProperty: theme('transitionProperty.colors'),
          transitionDuration: theme('transitionDuration.200'),
          '&:focus': {
            outline: 'none',
            boxShadow: theme('ringWidth.2') + ' ' + theme('ringOffsetWidth.2') + ' ' + theme('colors.blue.500'),
          }
        },
        '.btn-primary': {
          backgroundColor: theme('colors.blue.600'),
          color: theme('colors.white'),
          '&:hover': {
            backgroundColor: theme('colors.blue.700'),
          }
        },
        '.btn-secondary': {
          backgroundColor: theme('colors.gray.200'),
          color: theme('colors.gray.900'),
          '&:hover': {
            backgroundColor: theme('colors.gray.300'),
          }
        },
        // Heading styles
        '.h1': {
          fontSize: theme('fontSize.4xl'),
          fontWeight: theme('fontWeight.bold'),
          letterSpacing: theme('letterSpacing.tight'),
          color: theme('colors.gray.900'),
          '@media (min-width: 640px)': {
            fontSize: theme('fontSize.5xl'),
          }
        },
        '.h2': {
          fontSize: theme('fontSize.3xl'),
          fontWeight: theme('fontWeight.bold'),
          letterSpacing: theme('letterSpacing.tight'),
          color: theme('colors.gray.900'),
          '@media (min-width: 640px)': {
            fontSize: theme('fontSize.4xl'),
          }
        },
        '.h3': {
          fontSize: theme('fontSize.2xl'),
          fontWeight: theme('fontWeight.bold'),
          letterSpacing: theme('letterSpacing.tight'),
          color: theme('colors.gray.900'),
          '@media (min-width: 640px)': {
            fontSize: theme('fontSize.3xl'),
          }
        },
        '.h4': {
          fontSize: theme('fontSize.xl'),
          fontWeight: theme('fontWeight.bold'),
          letterSpacing: theme('letterSpacing.tight'),
          color: theme('colors.gray.900'),
          '@media (min-width: 640px)': {
            fontSize: theme('fontSize.2xl'),
          }
        },
        '.h5': {
          fontSize: theme('fontSize.lg'),
          fontWeight: theme('fontWeight.bold'),
          letterSpacing: theme('letterSpacing.tight'),
          color: theme('colors.gray.900'),
          '@media (min-width: 640px)': {
            fontSize: theme('fontSize.xl'),
          }
        },
        '.h6': {
          fontSize: theme('fontSize.base'),
          fontWeight: theme('fontWeight.bold'),
          letterSpacing: theme('letterSpacing.tight'),
          color: theme('colors.gray.900'),
          '@media (min-width: 640px)': {
            fontSize: theme('fontSize.lg'),
          }
        },
      })
    }
  ],
}

