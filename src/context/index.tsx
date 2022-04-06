import React, { useContext } from 'react';



export type BetContent = {
  bet: any
  setBet: (bet: any) => void
  // titleValue: string 
  // setTitleValue:(c: string) => void
  // propertiesValue: string 
  // setPropertiesValue:(c: string) => void
  // descriptionValue: string
  // setDescriptionValue: (c: string) => void
  // getGltfJSON: () => void
  // iscreated: boolean
};

export const BetContext = React.createContext<BetContent>({} as BetContent);

export const useBetContext = () => useContext(BetContext)