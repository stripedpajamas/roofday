module.exports = {
  css: `
body {
  font-size: 100%;
  font-family: "Lucida Grande", Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

a {
  color: #00B7FF;
}

h1,h2,h3,h4,h5,h6 {
  margin: 0;
}

.main-content {
  min-height: 100vh;
  width: 100%;
}

.roof-time {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
}

.roof-time h1 {
  font-size: 2em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.roof-time p {
  margin: 0;
  font-size: 5em;
}

.weather-data {
  position: absolute;
  bottom: 24px;
  left: 24px;
  color: rgba(255, 255, 255, 0.7);
}

.weather-data > h2 {
  letter-spacing: 0.1em;
  font-weight: normal;
  margin-bottom: 16px;
  line-height: 1.2;
}
`
};
