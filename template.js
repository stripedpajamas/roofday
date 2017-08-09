exports.main = (context) => {
  return `
<html>
  <head>
    <title>${context.title}</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <div class="main-content" style="background: linear-gradient(#29CCFF, #C2D9E8 ${100 - context.clouds}%)">
      <div class="roof-time">
        <h1>Roof time?</h1>
        <p>${context.title}</p>
      </div>
      <div class="weather-data">
        <h2>Temperature: ${Math.floor(context.tmp)}</h2>
        <h2>Cloud cover ${context.clouds}%</h2>
        <h2>Precipitation: ${context.precip}%</h2>
        <h2>Wind: ${context.wind}</h2>
        <h2>UV Index ${context.uv}</h2>
        <h2>Metric ${context.metric}</h2>
      </div>
    </div>
  </body>
</html>
`;
}

exports.error = (context) => {
  return `
<html>
  <head>
    <title>${context.title}</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <div class="main-content" style="background: linear-gradient(#29CCFF, #C2D9E8 1%)">
      <div class="roof-time">
        <h1>Error checking roof :(</h1>
      </div>
    </div>
  </body>
</html>
  `
};
