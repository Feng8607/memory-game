import React from "react";

const Header = ({ tries, score }) => {
  return (
    <>
      <h1>數碼寶貝-記憶卡遊戲</h1>
      <p>分數:{score}</p>
      <p>使用次數:{tries}</p>
    </>
  );
};

export default Header;
