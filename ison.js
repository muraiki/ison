// Generate object for BZ Byzantina neume font
// Todo: Will need to call this once for each neume in a phrase
//   then group them, so that users can manipulate each individual neume
function byzantina(text, size) {
    return new fabric.Text(text, { 
      useNative: false,
      path: './fonts/BZ_Byzantina_400.font.js',
      fontFamily: 'BZ Byzantina',
      fontSize: size || 32,
      textAlign: "left",
      fill:"#000000"
    });
}

// Generate object for EZ Omega font
function omega(text, size) {
    return new fabric.Text(text, {
      useNative: false,
      path: './fonts/EZ_Omega_400.font.js',
      fontFamily: 'EZ Omega',
      fontSize: size || 22,
      textAlign: "left",
      fill:"#000000"
    });
}

// Word + neume grouping
function wn(word, neumes, left, top) {
    var padding = 12; // Vertical padding between neumes and words

    var genWord = omega(word);
    var genNeumes = byzantina(neumes);

    genWord.set({left: -((genNeumes.getWidth() - genWord.getWidth()) / 2)
                , top: padding + genNeumes.getHeight()});
    genNeumes.set({left: 0});

    return new fabric.Group([ genWord, genNeumes ],
                            {left: left, top: top});
}

function startIson() {
    var canvas = new fabric.Canvas('c');

    var testGroup = wn("Chant", "abcdefg", 160, 100);
    canvas.add(testGroup);

    var toJson = document.getElementById("toJson");
    toJson.onchange = function () {
        canvas.loadFromJSON(this.value);
        canvas.renderAll();
    };

    var toSvgta = document.getElementById("toSvgta");

    function updateControls() {
      toJson.value = JSON.stringify(canvas);
      toSvgta.value = canvas.toSVG();
    };

    canvas.on({
        'object:moving': updateControls,
        'object:scaling': updateControls,
        'object:resizing': updateControls
    });
}

