"use client";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { firestore, analytics } from "../firebase";
import {
  Box,
  Typography,
  Modal,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import {
  query,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [sortAlphabetically, setSortAlphabetically] = useState(true);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [openNoResult, setOpenNoResult] = useState(false);
  const inventoryListRef = useRef(null);
  const [highlightedItem, setHighlightedItem] = useState(null);

  const updateInventory = useCallback(async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });

    if (sortAlphabetically) {
      inventoryList.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      inventoryList.sort((a, b) => b.quantity - a.quantity);
    }

    setInventory(inventoryList);
  }, [sortAlphabetically]);

  const toggleSortMethod = () => {
    setSortAlphabetically(!sortAlphabetically);
    updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {
          quantity: quantity - 1,
        });
      }
    }

    await updateInventory();
  };

  const addItem = async (item, quantity) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity: existingQuantity } = docSnap.data();
      await setDoc(docRef, { quantity: existingQuantity + quantity });
    } else {
      await setDoc(docRef, { quantity: quantity });
    }

    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, [updateInventory]);

  const handleOpen = () => {
    setOpen(true);
    setItemQuantity(1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenSearch = () => {
    setOpenSearch(true);
    setSearchTerm("");
  };

  const handleCloseSearch = () => {
    setOpenSearch(false);
    setSearchTerm("");
    setSearchResult(null);
  };

  const handleSearch = () => {
    const result = inventory.find(
      (item) => item.name.toLowerCase() === searchTerm.toLowerCase()
    );
    if (result) {
      setSearchResult(result);
      setOpenSearch(false);
      setHighlightedItem(result.name); // set search result

      const newInventory = [
        result,
        ...inventory.filter((item) => item.name !== result.name),
      ];
      setInventory(newInventory);

      setTimeout(() => {
        if (inventoryListRef.current) {
          inventoryListRef.current.scrollTop = 0;
        }
      }, 100);

      setTimeout(() => {
        setHighlightedItem(null);
      }, 3000);
    } else {
      setOpenNoResult(true);
    }
  };
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          border="2px soloid #000000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6">Item Name</Typography>
          <Stack with="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Stack>
          <Typography variant="h6">Quantity</Typography>
          <Stack with="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              type="number"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(parseInt(e.target.value) || 1)}
            />
          </Stack>
          <Button
            variant="contained"
            onClick={() => {
              addItem(itemName, itemQuantity);
              setItemName("");
              setItemQuantity(1);
              handleClose();
            }}
          >
            Add
          </Button>
        </Box>
      </Modal>
      <Modal open={openSearch} onClose={handleCloseSearch}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          border="2px soloid #000000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6">What item are you looking for?</Typography>
          <Stack with="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Stack>

          <Button variant="contained" onClick={handleSearch}>
            Search Item
          </Button>
        </Box>
      </Modal>

      <Modal open={openNoResult} onClose={() => setOpenNoResult(false)}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          border="2px solid #000000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6">Item not found in inventory</Typography>
          <Button variant="contained" onClick={() => setOpenNoResult(false)}>
            OK
          </Button>
        </Box>
      </Modal>
      <Box
        display="flex"
        flexDirection="row"
        maxWidth="700px"
        minWidth="400px"
        width="100%"
        height="100px"
        justifyContent="space-between"
      >
        <Stack
          alignItems="center"
          display="flex"
          justifyContent="space-evenly"
          width="230px"
          flexDirection="row"
        >
          <Button variant="contained" onClick={toggleSortMethod}>
            Sort {sortAlphabetically ? "by Alphabetically" : "Quantity"}
          </Button>
        </Stack>
        <Stack
          alignItems="center"
          display="flex"
          justifyContent="space-evenly"
          width="300px"
          flexDirection="row"
        >
          <Button
            variant="contained"
            onClick={() => {
              handleOpen();
            }}
          >
            Add new Item
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleOpenSearch();
            }}
          >
            Search
          </Button>
        </Stack>
      </Box>
      <Box
        border="1px solid black"
        maxWidth="700px"
        minWidth="400px"
        width="100%"
        height="400px"
      >
        <Box
          width="100%"
          height="100px"
          bgcolor="#ADD8e6"
          alignItems="center"
          justifyContent="center"
          display="flex"
        >
          <Typography variant="h4" color="#333" fontWeight="100">
            Inventory Items
          </Typography>
        </Box>

        <Stack
          width="100%"
          maxWidth="700px"
          minWidth="400px"
          height="300px"
          spacing={1}
          overflow="auto"
          ref={inventoryListRef}
        >
          {inventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              height="80px"
              bgcolor={highlightedItem === name ? "#FFB6C1" : "#e1f0f5"}
              alignItems="center"
              justifyContent="space-evenly"
              flexDirection="row"
              display="flex"
              padding={3}
              border="1px solid grey"
            >
              <Stack
                width="45%"
                justifyContent="center"
                alignItems="left"
                display="flex"
              >
                <Typography variant="h5" color="#333" textAlign="left">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
              </Stack>

              <Stack
                width="15%"
                justifyContent="center"
                alignItems="center"
                display="flex"
              >
                <Typography variant="h5" color="#333" textAlign="center">
                  {quantity}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                width="25%"
                alignItems="center"
                justifyContent="space-evenly"
                display="flex"
              >
                <Button variant="contained" onClick={() => addItem(name, 1)}>
                  Add
                </Button>
                <Button variant="contained" onClick={() => removeItem(name)}>
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
