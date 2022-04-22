import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    colors:{
        gray: {
            "50": '#E1E1E6',
            "500": '#C4C4C4',
            "700": '#767676',
            "800": '#202024',
            "900" : '#121214',
        },
        green: {
            "100": '#21E329',
            "800": '#00646A',
            "900": '#00585d',
        },

        orange: {
            "200": '#d48d37',
            "250": '#b68940',
            "900": '#FF6400',

        }, 
    },
    fonts: {
        heading: 'Montserrat',
        body: 'Roboto'
    },


    styles: {
        global:{
            body:{
                bg: 'gray.900',
                color:'gray.50'
            }
        }
    }
})

