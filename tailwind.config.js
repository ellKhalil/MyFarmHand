import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            animation: {
                'marquee': 'marquee 25s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'cursor': 'cursorMove 8s ease-in-out infinite alternate',
                'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                cursorMove: {
                    '0%': { transform: 'translate(0, 0)' },
                    '25%': { transform: 'translate(30px, 40px)' },
                    '50%': { transform: 'translate(60px, -10px)' },
                    '75%': { transform: 'translate(-20px, -30px)' },
                    '100%': { transform: 'translate(0, 0)' },
                }
            }
        },
    },

    plugins: [forms],
};
