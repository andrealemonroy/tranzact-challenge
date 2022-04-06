import React from "react";
import { useBetContext } from "../context";
import "./Card.scss";
const Card = ({ dataBet }: any): JSX.Element => {
  console.log(dataBet);
  const { setBet } = useBetContext();
  const handleClick = (param: any) => {
    setBet(param);
  };
  return (
    <div className="card">
      <div className="card__header">
        <p>{dataBet.name}</p>
      </div>
      <div className="card__content">
        <div className="card__content__bets">
          {dataBet?.markets?.map(
            (market: { name: string; selections: any }) => (
              <div className="card__content__bet">
                <div className="card__content__name">{market.name}</div>
                <div className="card__content__bet__buttons">
                  {market.selections?.map((selections: any) => (
                    <div
                      className="card__content__bet__buttons__button"
                      onClick={() => handleClick(selections)}
                    >
                      <div>{selections?.name}</div>
                      <div>{selections?.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
