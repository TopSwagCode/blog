var pixelWidth = window.screen.width * window.devicePixelRatio;
var pixelHeight = window.screen.height * window.devicePixelRatio;

pixelWidth = pixelWidth - pixelWidth % 20;
pixelHeight = pixelHeight - pixelHeight % 20;

document.getElementById("widthInput").value = pixelWidth;
document.getElementById("heightInput").value = pixelHeight;

//var pixelWidth = 500;
//var pixelHeight = 500;

var canvasElement = document.createElement("canvas");
canvasElement.setAttribute("id","testCanvas");
canvasElement.setAttribute("height",pixelHeight);
canvasElement.setAttribute("width",pixelWidth);

document.body.appendChild(canvasElement);

var brElement = document.createElement("br");
document.body.appendChild(brElement);

var COLS = 20, ROWS = 20;


var board = [];
var lose;
var interval;
var renderInterval;
var current; // current moving shape
var currentX, currentY; // position of current shape
var freezed; // is current shape settled on the board?
var shapes = [
    [ 1, 1, 1, 1 ],
    [ 1, 1, 1, 0,
      1 ],
    [ 1, 1, 1, 0,
      0, 0, 1 ],
    [ 1, 1, 0, 0,
      1, 1 ],
    [ 1, 1, 0, 0,
      0, 1, 1 ],
    [ 0, 1, 1, 0,
      1, 1 ],
    [ 0, 1, 0, 0,
      1, 1, 1 ]
];
var colors = [];

var priv = 0;

// creates a new 4x4 shape in global variable 'current'
// 4x4 so as to cover the size when the shape is rotated
function newShape() {
    var id = Math.floor( Math.random() * shapes.length );
    var shape = shapes[ id ]; // maintain id for color filling

    current = [];
    for ( var y = 0; y < 4; ++y ) {
        current[ y ] = [];
        for ( var x = 0; x < 4; ++x ) {
            var i = 4 * y + x;
            if ( typeof shape[ i ] != 'undefined' && shape[ i ] ) {
                current[ y ][ x ] = id + 1;
            }
            else {
                current[ y ][ x ] = 0;
            }
        }
    }
    
    // new shape starts to move
    freezed = false;
    var max = COLS - 4;
    // Random X
    var testX = Math.floor(Math.random() * 5) + 2; // check priv and allways move 2-7 right untill max has been met.
    testX = priv + testX;
    testX = testX % max;
    priv = testX;



    // position where the shape will evolve
    currentX = testX;
    currentY = 0;
}

// clears the board
function init() {
    for ( var y = 0; y < ROWS; ++y ) {
        board[ y ] = [];
        for ( var x = 0; x < COLS; ++x ) {
            board[ y ][ x ] = 0;
        }
    }
}

// keep the element moving down, creating new shapes and clearing lines
function tick() {
    if ( valid( 0, 1 ) ) {
        ++currentY;
    }
    
    // if the element settled
    else {
        freeze();
        valid(0, 1);
        clearLines();
        if (lose) {
            clearAll();
            return false;
        }
        newShape();
    }
}

// stop shape at its position and fix it to board
function freeze() {
    for ( var y = 0; y < 4; ++y ) {
        for ( var x = 0; x < 4; ++x ) {
            if ( current[ y ][ x ] ) {
                board[ y + currentY ][ x + currentX ] = current[ y ][ x ];
            }
        }
    }
    freezed = true;
}

function clearAll(){
    clearInterval(interval);
    clearInterval(renderInterval);
}

// returns rotates the rotated shape 'current' perpendicularly anticlockwise
function rotate( current ) {
    var newCurrent = [];
    for ( var y = 0; y < 4; ++y ) {
        newCurrent[ y ] = [];
        for ( var x = 0; x < 4; ++x ) {
            newCurrent[ y ][ x ] = current[ 3 - x ][ y ];
        }
    }

    return newCurrent;
}

// check if any lines are filled and clear them
function clearLines() {
    for ( var y = ROWS - 1; y >= 0; --y ) {
        var rowFilled = true;
        for ( var x = 0; x < COLS; ++x ) {
            if ( board[ y ][ x ] == 0 ) {
                rowFilled = false;
                break;
            }
        }
        if ( rowFilled ) {
            for ( var yy = y; yy > 0; --yy ) {
                for ( var x = 0; x < COLS; ++x ) {
                    board[ yy ][ x ] = board[ yy - 1 ][ x ];
                }
            }
            ++y;
        }
    }
}

function keyPress( key ) {
    switch ( key ) {
        case 'left':
            if ( valid( -1 ) ) {
                --currentX;
            }
            break;
        case 'right':
            if ( valid( 1 ) ) {
                ++currentX;
            }
            break;
        case 'down':
            if ( valid( 0, 1 ) ) {
                ++currentY;
            }
            break;
        case 'rotate':
            var rotated = rotate( current );
            if ( valid( 0, 0, rotated ) ) {
                current = rotated;
            }
            break;
        case 'drop':
            while( valid(0, 1) ) {
                ++currentY;
            }
            tick();
            break;
    }
}

// checks if the resulting position of current shape will be feasible
function valid( offsetX, offsetY, newCurrent ) {
    offsetX = offsetX || 0;
    offsetY = offsetY || 0;
    offsetX = currentX + offsetX;
    offsetY = currentY + offsetY;
    newCurrent = newCurrent || current;

    for ( var y = 0; y < 4; ++y ) {
        for ( var x = 0; x < 4; ++x ) {
            if ( newCurrent[ y ][ x ] ) {
                if ( typeof board[ y + offsetY ] == 'undefined'
                  || typeof board[ y + offsetY ][ x + offsetX ] == 'undefined'
                  || board[ y + offsetY ][ x + offsetX ]
                  || x + offsetX < 0
                  || y + offsetY >= ROWS
                  || x + offsetX >= COLS ) {
                    if (offsetY == 1 && freezed) {
                        lose = true; // lose if the current shape is settled at the top most row
                        
                    } 
                    return false;
                }
            }
        }
    }
    return true;
}

function playButtonClicked() {

    var canvasElement = document.getElementById("testCanvas");

    pixelHeight = document.getElementById("heightInput").value;
    pixelWidth = document.getElementById("widthInput").value;

    pixelWidth = pixelWidth - pixelWidth % 20;
    pixelHeight = pixelHeight - pixelHeight % 20;

    canvasElement.setAttribute("height",pixelHeight);
    canvasElement.setAttribute("width",pixelWidth);

    BLOCK_W = W / COLS, BLOCK_H = H / ROWS;

    canvas = canvasElement;
    ctx = canvas.getContext( '2d' );
    
    COLS = pixelWidth / 20;
    ROWS = pixelHeight / 20;
    H = pixelHeight;
    W = pixelWidth;
    BLOCK_W = W / COLS;
    BLOCK_H = H / ROWS;

    colors = getColors();

    newGame();
}


function getColors(){
 
    var result = [];

    var e = document.getElementById("colorPicker");
    var selectedOption = e.options[e.selectedIndex].value;

    if(selectedOption == "Default"){
        result = ['cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'];
    }
    else if(selectedOption == "Neon"){
        result = ['HotPink', "PeachPuff", "Fuchsia", "SpringGreen", "Cyan", "DeepSkyBlue", "Azure"]
    }
    else if(selectedOption == "Dark"){
        result = ['DarkRed', "MediumVioletRed", "DarkOrange", "Gold", "Indigo", "DarkBlue", "DarkGreen"]
    }
    else if(selectedOption == "Pink"){
        result = ['Pink', "LightPink", "HotPink", "DeepPink", "MediumVioletRed", "PaleVioletRed", "Red"]
    }
    else if(selectedOption == "Blue"){
        result = ['Aqua', "LightCyan", "Aquamarine", "Navy", "DarkTurquoise", "DeepSkyBlue", "Blue"]
    }
    else {
        result = ['cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'];
    }

    return result;
}

function newGame() {
    clearAll();

    renderInterval = setInterval( render, 0 );
    init();
    newShape();
    lose = false;

    var checkboxInstant = document.getElementById("instantCheck").checked;
    if(checkboxInstant){
        while(lose == false){
            tick();
        }
        render();
    }
    else{
        interval = setInterval( tick, 0 );
    }
}

// Controller
document.body.onkeydown = function( e ) {
    var keys = {
        37: 'left',
        39: 'right',
        40: 'down',
        38: 'rotate',
        32: 'drop'
    };
    if ( typeof keys[ e.keyCode ] != 'undefined' ) {
        keyPress( keys[ e.keyCode ] );
        render();
    }
};

var canvas = document.getElementsByTagName( 'canvas' )[ 0 ];
var ctx = canvas.getContext( '2d' );
var W = 0, H = 0;
W = pixelWidth;
H = pixelHeight;
var BLOCK_W = W / COLS, BLOCK_H = H / ROWS;


// draw a single square at (x, y)
function drawBlock( x, y ) {
    ctx.fillRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
    ctx.strokeRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1 , BLOCK_H - 1 );
}

// draws the board and the moving shape
function render() {
    ctx.clearRect( 0, 0, W, H );

    ctx.strokeStyle = 'black';
    for ( var x = 0; x < COLS; ++x ) {
        for ( var y = 0; y < ROWS; ++y ) {
            if ( board[ y ][ x ] ) {
                ctx.fillStyle = colors[ board[ y ][ x ] - 1 ];
                drawBlock( x, y );
            }
        }
    }

    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'black';
    for ( var y = 0; y < 4; ++y ) {
        for ( var x = 0; x < 4; ++x ) {
            if ( current[ y ][ x ] ) {
                ctx.fillStyle = colors[ current[ y ][ x ] - 1 ];
                drawBlock( currentX + x, currentY + y );
            }
        }
    }
}