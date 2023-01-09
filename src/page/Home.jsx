import React, { useState, useEffect } from "react";
import Data from "../components/Data";
import Card from "../components/Card";
import Header from "../components/Header";
const Home = () => {
  const [cards, setCards] = useState([]);
  const [selectCard, setSelectcard] = useState([]);
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(0);
  const [gameover, setGameover] = useState(false);
  //把卡牌打亂
  const shuffleImages = () => {
    let shuffledArray = [...Data, ...Data]
      .map((item, index) => ({
        ...item,
        id: index + 1,
      }))
      .sort(() => Math.random() - 0.5);
    setScore(0);
    setTries(0);
    setCards(shuffledArray);
  };
  //初始化
  useEffect(() => {
    shuffleImages();
  }, []);
  //翻兩張會執行
  useEffect(() => {
    if (selectCard.length === 2) {
      setTimeout(() => {
        setSelectcard([]);
      }, 1000);
      checkMatch();
    }
  }, [selectCard]);
  //檢查是否一樣
  const checkMatch = () => {
    //num檢查是否為同張卡片，id把點同張兩下會出現bug分隔開來
    if (
      selectCard[0].num === selectCard[1].num &&
      selectCard[0].id !== selectCard[1].id
    ) {
      setScore(score + 1);
      let updateCard = cards.map((item) => {
        if (item.num === selectCard[0].num) {
          return { ...item, isMatch: true };
        }
        return item;
      });
      setTries(tries + 1);
      setCards(updateCard);
    } else if (selectCard[0].id !== selectCard[1].id) {
      setTries(tries + 1);
    }
  };
  //重置鍵
  const restartHandler = () => {
    shuffleImages();
    setGameover(false);
  };
  //計算遊戲結束
  useEffect(() => {
    if (score == Data.length) {
      setGameover(true);
    }
  }, [score]);
  return (
    <div className="Container">
      <div className="bg">
        <div className="mask"></div>
      </div>
      <div className="titleContainer">
        <Header tries={tries} score={score} />
      </div>
      <div className="board">
        {cards.map((item) => (
          <Card
            key={item.id}
            card={item}
            selectCard={selectCard}
            setSelectcard={setSelectcard}
            score={score}
          />
        ))}
      </div>
      <div className="overContainer">
        {gameover && (
          <div className="Overbox">
            <p>遊戲結束</p>
            <button onClick={restartHandler}>再玩一局</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
