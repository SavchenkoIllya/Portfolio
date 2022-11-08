export const Ascii = () => {
  function asciiFromCanvas(canvas, options) {
    // Original code by Jacob Seidelin (http://www.nihilogic.dk/labs/jsascii/)
    // Heavily modified by Andrei Gheorghe (http://github.com/idevelop)

    let characters = options.characters || ".:;+=*|$&#";

    characters = characters.split("");

    const context = canvas.getContext("2d");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    let asciiCharacters = "";

    const contrastFactor =
      (259 * (options.contrast + 255)) / (255 * (259 - options.contrast));

    const columns = options.columns || 150;
    const rows = options.rows || 100;

    let imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        const offset =
          (Math.floor((y * canvasHeight) / rows) * canvasWidth +
            Math.floor((x * canvasWidth) / columns)) *
          4;

        const color = getColorAtOffset(imageData.data, offset);

        const contrastedColor = {
          red: bound(
            Math.floor((color.red - 128) * contrastFactor) + 128,
            [0, 255]
          ),
          green: bound(
            Math.floor((color.green - 128) * contrastFactor) + 128,
            [0, 255]
          ),
          blue: bound(
            Math.floor((color.blue - 128) * contrastFactor) + 128,
            [0, 255]
          ),
          alpha: color.alpha,
        };

        // calculate pixel brightness
        // http://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color
        const brightness =
          (0.299 * contrastedColor.red +
            0.587 * contrastedColor.green +
            0.114 * contrastedColor.blue) /
          255;

        let character =
          characters[
            characters.length -
              1 -
              Math.round(brightness * (characters.length - 1))
          ];

        if (character === " ") {
          character = "&nbsp;";
        }

        asciiCharacters += character;
      }

      asciiCharacters += "<br />";
    }

    options.callback(asciiCharacters);
  }

  function getColorAtOffset(data, offset) {
    return {
      red: data[offset],
      green: data[offset + 1],
      blue: data[offset + 2],
      alpha: data[offset + 3],
    };
  }

  function bound(value, interval) {
    return Math.max(interval[0], Math.min(interval[1], value));
  }

  return {
    fromCanvas: function (canvas, options) {
      options = options || {};
      options.contrast =
        typeof options.contrast === "undefined" ? 128 : options.contrast;

      return asciiFromCanvas(canvas, options);
    },
  };
};

export const initialAscii =
  "+++++,+++++++++++++,,++++++,,,,+.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.,,,,,,,,,,,..,..,,..,,....................................<br>,,+++,++++++++,+++++,++++,,,,,,,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,,,,,,,,,,,,,.,,,..,,,...................................<br>++++++++++,++++++++++,+++,,++,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,,,,,,,,,,,,,,.,.,,.....................................<br>+++++++++++++++++++++++++++,,.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,,,,,,,,,,,,,,,,.......................................<br>++++++,+++++++++++++++++,++,.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⮐=c=⮐+,,.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.,,,,,,,,,,,,,,,,.....................................<br>+++++++,++,++++++++++,,+++,..&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cccc=⮐+,..&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,,,,,,,,,,,,,,,,.....................................<br>,++++++,+++++,+++++++++,++,..&nbsp;&nbsp;&nbsp;&nbsp;+cx//c==⮐,.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.,,,,,,,.,,,,..,,,,..................................<br>,++++++++++++++++++++++++,..&nbsp;&nbsp;&nbsp;&nbsp;.=/x/c==⮐++,.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,,,,,,,,,,,,,.,,,,,.................................<br>+++++++++++++++++++++++++,.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+=////==⮐+,.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,,,,,,,,,,,,,,,.,,..................................<br>++++++++++++++++++++,+++,,.&nbsp;&nbsp;&nbsp;&nbsp;.,c///c==+..&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.,,,,,,,,,,,,,,,.,..................................<br>++++++++++++++++++++++++,,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.,c////=.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,,,,,,,,,,,,,,,.,,.................................<br>+++++++++++++++++++++++++,&nbsp;&nbsp;&nbsp;&nbsp;..⮐///⮐.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.,,,,,,,,,,,.,,,.,,.................................<br>+++++++++++++++++++++++++.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,///⮐,..&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,,,,,,,,,,,,,,,,,,,,............,...................<br>+++++++++++++++++++++++++.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=x/c⮐+.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;==&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,,,,,,,,,,,,,,,,,,,,,,,,,....,,,,...................<br>⮐++++++++++++++++++++++++.&nbsp;&nbsp;&nbsp;&nbsp;,xx/c+..+.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,cc,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,,,,,,,,,,,,,,,,,,,,.......,,,,,,...................<br>⮐++++++++++++++++++++++++/c&nbsp;&nbsp;&nbsp;+///c+++⮐,.&nbsp;&nbsp;&nbsp;&nbsp;,⮐c==+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,.,...,,..............<br>+++⮐⮐++++++++++++++++++++⮐&nbsp;&nbsp;&nbsp;&nbsp;+c///=+,.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,⮐cc⮐=,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,............<br>+⮐⮐⮐⮐⮐⮐++⮐++++++++++++++⮐⮐&nbsp;/.&nbsp;,⮐c///=⮐+...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/c=.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,..........<br>==x+⮐⮐⮐++⮐++⮐++⮐++⮐+++⮐⮐⮐+⮐⮐&nbsp;&nbsp;&nbsp;.=c//cc=+,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,.,,..,......<br>/x⮐++⮐⮐+⮐++++++++⮐⮐++++⮐++c⮐&nbsp;+&nbsp;.⮐ccccc=+.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.+.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,.,,,,..,.....<br>==⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐+⮐+⮐++⮐⮐+++⮐⮐⮐=xx+&nbsp;&nbsp;+,,⮐⮐=⮐,,&nbsp;&nbsp;&nbsp;.&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,..,..<br>===⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐++⮐⮐++⮐⮐⮐⮐/x,&nbsp;&nbsp;....++++,...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,..,,.<br>===⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐+⮐,&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;...+,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.,,,,,,,,,+,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,...<br>====⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐+.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,,,+++++++,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,...<br>==⮐⮐=⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;+⮐⮐,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.+++++,++++,,,,,,,,,+,,,,,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,<br>&nbsp;/⮐c=⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,+,,++++++++++++,,,++,,,,,,,,,,,,,,,,,,,,,,,,,,,.,,,,,,<br>x/⮐===⮐⮐⮐⮐=⮐==⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐+,=&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,++++++++++++++++,,++++,+,,,,,+,,,,,,,,,,,,,,,,,,,,,,,,,<br>/=⮐==⮐⮐=====⮐=⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐/+&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,+++++++++++++++++++++++,+,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,<br>===============⮐⮐=⮐⮐⮐=⮐⮐⮐⮐⮐⮐⮐==⮐x⮐.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,++++++++++++++++++,++++++++,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,<br>================⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐=⮐⮐/c⮐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+++++++++++++++++++,++++++++,+,,,,,,,,,,,,,,,,,,,,,,,,,,,,<br>=========⮐⮐⮐==⮐=⮐==⮐=⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐⮐//c,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,++++++++++++++++++++,+++++++++++,,,+++,+,,,,,,,,,,,,,,,,,,,<br>=================⮐=====⮐=⮐=⮐=⮐⮐⮐//c+.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+++++++++++++++++++++++++++++++++,+++++++,,,,,,,,,,,,,,,,,,,<br>==================⮐====⮐==⮐⮐====xxc⮐.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;++⮐⮐+⮐++++⮐++++++++++++++++++++++++++++++++,,++++,,,,,,,,,,,<br>=============================⮐ccxxc⮐+,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.⮐⮐⮐⮐⮐+++++++++++++++++⮐++++++++++++++++++++++,+++,,,,,,,,,,,<br>cc=======c===============c/&nbsp;&nbsp;cccxx/=+,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=⮐⮐⮐⮐⮐⮐⮐++++⮐+++++++++++++++++++++++++++++++++++++,+,,,,,,<br>ccc=c==cc=c=c=========x=xxx⮐&nbsp;&nbsp;=/xx/=+,.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;⮐⮐⮐⮐⮐⮐⮐+⮐⮐++⮐++⮐+++++++++++++++++++++++++++++++++++,,,,<br>=ccccc==ccccccc===/xxxx/.=c==.&nbsp;cx/c=+.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,⮐⮐⮐⮐⮐⮐⮐⮐⮐+⮐⮐+⮐⮐++++++++++++++++++++++++++++++,,++,,,<br>ccccccccccccccc=/xxxxx/=+&nbsp;⮐⮐===⮐+cc⮐+,.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,+⮐⮐⮐⮐++⮐++⮐⮐+++++⮐⮐++++++++++++++++++++++++++++++,<br>ccccccccccc==cxxxxxxx/c//,,&nbsp;.+====⮐,..&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;,+⮐⮐⮐⮐⮐⮐++⮐⮐+++++++++⮐⮐+++++++++++++++++++++++,,<br>ccc=c=cccccxxxxxx///ccc+⮐..⮐+,.,⮐⮐⮐⮐+,.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;,++++⮐⮐⮐⮐+++⮐++⮐⮐++++++++++++++++++++++++,+++";
