import React from "react";

const Footer = () => (
  <div className="flex justify-between">
    <div>
      Maximus &copy; 2020.
    </div>
    <div className="text-sm">
      Contributors:&nbsp;&nbsp;
        <a href="https://twitter.com/andrew_bakst" target="_blank" rel="noopener noreferrer">Andrew</a>,&nbsp;
        <a href="https://github.com/srslafazan" target="_blank" rel="noopener noreferrer">Shain</a>,&nbsp;
        <a href="https://github.com/calvinmd" target="_blank" rel="noopener noreferrer">Calvin</a>,&nbsp;
        <a href="https://github.com/garythung" target="_blank" rel="noopener noreferrer">Gary</a>.
    </div>
    <div>
      <div>
        <a href="https://twitter.com/maximus__bank" target="_blank" rel="noopener noreferrer">
          <img alt="twitter" src="/twitter_circle.png" height="24px" width="24px" />
        </a>
      </div>
    </div>
  </div>
);

export { Footer };
