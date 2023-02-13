const withOpacity = (variableName) => {
    return ({ opacityValue }) => {
        if (opacityValue)
            return `rgba(var(--${variableName}), ${opacityValue})`;
        return `rgba(var(--${variableName}))`;
    };
};
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        screens: {
            '0xs': '1px',
            xxs: '319px',
            '2xxs': '360px',
            xs: '450px',
            '2xs': '555px',
            '2md': '888px',
            '2lg': '1124px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        extend: {
            fontSize: {
                xxs: 'var(--text-size-base)', //10px
            },
            textColor: {
                darker: {
                    msgText: withOpacity('color-darker-msg-text'),
                    msgTime: withOpacity('color-darker-msg-time-text'),
                    msgNumber: withOpacity('color-darker-msg-number-text'),
                    userName: withOpacity('color-darker-msg-user-name-text'),
                    userInput: withOpacity('color-darker-user-input'),
                    alert: withOpacity('color-darker-alert-text'),
                },
            },
            backgroundColor: {
                darker: {
                    msgUser: withOpacity('color-darker-msg-user-bg'),
                    solid: withOpacity('color-darker-solid-bg'),
                    chat: withOpacity('color-darker-chat-bg'),
                    list: withOpacity('color-darker-list-bg'),
                    selected: withOpacity('color-darker-selected-bg'),
                    detail: withOpacity('color-darker-detail-bg'),
                    detail_hover: withOpacity('color-darker-detail-hover-bg'),
                },

                default: {
                    //msgUser: withOpacity('color-default-msg-user-bg'),
                    //solid: withOpacity('color-default-solid-bg'),
                    //chat: withOpacity('color-default-chat-bg'),
                    //list: withOpacity('color-default-list-bg'),
                    //selected: withOpacity('color-default-selected-bg'),
                    detail: withOpacity('color-default-detail-bg'),
                    detail_hover: withOpacity('color-default-detail-hover-bg'),
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(#E0E1E2, #ffffff)',
            },
            colors: {
                darker: {
                    detail: withOpacity('color-darker-detail-bg'),
                },

                default: {
                    detail: withOpacity('color-default-detail-bg'),
                },
            },
            fill: {
                darker: {
                    msgUser: withOpacity('color-darker-msg-user-bg'),
                    solid: withOpacity('color-darker-solid-bg'),
                    chat: withOpacity('color-darker-chat-bg'),
                    list: withOpacity('color-darker-list-bg'),
                    selectedList: withOpacity('color-darker-list-selected-bg'),
                },
            },
        },
    },
    plugins: [],
};
