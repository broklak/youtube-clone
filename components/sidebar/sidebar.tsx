import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/core';
import Logo from '@components/logo';
import useIsomorphicLayoutEffect from '@utils/useIsoMorphicLayoutEffect';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { BiStation } from 'react-icons/bi';
import { FaFire, FaYoutube } from 'react-icons/fa';
import {
  MdAddCircle,
  MdAnnouncement,
  MdFlag,
  MdHelp,
  MdHistory,
  MdHome,
  MdMenu,
  MdSettings,
  MdSubscriptions,
  MdVideoLibrary,
} from 'react-icons/md';

const Scrollbars = dynamic(() => import('react-custom-scrollbars'), {
  ssr: false,
});

interface ISidebar {
  minimized: boolean;
  onMinimized: (value: boolean) => void;
  isOnDrawer?: boolean;
}

type TMENUS = {
  menus: {
    label: string;
    link: string;
    icon?: IconType;
    iconImage?: string;
    active?: boolean;
  }[];
  title?: string;
}[];

const MENUS: TMENUS = [
  {
    menus: [
      {
        label: 'Home',
        icon: MdHome,
        link: '/',
        active: true,
      },
      {
        label: 'Trending',
        icon: FaFire,
        link: '#',
      },
      {
        label: 'Subscription',
        icon: MdSubscriptions,
        link: '#',
      },
    ],
  },
  {
    menus: [
      {
        label: 'Library',
        icon: MdVideoLibrary,
        link: '#',
      },
      {
        label: 'History',
        icon: MdHistory,
        link: '#',
      },
    ],
  },
  {
    title: 'Best of youtube',
    menus: [
      {
        label: 'Music',
        iconImage:
          '//yt3.ggpht.com/X2lg7AJrz6BRu8Lq5S-Ke5XrXIT_le5TlBcS10ik-YO5njQJGRPc4fTlefugAi5ha_3FieqcXQ=s88-c-k-c0xffffffff-no-nd-rj',
        link: '#',
      },
      {
        label: 'Sports',
        iconImage:
          '//yt3.ggpht.com/7pEnMBenda_jk32LIvQLyHKseE-G1UtUx0eXUr3sjV6KcRC5H_FSRZxT2votEuqwkjrSHHpF=s88-c-k-c0xffffffff-no-nd-rj',
        link: '#',
      },
      {
        label: 'Gaming',
        iconImage:
          '//yt3.ggpht.com/je7LbnIyJTQLS27L6HAE26dvIc98IeyuJZv-xyQz2qpu4xaepg8IyhmC51cHH4s3FmIOaFTP=s88-c-k-c0xffffffff-no-nd-rj',
        link: '#',
      },
      {
        label: 'News',
        iconImage:
          '//yt3.ggpht.com/RMsRDfy7X7f7Wo3aZEofaZXAqMiyIi8UUZe188kwJ9DJTg8aEWDrqlVW8ktFyKhy9kUmgIR90So=s88-c-k-c0xffffffff-no-nd-rj',
        link: '#',
      },
      {
        label: 'Live',
        iconImage:
          '//yt3.ggpht.com/8D6JlsnvwDZFMdcbjqVji82kggP3aXXbO-yBD0RFrKlp4G1zNt9wcqcVTSPnAI8GuUAbDYQwsg=s88-c-k-c0xffffffff-no-nd-rj',
        link: '#',
      },
      {
        label: '360° Video',
        iconImage:
          '//yt3.ggpht.com/fmOS9pbEO9CB6wbhvRsKFKv4h2z7_O3fFm9hgI14FHtxQa2WHlPPKQMPraiVA608d2jvJFyMrg=s88-c-k-c0xffffffff-no-nd-rj',
        link: '#',
      },
    ],
  },
  {
    menus: [
      {
        label: 'Browse channels',
        icon: MdAddCircle,
        link: '#',
      },
    ],
  },
  {
    title: 'More from youtube',
    menus: [
      {
        label: 'YouTube Premium',
        icon: FaYoutube,
        link: '#',
      },
      {
        label: 'Live',
        icon: BiStation,
        link: '#',
      },
    ],
  },
  {
    menus: [
      {
        label: 'Settings',
        icon: MdSettings,
        link: '#',
      },
      {
        label: 'Report history',
        icon: MdFlag,
        link: '#',
      },
      {
        label: 'Help',
        icon: MdHelp,
        link: '#',
      },
      {
        label: 'Send feedback',
        icon: MdAnnouncement,
        link: '#',
      },
    ],
  },
];

interface IInlineMenu {
  link: string;
}

const InlineMenu: React.FC<IInlineMenu> = ({ link, children }) => {
  return (
    <Link href={link}>
      <Box
        as="a"
        fontSize="sm"
        fontWeight="medium"
        mr={1}
        color="gray.600"
        cursor="pointer"
        d="inline-block"
      >
        {children}
      </Box>
    </Link>
  );
};

const ResponsiveMenus: React.FC = () => {
  const menus = [...MENUS[0].menus, ...MENUS[1].menus].map((menu, index) => (
    <Box
      textAlign="center"
      key={index}
      color={menu.active ? 'youtube' : 'gray.600'}
      py={2}
    >
      <Link href={menu.link}>
        <a>
          <Box as={menu.icon} size="22px" margin="auto" />
          <Text fontSize="10px" mt={1}>
            {menu.label}
          </Text>
        </a>
      </Link>
    </Box>
  ));

  return (
    <Stack spacing={4} py={4}>
      {menus}
    </Stack>
  );
};

const Sidebar: React.FC<ISidebar> = ({
  minimized,
  onMinimized,
  isOnDrawer,
}) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useIsomorphicLayoutEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMinimized = () => {
    onMinimized(!minimized);
  };

  const renderMenus = MENUS.map((groupMenu) => {
    const groupMenuLen = groupMenu.menus.length;
    return groupMenu.menus.map((menu, index) => (
      <>
        {groupMenu.title && index === 0 ? (
          <Text
            textTransform="uppercase"
            color="gray.600"
            px={6}
            py={2}
            fontSize="sm"
            fontWeight="medium"
          >
            {groupMenu.title}
          </Text>
        ) : null}
        <Box key={index}>
          <Link href={menu.link}>
            <Flex
              as="a"
              align="center"
              px={6}
              py={2}
              bg={menu.active ? 'gray.200' : 'transparent'}
              cursor="pointer"
            >
              {menu.icon ? (
                <Box
                  as={menu.icon}
                  size="22px"
                  mr={5}
                  color={menu.active ? 'youtube' : 'gray.600'}
                />
              ) : null}
              {menu.iconImage ? (
                <Box w="24px" h="24px" rounded="full" overflow="hidden" mr={5}>
                  <img src={menu.iconImage} alt={menu.label} width="100%" />
                </Box>
              ) : null}
              <Text
                fontSize="sm"
                fontWeight={menu.active ? 'medium' : 'normal'}
              >
                {menu.label}
              </Text>
            </Flex>
          </Link>
        </Box>
        {groupMenuLen === index + 1 && <Divider />}
      </>
    ));
  });

  const renderSidebar = () => {
    if (!isOnDrawer && minimized && windowWidth >= 767) {
      return (
        <Box
          pos="fixed"
          top="56px"
          h="calc(100vh - 56px)"
          w="70px"
          zIndex={2}
          bg="#fff"
          data-testid="sidebar-minimized"
        >
          <Scrollbars autoHide>
            <ResponsiveMenus />
          </Scrollbars>
        </Box>
      );
    }

    return (
      <Box
        pos="fixed"
        top="56px"
        h="calc(100vh - 56px)"
        w={{ base: '100%', sm: '100%', md: '240px' }}
        zIndex={2}
        bg="#fff"
        data-testid="sidebar"
      >
        <Scrollbars autoHide>
          <Stack spacing={1} py={4}>
            {renderMenus}

            <Box px={6} py={2}>
              <InlineMenu link="#">About</InlineMenu>
              <InlineMenu link="#">Press</InlineMenu>
              <InlineMenu link="#">Copyright</InlineMenu>
              <InlineMenu link="#">Contact us</InlineMenu>
              <InlineMenu link="#">Creators</InlineMenu>
              <InlineMenu link="#">Advertise</InlineMenu>
              <InlineMenu link="#">Developers</InlineMenu>
            </Box>

            <Box px={6} py={2}>
              <InlineMenu link="#">Terms</InlineMenu>
              <InlineMenu link="#">Privacy</InlineMenu>
              <InlineMenu link="#">Policy & Safety</InlineMenu>
              <InlineMenu link="#">How YouTube works</InlineMenu>
              <InlineMenu link="#">Test new features</InlineMenu>
            </Box>

            <Box px={6} pt={2} pb={1} color="gray.500" fontSize="xs">
              © 2020 Google LLC
            </Box>
          </Stack>
        </Scrollbars>
      </Box>
    );
  };

  if (isOnDrawer || windowWidth < 767) {
    return (
      <Drawer placement="left" isOpen={minimized} onClose={handleMinimized}>
        <DrawerOverlay zIndex={2} />
        <DrawerContent maxW="240px" zIndex={2}>
          <DrawerHeader borderBottomWidth="1px">
            <Stack spacing={2} align="center" isInline>
              <IconButton
                aria-label="Upload video"
                h={8}
                fontSize="xl"
                color="gray.600"
                bg="transparent"
                icon={<MdMenu />}
                onClick={handleMinimized}
                data-testid="sidebar-minimized-toggle"
              />
              <Logo />
            </Stack>
          </DrawerHeader>
          <DrawerBody p={0}>{renderSidebar()}</DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }

  return <>{renderSidebar()}</>;
};

export default Sidebar;
