import React, { useContext } from 'react';



export type BetContent = {
  bet: any
  setBet: (bet: any) => void
};

export const BetContext = React.createContext<BetContent>({} as BetContent);

export const useBetContext = () => useContext(BetContext)