import React from "react";

const Footer = () => (
  <div className="flex justify-between items-center">
    <div className="flex flex-col text-left">
      <span>&copy; Maximus 2020</span>
      <span>
        Contributors:&nbsp;
          <a href="https://twitter.com/andrew_bakst" target="_blank" rel="noopener noreferrer">Andrew</a>,&nbsp;
          <a href="https://github.com/srslafazan" target="_blank" rel="noopener noreferrer">Shain</a>,&nbsp;
          <a href="https://github.com/calvinmd" target="_blank" rel="noopener noreferrer">Calvin</a>,&nbsp;
          <a href="https://github.com/garythung" target="_blank" rel="noopener noreferrer">Gary</a>
      </span>
    </div>
    <div>
      <a href="https://twitter.com/maximus__bank" target="_blank" rel="noopener noreferrer">
        <img className="h-8 w-8" alt="twitter" src="/twitter_circle.png" />
      </a>
    </div>
  </div>
);

export { Footer };
