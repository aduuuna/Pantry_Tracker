"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "../firebase";
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

  const updateInventory = async () => {
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
  };

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
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setItemQuantity(1);
  };

  const handleClose = () => {
    setOpen(false);
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
      <Box
        display="flex"
        flexDirection="row"
        width="700px"
        height="100px"
        justifyContent="space-between"
      >
        <Stack
          alignItems="center"
          display="flex"
          justifyContent="space-evenly"
          width="250px"
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
              handleOpen();
            }}
          >
            Search
          </Button>
        </Stack>
      </Box>
      <Box border="1px solid black" width="700px" height="400px">
        <Box
          width="100%"
          height="100px"
          bgcolor="#ADD8e6"
          alignItems="center"
          justifyContent="center"
          display="flex"
        >
          <Typography variant="h2" color="#333" fontWeight="100">
            Inventory Items
          </Typography>
        </Box>

        <Stack width="100%" height="300px" spacing={2} overflow="auto">
          {inventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              border="1px solid grey"
              bgcolor="#e1f0f5"
              alignItems="center"
              justifyContent="space-evenly"
              flexDirection="row"
              display="flex"
              padding={4}
            >
              <Stack
                width="40%"
                justifyContent="center"
                alignItems="left"
                display="flex"
              >
                <Typography variant="h3" color="#333" textAlign="left">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
              </Stack>
              <Stack
                width="20%"
                justifyContent="center"
                alignItems="center"
                display="flex"
              >
                <Typography variant="h3" color="#333" textAlign="center">
                  {quantity}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                width="30%"
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
