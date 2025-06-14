import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png';
import PropTypes from 'prop-types';

const routes = [
    { title: 'Home', icon: 'fas-solid fa-house', path: '/' },
    { title: 'Sales', icon: 'chart-line', path: '/sales' },
    { title: 'Costs', icon: 'chart-column', path: '/costs' },
    { title: 'Payments', icon: 'wallet', path: '/payments' },
    { title: 'Finances', icon: 'chart-pie', path: '/finances' },
    { title: 'Messages', icon: 'envelope', path: '/messages' },
];

const bottomRoutes = [
    { title: 'Settings', icon: 'sliders', path: '/settings' },
    { title: 'Support', icon: 'phone-volume', path: '/support' },
];

const themeStyles = {
    light: {
        background: 'var(--color-sidebar-background-light-default)',
        hoverBg: 'var(--color-sidebar-background-light-hover)',
        activeBg: 'var(--color-sidebar-background-light-active)',
        text: 'var(--color-text-light-default)',
        hoverText: 'var(--color-text-light-hover)',
        activeText: 'var(--color-text-light-active)',
        logoText: 'var(--color-text-logo-light-default)',
        button: 'var(--color-button-background-light-default)',
        activeBtn: 'var(--color-button-background-light-active)',
    },
    dark: {
        background: 'var(--color-sidebar-background-dark-default)',
        hoverBg: 'var(--color-sidebar-background-dark-hover)',
        activeBg: 'var(--color-sidebar-background-dark-active)',
        text: 'var(--color-text-dark-default)',
        hoverText: 'var(--color-text-dark-hover)',
        activeText: 'var(--color-text-dark-active)',
        logoText: 'var(--color-text-logo-dark-default)',
        button: 'var(--color-button-background-dark-default)',
        activeBtn: 'var(--color-button-background-dark-active)',
    }
};

const SidebarWrapper = styled.div`
    position: relative;
    display: flex;
`;

const SidebarContainer = styled.div`
    width: ${({ $isOpened }) => ($isOpened ? '240px' : '72px')};
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    height: 100vh;
    box-sizing: border-box;
    border-radius: 16px;
    transition: width .4s ease-in-out;
    span {
        opacity: ${({ $isOpened }) => ($isOpened ? 1 : 0)};
        transition: opacity 0.4s ease-in-out;
    }
`;

const ToggleButton = styled.div`
    position: absolute;
    top: 54px;
    left: ${({ $isOpened }) => ($isOpened ? '224px' : '82px')};
    background: ${({ $isOpened, theme }) => ($isOpened ? theme.hoverBg : theme.background)};
    transition: left .4s ease-in-out, background .4s ease-in-out;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1;
    color: ${({ theme }) => theme.text};
    .icon {
        width: 14px;
        height: 14px;
        transition: transform .4s ease-in-out;
        transform: rotate(${({ $isOpened }) => ($isOpened ? '180deg' : '0deg')});
    }
`;

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
    padding: 30px 0;
    img {
        width: 32px;
        height: 32px;
    }
    span {
        color: ${({ theme }) => theme.logoText};
        font-weight: bold;
    }
`;

const NavSection = styled.div`
    display: flex;
    gap: 5px;
    flex-direction: column;
`;

const TopSection = styled.div`
    display: flex;
    flex-direction: column;
`;

const NavItem = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover {
        background-color: ${({ theme }) => theme.hoverBg};
        color: ${({ theme }) => theme.hoverText};
    }
    .route-icon {
        width: 16px;
    }
`;

const Sidebar = ({ color = 'light' }) => {
    const [isOpened, setIsOpened] = useState(false);
    const theme = themeStyles[color] || themeStyles.light;

    const goToRoute = (path) => {
        console.log(`going to "${path}"`);
    };

    return (
        <SidebarWrapper>
            <SidebarContainer theme={theme} $isOpened={isOpened}>
                <TopSection>
                    <LogoWrapper theme={ theme }>
                        <img src={ logo } alt="TensorFlow logo"/>
                        <span>TensorFlow</span>
                    </LogoWrapper>
                    <NavSection>
                        {routes.map(route => (
                            <NavItem
                                key={route.title}
                                onClick={() => goToRoute(route.path)}
                                theme={theme}
                            >
                                <FontAwesomeIcon icon={route.icon} className='route-icon'/>
                                <span>{route.title}</span>
                            </NavItem>
                        ))}
                    </NavSection>
                </TopSection>
                <NavSection>
                    {bottomRoutes.map((route) => (
                        <NavItem
                            key={route.title}
                            onClick={() => goToRoute(route.path)}
                            theme={theme}
                        >
                            <FontAwesomeIcon icon={route.icon} className="route-icon"/>
                            <span>{route.title}</span>
                        </NavItem>
                    ))}
                </NavSection>
            </SidebarContainer>
            <ToggleButton $isOpened={isOpened} theme={theme} onClick={() => setIsOpened((v) => !v)}>
                <FontAwesomeIcon icon='angle-right' className="icon"/>
            </ToggleButton>
        </SidebarWrapper>
    );
};

Sidebar.propTypes = {
    color: PropTypes.oneOf(['light', 'dark']),
};

export default Sidebar;
