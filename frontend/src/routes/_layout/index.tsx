import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Flex,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import type { UserPublic } from "../../client";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useState } from "react";
import { mockItemsData, mockStoreData, mockWarehouseData } from "../../assets/mocks/mockData";

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
});

function StoreTableBody() {
  return (
    <Tbody>
      {mockStoreData.map((item) => (
        <Tr key={item.id}>
          <Td>{item.id}</Td>
          <Td>{item.name}</Td>
          <Td>{item.retail_revenue}</Td>
          <Td>{item.profit}</Td>
        </Tr>
      ))}
    </Tbody>
  );
}

function StoresTable() {
  return (
    <>
      <AccordionButton>
        <Heading
          size="lg"
          textAlign={{ base: "center", md: "left" }}
          pt={12}
          marginTop={2}
          marginBottom={2}
        >
          Store Management
          <AccordionIcon />
        </Heading>
      </AccordionButton>
      <AccordionPanel>
        <TableContainer>
          <Table
            variant="striped"
            colorScheme="linkedin"
            size={{ base: "sm", md: "md" }}
          >
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Store Name</Th>
                <Th>Retail Revenue</Th>
                <Th>Profit</Th>
              </Tr>
            </Thead>
            <ErrorBoundary
              fallbackRender={({ error }) => (
                <Tbody>
                  <Tr>
                    <Td colSpan={4}>Something went wrong: {error.message}</Td>
                  </Tr>
                </Tbody>
              )}
            >
              <Suspense
                fallback={
                  <Tbody>
                    {new Array(5).fill(null).map((_, index) => (
                      <Tr key={index}>
                        {new Array(4).fill(null).map((_, index) => (
                          <Td key={index}>
                            <Flex>
                              <Skeleton height="20px" width="20px" />
                            </Flex>
                          </Td>
                        ))}
                      </Tr>
                    ))}
                  </Tbody>
                }
              >
                <StoreTableBody />
              </Suspense>
            </ErrorBoundary>
          </Table>
        </TableContainer>
      </AccordionPanel>
    </>
  );
}

function WarehousesTableBody() {
  return (
    <Tbody>
      {mockWarehouseData.map((warehouse) => (
        <Tr key={warehouse.id}>
          <Td>{warehouse.id}</Td>
          <Td>{warehouse.name}</Td>
          <Td>{warehouse.wholesale_revenue}</Td>
          <Td>{warehouse.profit}</Td>
        </Tr>
      ))}
    </Tbody>
  );
}

function WarehousesTable() {
  return (
    <>
      <AccordionButton>
        <Heading
          size="lg"
          textAlign={{ base: "center", md: "left" }}
          pt={12}
          marginTop={2}
          marginBottom={2}
        >
          Warehouse Management
          <AccordionIcon />
        </Heading>
      </AccordionButton>
      <AccordionPanel>
        <TableContainer>
          <Table
            variant="striped"
            colorScheme="linkedin"
            size={{ base: "sm", md: "md" }}
          >
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Warehouse Name</Th>
                <Th>Wholesale Revenue</Th>
                <Th>Profit</Th>
              </Tr>
            </Thead>
            <ErrorBoundary
              fallbackRender={({ error }) => (
                <Tbody>
                  <Tr>
                    <Td colSpan={4}>Something went wrong: {error.message}</Td>
                  </Tr>
                </Tbody>
              )}
            >
              <Suspense
                fallback={
                  <Tbody>
                    {new Array(5).fill(null).map((_, index) => (
                      <Tr key={index}>
                        {new Array(4).fill(null).map((_, index) => (
                          <Td key={index}>
                            <Flex>
                              <Skeleton height="20px" width="20px" />
                            </Flex>
                          </Td>
                        ))}
                      </Tr>
                    ))}
                  </Tbody>
                }
              >
                <WarehousesTableBody />
              </Suspense>
            </ErrorBoundary>
          </Table>
        </TableContainer>
      </AccordionPanel>
    </>
  );
}

function ItemsTableBody({
  storeId,
  warehouseId,
}: {
  storeId?: string;
  warehouseId?: string;
}) {
  const selectedStore = mockStoreData.find((store) => {
    return store.id.toString() === storeId;
  });
  const selectedWarehouse = mockWarehouseData.find((warehouse) => {
    return warehouse.id.toString() === warehouseId;
  });

  const itemsInStore =
    selectedStore?.items.map((storeItem) => storeItem.id) || [];

  const itemsInWarehouse =
    selectedWarehouse?.items.map((warehouseItem) => warehouseItem.id) || [];

  const unitsInStore = (itemId: string | number) => {
    return selectedStore?.items.find((storeItem) => storeItem.id === itemId)
      ?.units;
  };

  const unitsInWarehouse = (itemId: string | number) => {
    return selectedWarehouse?.items.find(
      (warehouseId) => warehouseId.id === itemId
    )?.units;
  };

  const getItemUnits = (item: any) => {
    if (storeId) {
      return unitsInStore(item.id);
    } else if (warehouseId) {
      return unitsInWarehouse(item.id);
    }

    return item.units;
  };

  return (
    <Tbody>
      {mockItemsData
        .filter((item) => {
          if (!storeId && !warehouseId) return true;

          if (
            itemsInStore.includes(item.id) ||
            itemsInWarehouse.includes(item.id)
          ) {
            return true;
          }

          return false;
        })
        .map((item) => (
          <Tr key={item.id}>
            <Td>{item.id}</Td>
            <Td>{item.name}</Td>
            <Td>{item.wholesale_cost}</Td>
            {!warehouseId && <Td>{item.retail_cost}</Td>}
            <Td>{getItemUnits(item)}</Td>
            <Td>{Number(item.wholesale_cost) * item.units}</Td>
            {!warehouseId && <Td>{Number(item.retail_cost) * item.units}</Td>}
          </Tr>
        ))}
    </Tbody>
  );
}

function ItemsTable() {
  const [store, setStore] = useState<string | undefined>(undefined);
  const [warehouse, setWarehouse] = useState<string | undefined>(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isPurchaseOpen,
    onOpen: onPurchaseOpen,
    onClose: onPurchaseClose,
  } = useDisclosure();
  const toast = useToast();

  const [moveItemId, setMoveItemId] = useState<number | undefined>(undefined);
  const [moveStoreId, setMoveStoreId] = useState<number | undefined>(undefined);
  const [moveUnits, setMoveUnits] = useState<number | undefined>(0);
  const [moveWarehouseId, setMoveWarehouseId] = useState<number | undefined>(
    undefined
  );

  const [purchaseItemId, setPurchaseItemId] = useState<number | undefined>(
    undefined
  );
  const [purchaseStoreId, setPurchaseStoreId] = useState<number | undefined>(
    undefined
  );
  const [purchaseUnits, setPurchaseUnits] = useState<number | undefined>(0);

  const getWarehouseName = (warehouseId: number) => {
    return mockWarehouseData.find((warehouse) => warehouse.id === warehouseId)
      ?.name;
  };

  const getStoreName = (storeId: number) => {
    return mockStoreData.find((store) => store.id === storeId)?.name;
  };

  const getItemName = (itemId: number) => {
    return mockItemsData.find((item) => item.id === itemId)?.name;
  };

  const getItemUnitsRemaining = (
    itemId?: number,
    storeId?: number,
    warehouseId?: number
  ) => {
    if (!itemId) {
      return undefined;
    }

    if (storeId) {
      return mockStoreData
        .find((store) => {
          return store.id === storeId;
        })
        ?.items.find((storeItem) => storeItem.id === itemId)?.units;
    }

    if (warehouseId) {
      return mockWarehouseData
        .find((warehouse) => {
          return warehouse.id === warehouseId;
        })
        ?.items.find((warehouseItem) => warehouseItem.id === itemId)?.units;
    }

    return mockItemsData.find((item) => item.id === itemId)?.units;
  };

  const moveItem = () => {
    if (!moveUnits) {
      return toast({
        title: `Select units greater than 0 to move`,
        status: "error",
        isClosable: true,
      });
    }

    if (!moveItemId) {
      return toast({
        title: `Select item to move`,
        status: "error",
        isClosable: true,
      });
    }

    if (!moveStoreId && !moveWarehouseId) {
      return toast({
        title: `Select store or warehouse to move items to`,
        status: "error",
        isClosable: true,
      });
    }

    if (moveStoreId && !moveWarehouseId) {
      return toast({
        title: `Cannot move items to the store directly from the factory`,
        status: "error",
        isClosable: true,
      });
    }

    const getMovementText = () => {
      if (moveStoreId && moveWarehouseId) {
        return `store ${getStoreName(moveStoreId)} to warehouse ${getWarehouseName(moveWarehouseId)}`;
      } else if (!moveStoreId && moveWarehouseId) {
        return `factory to warehouse ${getWarehouseName(moveWarehouseId)}`;
      }
    };

    toast({
      title: `Item moved!`,
      description: `We've moved ${moveUnits} units of item "${getItemName(moveItemId)}" from ${getMovementText()}`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const purchaseItem = () => {
    if (!purchaseUnits) {
      return toast({
        title: `Select units greater than 0 to purchase`,
        status: "error",
        isClosable: true,
      });
    }

    if (!purchaseItemId) {
      return toast({
        title: `Select item to purchase`,
        status: "error",
        isClosable: true,
      });
    }

    if (!purchaseStoreId) {
      return toast({
        title: `Select store to purchase from`,
        status: "error",
        isClosable: true,
      });
    }

    toast({
      title: `Item purchased!`,
      description: `Congratulations! You have purchased ${purchaseUnits} units of item "${getItemName(purchaseItemId)}" from ${getStoreName(purchaseStoreId)}`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <>
      <AccordionButton>
        <Heading
          size="lg"
          textAlign={{ base: "center", md: "left" }}
          pt={12}
          marginTop={2}
          marginBottom={2}
        >
          Item Management (Inventory)
          <AccordionIcon />
        </Heading>
      </AccordionButton>
      <AccordionPanel>
        <TableContainer>
          <Table
            variant="striped"
            colorScheme="linkedin"
            size={{ base: "sm", md: "md" }}
          >
            <Thead>
              <Tr>
                <Td paddingStart={0}>
                  <Select
                    variant="filled"
                    onChange={(evt) => setStore(evt.target.value)}
                    placeholder="Select Store"
                    disabled={!!warehouse}
                  >
                    {mockStoreData.map((store) => (
                      <option value={store.id}>{store.name}</option>
                    ))}
                  </Select>
                </Td>
                <Td paddingStart={0}>
                  <Select
                    variant="filled"
                    onChange={(evt) => setWarehouse(evt.target.value)}
                    placeholder="Select Warehouse"
                    disabled={!!store}
                  >
                    {mockWarehouseData.map((warehouse) => (
                      <option value={warehouse.id}>{warehouse.name}</option>
                    ))}
                  </Select>
                </Td>
                <Td align="right">
                  <Button colorScheme="linkedin" onClick={onOpen}>
                    Move Item
                  </Button>
                </Td>
                <Td align="right">
                  <Button colorScheme="whatsapp" onClick={onPurchaseOpen}>
                    Purchase Item
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Th>ID</Th>
                <Th>Item Name</Th>
                <Th>Wholesale Cost</Th>
                {!warehouse && <Th>Retail Cost</Th>}
                <Th>Units</Th>
                <Th>Total Wholesale Value</Th>
                {!warehouse && <Th>Total Retail Value</Th>}
              </Tr>
            </Thead>
            <ErrorBoundary
              fallbackRender={({ error }) => (
                <Tbody>
                  <Tr>
                    <Td colSpan={4}>Something went wrong: {error.message}</Td>
                  </Tr>
                </Tbody>
              )}
            >
              <Suspense
                fallback={
                  <Tbody>
                    {new Array(5).fill(null).map((_, index) => (
                      <Tr key={index}>
                        {new Array(5).fill(null).map((_, index) => (
                          <Td key={index}>
                            <Flex>
                              <Skeleton height="20px" width="20px" />
                            </Flex>
                          </Td>
                        ))}
                      </Tr>
                    ))}
                  </Tbody>
                }
              >
                <ItemsTableBody storeId={store} warehouseId={warehouse} />
              </Suspense>
            </ErrorBoundary>
          </Table>
        </TableContainer>
      </AccordionPanel>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Move Items</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Item</FormLabel>
            <Select
              variant="filled"
              onChange={(evt) =>
                setMoveItemId(Number(evt.target.value) || undefined)
              }
              placeholder="Select Item"
              marginBottom={3}
            >
              {mockItemsData.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </Select>
            <FormLabel>Warehouse</FormLabel>
            <Select
              variant="filled"
              onChange={(evt) =>
                setMoveWarehouseId(Number(evt.target.value) || undefined)
              }
              placeholder="Select Warehouse"
              marginBottom={3}
            >
              {mockWarehouseData.map((warehouse) => (
                <option value={warehouse.id}>{warehouse.name}</option>
              ))}
            </Select>
            <FormLabel>Store</FormLabel>
            <Select
              variant="filled"
              onChange={(evt) =>
                setMoveStoreId(Number(evt.target.value) || undefined)
              }
              placeholder="Select Store"
              marginBottom={3}
            >
              {mockStoreData.map((store) => (
                <option value={store.id}>{store.name}</option>
              ))}
            </Select>
            <SimpleGrid columns={2} spacing={2}>
              <Box>
                <FormLabel>Units</FormLabel>
                <NumberInput
                  onChange={(_, value) => {
                    setMoveUnits(value);
                  }}
                  defaultValue={0}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
              <Box>
                <FormLabel>Available Units</FormLabel>
                <Input
                  readOnly
                  value={getItemUnitsRemaining(
                    moveItemId,
                    undefined,
                    moveWarehouseId
                  )}
                />
              </Box>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="linkedin" onClick={moveItem} mr={3}>
              Move Item
            </Button>
            <Button onClick={onClose} variant="ghost">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isPurchaseOpen} onClose={onPurchaseClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Purchase Items</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Item</FormLabel>
            <Select
              variant="filled"
              onChange={(evt) =>
                setPurchaseItemId(Number(evt.target.value) || undefined)
              }
              placeholder="Select Item"
              disabled={!!warehouse}
              marginBottom={3}
            >
              {mockItemsData.map((item) => (
                <option value={item.id}>{item.name}</option>
              ))}
            </Select>
            <FormLabel>Store</FormLabel>
            <Select
              variant="filled"
              onChange={(evt) =>
                setPurchaseStoreId(Number(evt.target.value) || undefined)
              }
              placeholder="Select Store"
              marginBottom={3}
            >
              {mockStoreData.map((store) => (
                <option value={store.id}>{store.name}</option>
              ))}
            </Select>
            <SimpleGrid columns={2} spacing={2}>
              <Box>
                <FormLabel>Units</FormLabel>
                <NumberInput
                  onChange={(_, value) => {
                    setPurchaseUnits(value);
                  }}
                  defaultValue={0}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
              <Box>
                <FormLabel>Available Units</FormLabel>
                <Input
                  readOnly
                  value={getItemUnitsRemaining(
                    purchaseItemId,
                    purchaseStoreId
                  )}
                />
              </Box>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="linkedin" onClick={purchaseItem} mr={3}>
              Purchase
            </Button>
            <Button onClick={onPurchaseClose} variant="ghost">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function Dashboard() {
  const queryClient = useQueryClient();

  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"]);

  return (
    <>
      <Container maxW="full">
        <Box pt={12} m={4} marginLeft={0}>
          <Text fontSize="2xl">
            Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
          </Text>
          <Text>Welcome back, nice to see you again!</Text>
        </Box>
        {/* TODO add checks based on user type for conditional access of widgets */}
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <StoresTable />
          </AccordionItem>
          <AccordionItem>
            <WarehousesTable />
          </AccordionItem>
          <AccordionItem>
            <ItemsTable />
          </AccordionItem>
        </Accordion>
      </Container>
    </>
  );
}
