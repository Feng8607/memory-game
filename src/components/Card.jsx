import React, { useEffect, useState } from "react";

const Card = ({ card, selectCard, setSelectcard, score }) => {
  const [isFilpped, setisfilpped] = useState(false);
  //點擊後把卡牌存陣列中
  const clickHandler = () => {
    setSelectcard([...selectCard, card]);
  };
  //當選取的卡牌跟卡牌1或卡牌2一樣或配對是false時，把卡牌掀開
  useEffect(() => {
    if (selectCard[0] === card || selectCard[1] === card || card.isMatch) {
      setisfilpped(true);
    } else {
      setisfilpped(false);
    }
  }, [selectCard]);
  useEffect(() => {
    if (score === 0) {
      setisfilpped(false);
    }
  }, [score]);
  return (
    <div className={isFilpped ? "card open" : "card"} onClick={clickHandler}>
      <div className="fornt">
        <img src={card.imgdata} />
      </div>
      <div className="back"></div>
    </div>
  );
};

export default Card;
