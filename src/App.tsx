import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button, Drawer, Grid, Stack } from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { getData } from "./services";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "./components/Card";
import { BetContext, useBetContext } from "./context";
function App() {
  const defaultInitialState = { status: "idle", data: null, error: null };
  const initialStateRef = React.useRef({
    ...defaultInitialState,
  });
  const [openDrawer, setOpenDrawer] = useState(false);

  const [{ status, data, error }, setState] = React.useReducer(
    (s: any, a: any) => ({ ...s, ...a }),
    initialStateRef.current
  );
  const betsData = {
    bets: [{ betParam: { id: "", name: "", price: "" } }],
  };

  const betData = { id: "", name: "", price: "" };

  const [bet, setBet] = useState(betData);
  const [bets, setBets] = useState(betsData);
  useEffect(() => {
    getData()
      .then((res) => {
        setState({
          ...data,
          data: res,
          status: "success",
        });
      })
      .catch((err) => {
        setState({
          ...data,
          status: "error",
          error: err,
        });
      });
  }, []);

  const addBet = () => {
    setBets({
      ...bets,
      bets: [...bets?.bets, { betParam: bet }],
    });
    setOpenDrawer(true);
  };

  useEffect(() => {
    if (bet.name !== "") {
      addBet();
    }
  }, [bet]);

  const removeBet = (betParam: any) => {
    let betRemoved = {
      bets: bets?.bets.filter(
        (row: { betParam: { id: any } }) => row.betParam.id !== betParam
      ),
    };
    setBets(betRemoved);
  };

  return (
    <BetContext.Provider value={{ bet, setBet }}>
      <Stack spacing={2} alignItems="flex-end">
        <Button onClick={() => setOpenDrawer(true)}>
          <MenuIcon />
        </Button>
      </Stack>

      <Drawer
        sx={{
          width: "90vw",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "90vw",
          },
        }}
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Stack alignItems="flex-end" spacing={2}>
          <Button onClick={() => setOpenDrawer(false)}>
            <CloseIcon />
          </Button>
        </Stack>
        {bets?.bets?.map((bet, index) =>
          bet.betParam.name !== "" ? (
            <ul key={index}>
              <li>{bet.betParam.name}</li>
              <li>{bet.betParam.price}</li>
              <Button
                variant="contained"
                onClick={() => removeBet(bet.betParam.id)}
              >
                DELETE
              </Button>
            </ul>
          ) : null
        )}
      </Drawer>
      {}
      {data !== null ? (
        data?.map((item: any) =>
          item.markets.length > 0 ? (
            <Card dataBet={item} handleClick={addBet}></Card>
          ) : null
        )
      ) : (
        <div>
          <CircularProgress />
        </div>
      )}
    </BetContext.Provider>
  );
}

export default App;
