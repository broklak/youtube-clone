import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from '@chakra-ui/core';
import Logo from '@components/logo';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  MdAccountCircle,
  MdApps,
  MdMenu,
  MdMoreVert,
  MdSearch,
  MdVideoCall,
} from 'react-icons/md';

interface INavbar {
  minimized: boolean;
  onMinimized: (value: boolean) => void;
}

const Navbar: React.FC<INavbar> = ({ minimized, onMinimized }) => {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof router.query.search_query === 'string') {
      setSearchValue(router.query.search_query);
    }
  }, [router]);

  const handleSidebarToggle = () => {
    onMinimized(!minimized);
  };

  const handleSearch = () => {
    if (searchValue) {
      router.push(`/result?search_query=${searchValue}`);
    }
  };

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Flex
      p={3}
      justify="space-between"
      pos="fixed"
      w="100%"
      bg="#fff"
      zIndex={1}
    >
      <Flex flex="0 1 728px">
        <Stack spacing={2} align="center" isInline>
          <IconButton
            aria-label="Upload video"
            h={8}
            fontSize="xl"
            color="gray.600"
            bg="transparent"
            icon={<MdMenu />}
            onClick={handleSidebarToggle}
            data-testid="navbar-minimized-toggle"
          />
          <Logo />
        </Stack>
      </Flex>
      <Flex flex="0 1 728px">
        <InputGroup w="100%">
          <Input
            placeholder="Search"
            h={8}
            pl={3}
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            onKeyDown={handleSearchEnter}
          />
          <InputRightElement w={20} h={8} pr={0}>
            <IconButton
              aria-label="Search videos"
              w="100%"
              h="calc(2rem - 2px)"
              mr="1px"
              roundedTopLeft={0}
              roundedBottomLeft={0}
              fontSize="xl"
              color="gray.600"
              borderLeft="1px"
              borderColor="gray.200"
              icon={<MdSearch />}
              onClick={handleSearch}
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Flex flex="0 1 728px" justify="flex-end">
        <Stack spacing={2} align="center" isInline>
          <IconButton
            aria-label="Upload video"
            h={8}
            fontSize="xl"
            color="gray.600"
            bg="transparent"
            icon={<MdVideoCall />}
          />
          <Box>
            <Menu>
              <MenuButton
                as={Button}
                px={2}
                h={8}
                bg="transparent"
                fontSize="xl"
                color="gray.600"
              >
                <MdApps />
              </MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Box>
            <Menu>
              <MenuButton
                as={Button}
                px={2}
                h={8}
                bg="transparent"
                fontSize="xl"
                color="gray.600"
              >
                <MdMoreVert />
              </MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Box>
            <Button
              h={8}
              textTransform="uppercase"
              fontSize="sm"
              variant="outline"
              colorScheme="blue"
            >
              <Icon as={MdAccountCircle} fontSize="xl" mr={2} />
              Sign In
            </Button>
          </Box>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Navbar;
