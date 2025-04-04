function changeBackground(theme) {
    localStorage.setItem("themeColor", theme)
    if (theme === 'light') {
        document.documentElement.style.setProperty('--background-nav', 'white');
        document.documentElement.style.setProperty('--background-body', '#F0EEF6');
        document.documentElement.style.setProperty('--menu-item-hover', 'rgb(233, 227, 227)');
        document.documentElement.style.setProperty('--main-text', 'black');
        document.documentElement.style.setProperty('--chat-btn', 'rgb(196, 195, 195)');
    } else if (theme === 'dark') {
        document.documentElement.style.setProperty('--background-nav', '#2A2442');
        document.documentElement.style.setProperty('--background-body', '#1F1B32');
        document.documentElement.style.setProperty('--menu-item-hover', '#1F1B32');
        document.documentElement.style.setProperty('--main-text', '#FFFFFF');
        document.documentElement.style.setProperty('--chat-btn', '#000000');
        // document.documentElement.style.setProperty('--hover-btn-color', '#1F1B32');
    } else if (theme === 'black') {
        document.documentElement.style.setProperty('--background-nav', '#110E1B');
        document.documentElement.style.setProperty('--background-body', '#000000');
        document.documentElement.style.setProperty('--menu-item-hover', '#1F1B32');
        document.documentElement.style.setProperty('--main-text', '#FFFFFF');
        document.documentElement.style.setProperty('--chat-btn', '#000000');
    }
}

// theme change settings
function changeColor(color, hovercolor) {
    document.documentElement.style.setProperty('--btn-color', color);
    document.documentElement.style.setProperty('--hover-btn-color', hovercolor);
}