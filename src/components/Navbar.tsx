import React, {FC, useCallback, useEffect, useState} from 'react';
import {AppProvider, Icon, Frame, TopBar} from '@shopify/polaris';
import {ArrowLeftMinor, StarFilledMinor} from '@shopify/polaris-icons';
import "@shopify/polaris/dist/styles.css";

const Navbar: FC = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);
    useEffect(() => {

    }, [localStorage.getItem('city')])
console.log("@@@local", localStorage.getItem('city'));
    const toggleIsUserMenuOpen = useCallback(
        () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
        [],
    );

    const toggleIsSecondaryMenuOpen = useCallback(
        () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
        [],
    );

    const handleNavigationToggle = useCallback(() => {
        console.log('toggle navigation visibility');
    }, []);

    const theme = {
        logo: {
            width: 124,
            topBarSource:
                'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
            url: 'http://jadedpixel.com',
            accessibilityLabel: 'Jaded Pixel',
        },
    };

    const userMenuMarkup = (
        <TopBar.UserMenu
            actions={[
                {
                    items: [{content: 'Back to Shopify', icon: ArrowLeftMinor}],
                },
                {
                    items: [{content: 'Community forums'}],
                },
            ]}
            name="Dharma"
            detail="Jaded Pixel"
            initials="D"
            open={isUserMenuOpen}
            onToggle={toggleIsUserMenuOpen}
        />
    );

    const secondaryMenuMarkup = (
        <TopBar.Menu
            activatorContent={
                <span>
          <Icon source={StarFilledMinor} color="base"/>
        </span>
            }
            open={isSecondaryMenuOpen}
            onOpen={toggleIsSecondaryMenuOpen}
            onClose={toggleIsSecondaryMenuOpen}
            actions={[
                {
                    items: [{content: localStorage.getItem('city')!}],
                },
            ]}
        />
    );

    const topBarMarkup = (
        <TopBar
            showNavigationToggle
            userMenu={userMenuMarkup}
            secondaryMenu={secondaryMenuMarkup}
            onNavigationToggle={handleNavigationToggle}
        />
    );

    return (
        <div style={{height: '250px'}}>
            <AppProvider
                theme={theme}
                i18n={{
                    Polaris: {
                        Avatar: {
                            label: 'Avatar',
                            labelWithInitials: 'Avatar with initials {initials}',
                        },
                        Frame: {skipToContent: 'Skip to content'},
                        TopBar: {
                            toggleMenuLabel: 'Toggle menu',
                            SearchField: {
                                clearButtonLabel: 'Clear',
                                search: 'Search',
                            },
                        },
                    },
                }}
            >
                <Frame topBar={topBarMarkup} />
            </AppProvider>
        </div>
    );
};

export default Navbar;