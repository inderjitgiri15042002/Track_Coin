import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { CryptoContext } from "../CryptoContext";
import { Avatar, Typography, Divider } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";

export default function UserSidebar() {
  const [state, setState] = React.useState({ right: false });
  const { user, logout, watchlist, coins, symbol } =
    React.useContext(CryptoContext);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const removeFromWatchlist = async (coinId) => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((id) => id !== coinId),
        },
        { merge: true }
      );
      toast.success(`${coinId} removed from watchlist!`);
    } catch (error) {
      toast.error("Failed to remove coin.");
      console.error(error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      if (logout) logout();
      setState({ right: false });
    } catch (error) {
      toast.error("Error logging out. Try again.");
      console.error(error);
    }
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: 300,
        bgcolor: "#121212",
        height: "100%",
        color: "white",
        p: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 3,
          }}
        >
          <Avatar
            src={user?.photoURL}
            alt={user?.displayName || "User"}
            sx={{ width: 56, height: 56 }}
          />
          <Box>
            <Typography variant="h6">
              {user?.displayName || "Guest User"}
            </Typography>
            <Typography variant="body2" color="gray">
              {user?.email}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ bgcolor: "gray", mb: 3 }} />
      </Box>
      <Box
        sx={{
          flex: 1,
          width: "100%",
          bgcolor: "gray",
          borderRadius: 2,
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          overflowY: "auto",
          mb: 3,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Typography
          sx={{ fontSize: 15, fontWeight: "bold", textShadow: "0 0 5px black" }}
        >
          Watchlist
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {watchlist && watchlist.length > 0 ? (
            coins
              .filter((coin) => watchlist.includes(coin.id))
              .map((coin) => (
                <Box
                  key={coin.id}
                  sx={{
                    bgcolor: "#333",
                    borderRadius: 1,
                    p: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      src={coin.image}
                      alt={coin.name}
                      sx={{ width: 24, height: 24 }}
                    />
                    <Box>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {coin.name}
                      </Typography>
                      <Typography sx={{ fontSize: "0.8rem", color: "#ccc" }}>
                        {symbol} {coin.current_price.toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>

                  <IconButton
                    aria-label="remove"
                    onClick={() => removeFromWatchlist(coin.id)}
                    sx={{ color: "#ff4d4d" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))
          ) : (
            <Typography sx={{ fontStyle: "italic", color: "#bbb" }}>
              No coins in watchlist.
            </Typography>
          )}
        </Box>
      </Box>

      <Button
        variant="contained"
        onClick={logOut}
        sx={{
          backgroundColor: "#eebc1d",
          color: "black",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#d4a017",
          },
        }}
      >
        Logout
      </Button>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            sx={{
              cursor: "pointer",
              background: "gold",
              width: 40,
              height: 40,
              ml: 2,
            }}
            src={user?.photoURL}
            alt={user?.displayName || "User"}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
