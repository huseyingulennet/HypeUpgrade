//©HYPEUPGRADETR (based multible sources, modified and optimised by HYPEUPGRADETR)
//@version=5

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║ DayofWeek                                                                    ║
// ║ Market sessions                                                              ║
// ║ Key Levels                                                                   ║
// ║ RSI Candles                                                                  ║
// ║ Dynamic Imbalance                                                            ║
// ║                                                                              ║
// ║ developer : HYPEUPGRADETR                                                    ║
// ║ creators  : HYPEUPGRADETR, SpacemanBTC, crypto_kai, glaz, twingall           ║
// ║                                                                              ║
// ║ This source code is subject to the terms of the Mozilla Public License 2.0   ║
// ║ at https://mozilla.org/MPL/2.0/                                              ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// ╔══════════════════════════════════════╗
// ║                                      ║
// ║     colors                           ║
// ║                                      ║
// ╚══════════════════════════════════════╝

// v3 Style Gradient
GRN01 = #7CFC00, GRN02 = #32CD32, GRN03 = #228B22, GRN04 = #006400, GRN05 = #008000, GRN06=#093507
RED01 = #FF4500, RED02 = #FF0000, RED03 = #B22222, RED04 = #8B0000, RED05 = #800000, RED06=#330d06

// ──────────[ v3 Style Colors ]
//AQUA    = #00FFFF
//BLACK   = #000000
//BLUE    = #0000FF
//FUCHSIA = #FF00FF
//GRAY    = #808080
//GREEN   = #008000
//LIME    = #00FF00
//MAROON  = #800000
//NAVY    = #000080
//OLIVE   = #808000
//ORANGE  = #FF7F00
//PURPLE  = #800080
//RUBI    = #FF0000
//SILVER  = #C0C0C0
//TEAL    = #008080
//YELLOW  = #FFFF00
//WHITE   = #FFFFFF

// ╔══════════════════════════════════════╗
// ║                                      ║
// ║     indicator functions              ║
// ║                                      ║
// ╚══════════════════════════════════════╝

indicator('HYPEUPGRADETR 5', overlay=true, max_boxes_count=500, max_lines_count=500, max_labels_count = 500)

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main start (fib levels)                                                  ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

import PineCoders/VisibleChart/4 as chart

// Colors 
color BLACK   = color.black
color GRAY    = color.gray
color RED     = color.red
color ORANGE  = color.orange
color TEAL    = color.teal
color RUBY    = #e91e63
color AQUA    = color.aqua
color BLUE    = color.blue
color GREEN   = color.green
color PURPLE  = color.purple
color LIME    = color.lime
color FUCHSIA = color.fuchsia

// Line Type 
string TY01 = " ─ Line"
string TY02 = " ┄ Dashed line"
string TY03 = " ┉ Dotted line"

// Fib level type
string LV01  = "Values" 
string LV02  = "Percent" 

// Fib calculation type
string FT01  = "Visible Chart Range" 
string FT02  = "Visible Zig Zag"

// Label placement 
string LB01  = "Left"
string LB02  = "Center"
string LB03  = "Right"
string LB04  = "Top"
string LB05  = "Middle"
string LB06  = "Bottom"

// Label Size
string SZ01  = "tiny"
string SZ02  = "small"
string SZ03  = "normal"
string SZ04  = "large"
string SZ05  = "huge"

// Tool Tips 
string TT_FT = "Choose from 2 calculation types:
 \n\n• 'Visible Chart Range' \nCalculates the Fibonacci retracement based on the high and low of the visible chart range.
 \n\n• 'Visible Zig Zag' \nCalculates the Fibonacci retracement based on zig zag pivots within the visible chart range."
string TT_ZZ = "Show Zig Zag lines when the 'Visible Zig Zag' display type is enabled."
string TT_MP = "When enabled, adds a pivot in the opposite direction if a new pivot is not found in the number of bars in the 'Pivot Length'."
string TT_PL = "Number of bars back to track pivots (ex. Highest point in 50 bars)."
string TT_ZA = "Your choices here dictate the Zig Zag line color, line width, and line style."
string TT_LP = "Places the fib retracement on the nth pivot point back from the last visible pivot."


string GRP2              = "Fib Levels"
bool   trendLineInput    = input.bool(true,    "Trend Line",                group = GRP2, inline = "10", group="/// FIB LEVELS ///")
color  trendColorInput   = input.color(BLACK,  "",                          group = GRP2, inline = "10", group="/// FIB LEVELS ///")
int    trendWidthInput   = input.int(1,        "",                          group = GRP2, inline = "10", minval  = 1, group="/// FIB LEVELS ///")
string trendStyleInput   = input.string(TY02,  "",                          group = GRP2, inline = "10", options = [TY01, TY02, TY03], group="/// FIB LEVELS ///")
int    levelsWidthInput  = input.int(1,        "Levels Line",               group = GRP2, inline = "11", minval  = 1, group="/// FIB LEVELS ///")
string fibStyleInput     = input.string(TY01,  "",                          group = GRP2, inline = "11", options = [TY01, TY02, TY03], group="/// FIB LEVELS ///")
string extStyleInput     = input.string(TY03,  "",                          group = GRP2, inline = "11", options = [TY01, TY02, TY03], group="/// FIB LEVELS ///")
bool   show000Input      = input.bool(true,    "",                          group = GRP2, inline = "20", group="/// FIB LEVELS ///")
float  level000Input     = input.float(0,      "",                          group = GRP2, inline = "20", group="/// FIB LEVELS ///")
color  color000Input     = input.color(BLACK,  "",                          group = GRP2, inline = "20", group="/// FIB LEVELS ///")
bool   show236Input      = input.bool(true,    "",                          group = GRP2, inline = "20", group="/// FIB LEVELS ///")
float  level236Input     = input.float(0.236,  "",                          group = GRP2, inline = "20", group="/// FIB LEVELS ///")
color  color236Input     = input.color(BLACK,  "",                          group = GRP2, inline = "20", group="/// FIB LEVELS ///")
bool   show382Input      = input.bool(true,    "",                          group = GRP2, inline = "21", group="/// FIB LEVELS ///")
float  level382Input     = input.float(0.382,  "",                          group = GRP2, inline = "21", group="/// FIB LEVELS ///")
color  color382Input     = input.color(BLACK,  "",                          group = GRP2, inline = "21", group="/// FIB LEVELS ///")
bool   show500Input      = input.bool(true,    "",                          group = GRP2, inline = "21", group="/// FIB LEVELS ///")
float  level500Input     = input.float(0.5,    "",                          group = GRP2, inline = "21", group="/// FIB LEVELS ///")
color  color500Input     = input.color(BLACK,  "",                          group = GRP2, inline = "21", group="/// FIB LEVELS ///")
bool   show618Input      = input.bool(true,    "",                          group = GRP2, inline = "22", group="/// FIB LEVELS ///")
float  level618Input     = input.float(0.618,  "",                          group = GRP2, inline = "22", group="/// FIB LEVELS ///")
color  color618Input     = input.color(BLACK,  "",                          group = GRP2, inline = "22", group="/// FIB LEVELS ///")
bool   show786Input      = input.bool(true,    "",                          group = GRP2, inline = "22", group="/// FIB LEVELS ///")
float  level786Input     = input.float(0.786,  "",                          group = GRP2, inline = "22", group="/// FIB LEVELS ///")
color  color786Input     = input.color(BLACK,  "",                          group = GRP2, inline = "22", group="/// FIB LEVELS ///")
bool   show100Input      = input.bool(true,    "",                          group = GRP2, inline = "23", group="/// FIB LEVELS ///")
float  level100Input     = input.float(1,      "",                          group = GRP2, inline = "23", group="/// FIB LEVELS ///")
color  color100Input     = input.color(BLACK,  "",                          group = GRP2, inline = "23", group="/// FIB LEVELS ///")
bool   show161Input      = input.bool(true,    "",                          group = GRP2, inline = "23", group="/// FIB LEVELS ///")
float  level161Input     = input.float(0.705,  "",                          group = GRP2, inline = "23", group="/// FIB LEVELS ///")
color  color161Input     = input.color(BLACK,  "",                          group = GRP2, inline = "23", group="/// FIB LEVELS ///")
bool   show261Input      = input.bool(true,    "",                          group = GRP2, inline = "24", group="/// FIB LEVELS ///")
float  level261Input     = input.float(-0.27,  "",                          group = GRP2, inline = "24", group="/// FIB LEVELS ///")
color  color261Input     = input.color(BLACK,  "",                          group = GRP2, inline = "24", group="/// FIB LEVELS ///")
bool   show361Input      = input.bool(true,    "",                          group = GRP2, inline = "24", group="/// FIB LEVELS ///")
float  level361Input     = input.float(-0.62,  "",                          group = GRP2, inline = "24", group="/// FIB LEVELS ///")
color  color361Input     = input.color(BLACK,  "",                          group = GRP2, inline = "24", group="/// FIB LEVELS ///")
bool   show423Input      = input.bool(true,    "",                          group = GRP2, inline = "25", group="/// FIB LEVELS ///")
float  level423Input     = input.float(-1,     "",                          group = GRP2, inline = "25", group="/// FIB LEVELS ///")
color  color423Input     = input.color(BLACK,  "",                          group = GRP2, inline = "25", group="/// FIB LEVELS ///")
bool   show127Input      = input.bool(true,    "",                          group = GRP2, inline = "25", group="/// FIB LEVELS ///")
float  level127Input     = input.float(0.889,  "",                          group = GRP2, inline = "25", group="/// FIB LEVELS ///")
color  color127Input     = input.color(BLACK,  "",                          group = GRP2, inline = "25", group="/// FIB LEVELS ///")
bool   show141Input      = input.bool(true,    "",                          group = GRP2, inline = "26", group="/// FIB LEVELS ///")
float  level141Input     = input.float(-0.5,   "",                          group = GRP2, inline = "26", group="/// FIB LEVELS ///")
color  color141Input     = input.color(BLACK,  "",                          group = GRP2, inline = "26", group="/// FIB LEVELS ///")
bool   show227Input      = input.bool(false,   "",                          group = GRP2, inline = "26", group="/// FIB LEVELS ///")
float  level227Input     = input.float(2.272,  "",                          group = GRP2, inline = "26", group="/// FIB LEVELS ///")
color  color227Input     = input.color(BLACK,  "",                          group = GRP2, inline = "26", group="/// FIB LEVELS ///")
bool   show241Input      = input.bool(false,   "",                          group = GRP2, inline = "27", group="/// FIB LEVELS ///")
float  level241Input     = input.float(2.414,  "",                          group = GRP2, inline = "27", group="/// FIB LEVELS ///")
color  color241Input     = input.color(BLACK,  "",                          group = GRP2, inline = "27", group="/// FIB LEVELS ///")
bool   show200Input      = input.bool(false,   "",                          group = GRP2, inline = "27", group="/// FIB LEVELS ///")
float  level200Input     = input.float(2,      "",                          group = GRP2, inline = "27", group="/// FIB LEVELS ///")
color  color200Input     = input.color(BLACK,  "",                          group = GRP2, inline = "27", group="/// FIB LEVELS ///")
bool   show300Input      = input.bool(false,   "",                          group = GRP2, inline = "28", group="/// FIB LEVELS ///")
float  level300Input     = input.float(3,      "",                          group = GRP2, inline = "28", group="/// FIB LEVELS ///")
color  color300Input     = input.color(BLACK,  "",                          group = GRP2, inline = "28", group="/// FIB LEVELS ///")
bool   show327Input      = input.bool(false,   "",                          group = GRP2, inline = "28", group="/// FIB LEVELS ///")
float  level327Input     = input.float(3.272,  "",                          group = GRP2, inline = "28", group="/// FIB LEVELS ///")
color  color327Input     = input.color(BLACK,  "",                          group = GRP2, inline = "28", group="/// FIB LEVELS ///")
bool   useFillInput      = input.bool(false,   "Background",                group = GRP2, inline = "32", group="/// FIB LEVELS ///")
int    bgTranspInput     = input.int(90,       "",                          group = GRP2, inline = "32", group="/// FIB LEVELS ///")
bool   invertFibInput    = input.bool(false,   "Reverse",                   group = GRP2, group="/// FIB LEVELS ///")
bool   useLogScaleInput  = input.bool(false,   "Log scale Fibs",            group = GRP2, group="/// FIB LEVELS ///")


bool   extendRtInput     = input.bool(true,    "Extend to real time",       group = GRP2, group="/// FIB LEVELS UZATMA ///")
bool   extendRightInput  = input.bool(false,   "Extend lines right",        group = GRP2, group="/// FIB LEVELS UZATMA ///")
bool   extendLeftInput   = input.bool(false,   "Extend lines left",         group = GRP2, group="/// FIB LEVELS UZATMA ///")

string GRP3              = "Labels"
bool   showPricesInput   = input.bool(false,    "Prices",                    group = GRP3, group="/// FIB LEVELS METİN EDİTÖRÜ ///")
bool   showLevelsInput   = input.bool(true,    "Levels",                    group = GRP3, inline = "40", group="/// FIB LEVELS METİN EDİTÖRÜ ///")
string levelTypeInput    = input.string(LV01,  "",                          group = GRP3, inline = "40", options = [LV01, LV02], group="/// FIB LEVELS METİN EDİTÖRÜ ///")
string labelXInput       = input.string(LB03,  "Fib Labels",                group = GRP3, inline = "41", options = [LB01, LB02, LB03], group="/// FIB LEVELS METİN EDİTÖRÜ ///")
string labelYInput       = input.string(LB04,  "",                          group = GRP3, inline = "41", options = [LB04, LB05, LB06], group="/// FIB LEVELS METİN EDİTÖRÜ ///")
string labelSizeInput    = input.string(SZ02,  "",                          group = GRP3, inline = "41", options = [SZ01, SZ02, SZ03, SZ04, SZ05], group="/// FIB LEVELS METİN EDİTÖRÜ ///")
bool   tLabelsInput      = input.bool(false,    "Time Labels",              group = GRP3, inline = "42", group="/// FIB LEVELS METİN EDİTÖRÜ ///")
string tLabelSizeInput   = input.string(SZ03,  "",                          group = GRP3, inline = "42", options = [SZ01, SZ02, SZ03, SZ04, SZ05], group="/// FIB LEVELS METİN EDİTÖRÜ ///")
//#endregion

// Inputs
string fibTypeInput      = input.string(FT01,  "Fib Calculation Type",      options = [FT01, FT02],      tooltip = TT_FT, group="/// FIB LEVELS HESAPLAMA ///")

string GRP1              = "Visible ZigZag"
bool   showZZInput       = input.bool(true,    "Show Zig Zag",              group = GRP1, inline = "00", tooltip = TT_ZZ, group="/// FIB LEVELS HESAPLAMA ///")
bool   addPivotInput     = input.bool(true,    "Detect additional pivots",  group = GRP1, inline = "01", tooltip = TT_MP, group="/// FIB LEVELS HESAPLAMA ///")
int    lengthInput       = input.int(50,       "   Pivot Length",           group = GRP1, minval = 1,    tooltip = TT_PL, group="/// FIB LEVELS HESAPLAMA ///")
color  zzBullColorInput  = input.color(GRAY,   "   ",                       group = GRP1, inline = "02", group="/// FIB LEVELS HESAPLAMA ///")
color  zzBearColorInput  = input.color(GRAY,   "",                          group = GRP1, inline = "02", group="/// FIB LEVELS HESAPLAMA ///")
int    zzwidthInput      = input.int(2,        "",                          group = GRP1, inline = "02", minval  = 1, group="/// FIB LEVELS HESAPLAMA ///")
string zzStyleInput      = input.string(TY03,  "",                          group = GRP1, inline = "02", tooltip = TT_ZA, options = [TY01, TY02, TY03], group="/// FIB LEVELS HESAPLAMA ///")
int    pivotInput        = input.int(1,        "   nth Last Pivot",         group = GRP1, minval = 0,    tooltip = TT_LP, group="/// FIB LEVELS HESAPLAMA ///")



//#region ———————————————————— User-defined Types


// @type                A coordinate in price and time.   
// @field y             A value on the Y axis (price).     
// @field x             A value on the X axis (time). 
type point 
    float y
    int   x 


// @type                A level of significance used to determine directional movement or potential support and resistance.
// @field start         The coordinate of the previous `pivotPoint`.
// @field end           The coordinate of the current `pivotPoint`.
// @field dir           Direction of movement of the `pivotPoint`. A value of 1 is used for an upward direction, -1 for downward. 
// @field ln            A line object connecting the `start` to the `end`. 
// @field bars          Number of bars in the pivot. Default is 0 bars. 
type pivotPoint
    point start
    point end
    int   dir
    line  ln
    int   bars = 0


// @type                Horizontal levels that indicate possible support and resistance where price could potentially reverse direction.
// @field level         A Fibonacci ratio as a decimal. 
// @field fibColor      A color for the lines and labels.
// @field fibLine       A line object for the main fib level. 
// @field extLine       A line object for the fib level that is extended from the last pivot to the last bar. 
// @field fibLabel      A label to display the `level` at the `fibLine`.
type fibLevel
    float level
    color fibColor
    line  fibLine
    line  extLine 
    label fibLabel
//#endregion



//#region ———————————————————— Global Variables

// Arrays for lines, labels, and colors. 
var array<float>    levels      = array.new<float>()
var array<fibLevel> fibLevels   = array.new<fibLevel>()
var array<int>      sortedArray = array.new<int>()

// Set line extension type.
string extendExt = extendRightInput ? extend.right : extend.none
string extendFib = switch
    not extendRtInput and extendLeftInput and extendRightInput => extend.both 
    not extendRtInput and extendRightInput => extend.right
    extendLeftInput => extend.left 
    => extend.none

// Label display conditions.
bool   showLabels  = showPricesInput or showLevelsInput
bool   showPercent = levelTypeInput == LV02
string labelStyle  = switch 
    labelYInput == LB04 and labelXInput == LB01 => label.style_label_lower_right
    labelYInput == LB05 and labelXInput == LB01 => label.style_label_right
    labelYInput == LB06 and labelXInput == LB01 => label.style_label_upper_right
    labelYInput == LB04 and labelXInput == LB02 => label.style_label_down
    labelYInput == LB05 and labelXInput == LB02 => label.style_label_center
    labelYInput == LB06 and labelXInput == LB02 => label.style_label_up
    labelYInput == LB04 and labelXInput == LB03 => label.style_label_lower_left 
    labelYInput == LB05 and labelXInput == LB03 => label.style_label_left 
    labelYInput == LB06 and labelXInput == LB03 => label.style_label_upper_left 

// Determine display type. 
bool useZigZag = fibTypeInput == FT02
//#endregion



//#region ———————————————————— Functions 


// @function            Converts a value from exponential to logarithmic form.
// @param value         (series float) The value to convert to log. 
// @returns             (float) The log value. 
toLog(series float value) =>
    float exponent = math.abs(value)
    float product  = math.log10(exponent + 0.0001) + 4
    float result   = exponent < 1e-8 ? 0 : value < 0 ? - product : product
    

// @function            Converts a value from logarithmic to exponential form.
// @param value         (series float) The value to convert from log.
// @returns             (float) The exponential value. 
fromLog(series float value) =>
    float exponent = math.abs(value)
    float product  = math.pow(10, exponent - 4) - 0.0001
    float result   = exponent < 1e-8 ? 0 : value < 0 ? - product : product


// @function            Determines a fib price based on the chart's high and low price dependant on if the fib retracement is bullish or bearish. Converts to log scale when dictated by user-selection.  
// @param value         (series float) Fib level in decimal form. 
// @param hiPrice       (series float) Retracement high. 
// @param loPrice       (series float) Retracement low. 
// @param isBull        (series bool) Condition determining if the retracement is bullish. 
// @returns             (float) The fib price. 
getPrice(series float value, series float hiPrice, series float loPrice, series bool isBull) =>
    float hiPoint  = useLogScaleInput ? toLog(hiPrice) : hiPrice
    float loPoint  = useLogScaleInput ? toLog(loPrice) : loPrice
    float fibPrice = 
     isBull and invertFibInput or not isBull and not invertFibInput ? 
     loPoint + ((hiPoint - loPoint) * value) : 
     hiPoint - ((hiPoint - loPoint) * value)
    float result = useLogScaleInput ? fromLog(fibPrice) : fibPrice


// @function            Determines a line style based on a user defined input string matching one of the `TY*` constants. 
// @param styleString   (series string) Input string. 
// @returns             (string) A string in `line.style*` format. 
lineStyle(simple string styleString) =>
    string result = switch styleString
        TY01 => line.style_solid
        TY02 => line.style_dashed
        TY03 => line.style_dotted


// @function            Populates global arrays with a `fibLevel` object and fib value when the corresponding input condition is selected. 
// @param condition     (simple bool) Condition to determine if the fib level is to be displayed. 
// @param value         (simple float) Value of the user-defined fib level. 
// @param color         (series color) Color for the fib line and label. 
// @returns             (void) Function has no return.  
populate(simple bool condition, simple float value, series color color) => 
    if condition
        fibLevel fib = fibLevel.new(value, color)
        fib.fibLine      := line.new(na, na, na, na, xloc.bar_time, extendFib, color, lineStyle(fibStyleInput), levelsWidthInput)
        if extendRtInput
            fib.extLine  := line.new(na, na, na, na, xloc.bar_time, extendExt, color, lineStyle(extStyleInput), levelsWidthInput)
        if showLabels
            fib.fibLabel := label.new(na, na, "",    xloc.bar_time, yloc.price, color(na), labelStyle, color, labelSizeInput)
        array.push(levels, value)
        array.push(fibLevels, fib)


// @function            Sets a linefill object between each fibLevel object. 
// @returns             (void) Function has no return. 
setBg() =>
    line temp1 = na
    line temp2 = na
    for sortedIndex in sortedArray
        fibLevel fib = array.get(fibLevels, sortedIndex)
        color fillColor = color.new(fib.fibColor, bgTranspInput)
        if not na(temp1)
            linefill.new(temp1, fib.fibLine, fillColor)
            if extendRtInput
                linefill.new(temp2, fib.extLine, fillColor)
        temp1 := fib.fibLine
        temp2 := fib.extLine


// @function            Determines a string for use within a fib label. The text will contain the fib price/percent and/or the fib level dependant on user selections for "Prices" and "Levels".
// @param value         (series float) The fib level from one of the `level*Input` user selections. 
// @param price         (series float) The corresponding price level for the fib level. 
// @returns             (string) A string containing the fib `value` and/or the fib `price`. 
labelText(series float value, series float price) =>
    string levelString = showPercent ? str.tostring(value * 100, format.percent) : str.format("{0, number, #.###}", value)
    string result = switch 
        showPricesInput and showLevelsInput => str.format("{0}({1})", levelString, str.tostring(price, format.mintick))
        showPricesInput                     => str.format("({0})", str.tostring(price, format.mintick))
        showLevelsInput                     => levelString


// @function            Determines a X time coordinate in UNIX time for fib labels dependant on the user's location selection of "Labels", and the `LB*` constants. 
// @returns             (int) A time for fib labels. 
labelTime(series int leftTime, series int rightTime) =>
    int result = switch labelXInput
        LB01 => leftTime
        LB02 => int(math.avg(leftTime, extendRtInput ? chart.right_visible_bar_time : rightTime))
        LB03 => extendRtInput ? chart.right_visible_bar_time : rightTime


// @function            Produces a label with the formatted time and price for the point it is placed. Continues to update the location and text on each bar. 
// @param x             (series int) Bar UNIX time of the label position. 
// @param y             (series float) Price of the label position.
// @param color         (simple color) Color for the text and label.  
// @param style         (series string) Label style. Accepts one of the `label.style_*` built-in constants. 
// @returns             (void) Function has no return. 
timeLabel(series int x, series float y, simple color color, series string style) =>
    var label timeLabel = label.new(na, na, na, xloc.bar_time, yloc.price, color.new(color, 80), style, color, tLabelSizeInput)
    label.set_xy(timeLabel, x, y)
    label.set_text(timeLabel, str.format("{0}\n{1,time, dd/MM/yy @ HH:mm:ss}", str.tostring(y, format.mintick), x))


// @function            Produces a line object that sets it's bar time and price on each bar.
// @param x1            (series int) bar UNIX time of the first point of the line.
// @param y1            (series float) Price of the first point of the line.
// @param x2            (series int) bar UNIX time of the second point of the line.
// @param y2            (series float) Price of the second point of the line.
// @returns             (void) Function has no return. 
hiLoLine(series int x1, series float y1, series int x2, series float y2) =>
    var line hiLoLine = line.new(na, na, na, na, xloc.bar_time, extend.none, trendColorInput, lineStyle(trendStyleInput), trendWidthInput)
    line.set_xy1(hiLoLine, x1, y1)
    line.set_xy2(hiLoLine, x2, y2)


// @function            Updates price and time of `fibLevel`s and label text. 
// @param leftTime      (series int) bar UNIX time of the first point of the fib retracement.
// @param rightTime     (series int) bar UNIX time of the second point of the fib retracement.
// @param hiPrice       (series float) Price of the high point of the fib retracement.
// @param loPrice       (series float) Price of the low point of the fib retracement.
// @param isBull        (series bool) Condition to determine if the retracement is bullish. 
// @returns             (void) Function has no return. 
setLevels(series int leftTime, series int rightTime, series float hiPrice, series float loPrice, series bool isBull) =>
    int labelTime = labelTime(leftTime, rightTime)
    for fib in fibLevels
        float fibPrice = getPrice(fib.level, hiPrice, loPrice, isBull)
        line.set_xy1(fib.fibLine, leftTime,  fibPrice)
        line.set_xy2(fib.fibLine, rightTime, fibPrice)
        if extendRtInput
            line.set_xy1(fib.extLine, rightTime, fibPrice)
            line.set_xy2(fib.extLine, chart.right_visible_bar_time, fibPrice)
        if showLabels
            label.set_xy(fib.fibLabel, labelTime, fibPrice)
            label.set_text(fib.fibLabel, labelText(fib.level, fibPrice))


// @function            Adds a `value` to the begining of the `id` array, while removing from the end of the array if the array size exceeds the `max` size. 
// @param id            (any array type) An array object.
// @param max           (simple int) The maximum size of the array. 
// @param value         (series <type of the array's elements>) The value to add to the start of the array.
// @returns             (void) Function has no return. 
addToArray(id, simple int max, value) =>  
    array.unshift(id, value)   
    if array.size(id) > max
        array.pop(id)


// @function            Creates and adds a new "pivotPoint" object to the `pivotArray` when a change in `dir` is detected. Sets a line between the new and previous pivot points when "show zigzag" is enabled.             
// @param length        (simple int) Number of bars to search for a "pivotPoint".
// @param pivotArray    (array<pivotPoint>) An array of "pivotPoints". 
// @param addPivots     (simple bool) Condition to search for additonal pivots, Adds a pivot in the opposite direction if a pivot is not found in `length` bars. Default is true. 
// @returns             (void) Function has no return.     
addPivot(simple int length, array<pivotPoint> pivotArray, simple bool addPivots = true) =>
    pivotPoint piv  = array.get(pivotArray, 0)
    int   altLen    = math.max(piv.bars, 1)
    int   hiBar     = ta.highestbars(length)
    int   loBar     = ta.lowestbars(length)
    int   altHiBar  = ta.highestbars(altLen)
    int   altLoBar  = ta.lowestbars(altLen)
    float altHi     = ta.highest(altLen)
    float altLo     = ta.lowest(altLen)
    bool  missedPiv = piv.bars >= length and addPivots and not (hiBar == 0 and high > piv.end.y or loBar == 0 and low < piv.end.y) 
    var int dir = na
    dir := switch
        missedPiv => nz(dir, altHiBar < altLoBar ? 1 : -1) * -1
        hiBar + loBar == 0 => dir * -1 
        hiBar == 0 =>  1 
        loBar == 0 => -1 
        => dir
    if dir != dir[1] and time <= chart.right_visible_bar_time
        [hiLo, altHiLo, offset, lineColor] = switch
            dir > 0 => [high, altHi, altHiBar, zzBullColorInput] 
            =>         [low,  altLo, altLoBar, zzBearColorInput] 
        [pivY, bars] = switch
            missedPiv => [altHiLo, math.abs(offset)]
            =>           [hiLo, 0]
        point newPoint   = point.new(pivY, time[bars])
        pivotPoint pivot = pivotPoint.new(piv.end, newPoint, dir, bars = bars) 
        if showZZInput and time >= chart.left_visible_bar_time
            pivot.ln := line.new(piv.end.x, piv.end.y, time[bars], pivY, 
              xloc.bar_time, extend.none, lineColor, lineStyle(zzStyleInput), zzwidthInput)
        addToArray(pivotArray, math.max(3, pivotInput + 1), pivot)


// @function            Updates the price and time of the developing "pivotPoint" if the latest calculated "point" exceeds the last committed value.
// @param length        (simple int) Number of bars to search for a "pivotPoint".
// @param pivotArray    (array<pivotPoint>) An array of "pivotPoints". 
// @returns             (void) Function has no return. 
updatePivot(simple int length, array<pivotPoint> pivotArray) =>
    if time <= chart.right_visible_bar_time
        pivotPoint piv = array.get(pivotArray, 0)
        int   dir  = piv.dir 
        float hiLo = dir > 0 ? high : low
        piv.bars  += 1
        if hiLo * dir > piv.end.y * dir 
            piv.end.y := hiLo
            piv.end.x := time
            piv.bars  := 0
            if showZZInput and time >= chart.left_visible_bar_time
                if na(piv.ln) 
                    color lineColor = dir > 0 ? zzBullColorInput : zzBearColorInput
                    piv.ln := line.new(piv.start.x, piv.start.y, time, hiLo, 
                     xloc.bar_time, extend.none, lineColor, lineStyle(zzStyleInput), zzwidthInput)
            line.set_xy2(piv.ln, time, hiLo)


// @function            Calculates Zig Zag based on pivots formed over the lookback `length`. 
// @param length        (simple int) Number of bars to search for a "pivotPoint".
// @param addPivots     (simple bool) Condition to search for additonal pivots, Adds a pivot in the opposite direction if a pivot is not found in `length` bars. Default is true. 
// @returns             (array<pivotPoint>) An array of "pivotPoint" objects.      
zigZag(simple int length, simple bool addPivots = true) =>
    var array<pivotPoint> pivots = array.new<pivotPoint>(1, pivotPoint.new(point.new(close), point.new(close)))
    updatePivot(length, pivots)
    addPivot(length, pivots, addPivots)
    pivots


// @function            Renders a start "point" and end "point" for the `nthPivot` back in the visible range when "Use zig zag" is enabled, and returns the 2 coordinates as a tuple. 
// @param nthPivot      (simple int) The nth pivot. 
// @returns             ([int, float, int, float]) The start point time, the start point price, the end point time, the end point price. 
findHiLo(simple int nthPivot) => 
    int   leftX  = na  
    float leftY  = na  
    int   rightX = na  
    float rightY = na  
    if useZigZag
        array<pivotPoint> pivotArray = zigZag(lengthInput, addPivotInput)
        if barstate.islast 
            pivotPoint pivot = array.get(pivotArray, nthPivot)
            leftX  := pivot.start.x  
            leftY  := pivot.start.y  
            rightX := pivot.end.x
            rightY := pivot.end.y
            if showZZInput
                line.set_style(pivot.ln, lineStyle(trendStyleInput))
    [leftX, leftY, rightX, rightY]
//#endregion



//#region ———————————————————— Calculations 


// Determine pivot points when "use zig zag" is enabled. 
[leftX, leftY, rightX, rightY] = findHiLo(pivotInput)


// Fib high and low values and their time x-coordinate. 
bool  zzBull    = leftY < rightY
float chartHigh = useZigZag ? math.max(leftY,   rightY) : chart.high()
float chartLow  = useZigZag ? math.min(leftY,   rightY) : chart.low()
int   hiTime    = useZigZag ? zzBull ? rightX : leftX   : chart.highBarTime()
int   loTime    = useZigZag ? zzBull ? leftX  : rightX  : chart.lowBarTime()
bool  isBull    = useZigZag ? zzBull : loTime < hiTime
int   leftTime  = math.min(hiTime, loTime)
int   rightTime = math.max(hiTime, loTime)

// Determine label style for time labels. 
string hiTimeStyle = isBull ? label.style_label_lower_right : label.style_label_lower_left
string loTimeStyle = isBull ? label.style_label_upper_left  : label.style_label_upper_right

// Create fibLevel objects on first bar, populate levels array, create sortedArray for object sorting. 
if barstate.isfirst
    populate(show000Input, level000Input, color000Input)
    populate(show236Input, level236Input, color236Input)
    populate(show382Input, level382Input, color382Input)
    populate(show500Input, level500Input, color500Input)
    populate(show618Input, level618Input, color618Input)
    populate(show786Input, level786Input, color786Input)
    populate(show100Input, level100Input, color100Input)
    populate(show161Input, level161Input, color161Input)
    populate(show261Input, level261Input, color261Input)
    populate(show361Input, level361Input, color361Input)
    populate(show423Input, level423Input, color423Input)
    populate(show127Input, level127Input, color127Input)
    populate(show141Input, level141Input, color141Input)
    populate(show227Input, level227Input, color227Input)
    populate(show241Input, level241Input, color241Input)
    populate(show200Input, level200Input, color200Input)
    populate(show300Input, level300Input, color300Input)
    populate(show327Input, level327Input, color327Input)
    sortedArray := array.sort_indices(levels)
    if useFillInput
        setBg()

// Set fibLevel properties on last bar. Draw time labels and hi/lo line. 
if barstate.islast
    setLevels(leftTime, rightTime, chartHigh, chartLow, isBull)
    if tLabelsInput
        timeLabel(hiTime, chartHigh, LIME,    hiTimeStyle)
        timeLabel(loTime, chartLow,  FUCHSIA, loTimeStyle)
    if trendLineInput and not (showZZInput and useZigZag)
        hiLoLine(hiTime, chartHigh, loTime, chartLow)
//#endregion

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main finish (fib levels)                                                 ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main start (market day)                                                  ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

show_monday = input.bool(false, "Monday-Pazartesi", group="/// MARKET DAYS ///")
show_tuesday = input.bool(false, "Tuesday-Salı", group="/// MARKET DAYS ///")
show_wednesday = input.bool(false, "Wednesday-Çarşamba", group="/// MARKET DAYS ///")
show_thursday = input.bool(false, "Thursday-Perşembe", group="/// MARKET DAYS ///")
show_friday = input.bool(false, "Friday-Cuma", group="/// MARKET DAYS ///")
show_saturday = input.bool(true, "Saturday-Cumartesi", group="/// MARKET DAYS ///")
show_sunday = input.bool(true, "Sunday-Pazar", group="/// MARKET DAYS ///")
transp = input.int(95, "Transp", minval=0, maxval=100, group="/// MARKET DAYS ///")

c_monday = color.new(color.rgb(125, 205, 111), transp)
c_tuesday = color.new(color.rgb(125, 205, 111), transp)
c_wednesday = color.new(color.rgb(125, 205, 111), transp)
c_thursday = color.new(color.rgb(125, 205, 111), transp)
c_friday = color.new(color.rgb(125, 205, 111), transp)
c_saturday = color.new(color.blue, transp)
c_sunday = color.new(color.purple, transp)

day = dayofweek
monday = dayofweek.monday
tuesday = dayofweek.tuesday
wednesday = dayofweek.wednesday
thursday = dayofweek.thursday
friday = dayofweek.friday
saturday = dayofweek.saturday
sunday = dayofweek.sunday
bgcolor(show_monday and day == monday ? c_monday : na, title="Monday-Pazartesi")
bgcolor(show_tuesday and day == tuesday ? c_tuesday : na, title="Tuesday-Salı")
bgcolor(show_wednesday and day == wednesday ? c_wednesday : na, title="Wednesday-Çarşamba")
bgcolor(show_thursday and day == thursday ? c_thursday : na, title="Thursday-Perşembe")
bgcolor(show_friday and day == friday ? c_friday : na, title="Friday-Cuma")
bgcolor(show_saturday and day == saturday ? c_saturday : na, title="Saturday-Cumartesi")
bgcolor(show_sunday and day == sunday ? c_sunday : na, title="Sunday-Pazar")

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main finish (market day)                                                 ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main start (rsi candle)                                                  ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

src = close
len = input.int(14, minval=1, title='Length', group="/// RSI OVERCANDLE ///")
up = ta.rma(math.max(ta.change(src), 0), len)
down = ta.rma(-math.min(ta.change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - 100 / (1 + up / down)

//coloring method below

src1 = close
len1 = input.int(70, minval=1, title='UpLevel', group="/// RSI OVERCANDLE ///")
src2 = close
len2 = input.int(30, minval=1, title='DownLevel', group="/// RSI OVERCANDLE ///")
isup() =>
    rsi > len1
isdown() =>
    rsi < len2
isdown_1 = isdown()
barcolor(isup() ? color.yellow : isdown_1 ? color.yellow : na)

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main finish (rsi candle)                                                 ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main start (key levels)                                                  ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

displayStyle = input.string(defval='Right Anchored', title='Display Style', options=['Standard', 'Right Anchored'], inline='Display', group="/// KEY LEVELS ///")
mergebool = input.bool(defval=true, title='Merge Levels?', inline='Display', group="/// KEY LEVELS ///")
distanceright = input.int(defval=100, title='Distance', minval=5, maxval=500, inline='Dist', group="/// KEY LEVELS ///")
radistance = input.int(defval=30, title='Anchor Distance', minval=5, maxval=500, inline='Dist', group="/// KEY LEVELS ///")
labelsize = input.string(defval='Medium', title='Text Size', options=['Small', 'Medium', 'Large'], group="/// KEY LEVELS ///")
linesize = input.string(defval='Small', title='Line Width', options=['Small', 'Medium', 'Large'], inline='Line', group="/// KEY LEVELS ///")
linestyle = input.string(defval='Solid', title='Line Style', options=['Solid', 'Dashed', 'Dotted'], inline='Line', group="/// KEY LEVELS ///")

GlobalTextType = input.bool(defval=false, title='Global Text ShortHand', tooltip='Enable for shorthand text on all text', group="/// KEY LEVELS ///")
var globalcoloring = input.bool(defval=false, title='Global Coloring', tooltip='Enable for all color controls via one color', inline='GC', group="/// KEY LEVELS ///")
GlobalColor = input.color(title='', defval=color.white, inline='GC', group="/// KEY LEVELS ///")
//var show_tails = input(defval = false, title = "Always Show", type = input.bool)


[daily_time, daily_open] = request.security(syminfo.tickerid, 'D', [time, open], lookahead=barmerge.lookahead_on)
[dailyh_time, dailyh_open] = request.security(syminfo.tickerid, 'D', [time[1], high[1]], lookahead=barmerge.lookahead_on)
[dailyl_time, dailyl_open] = request.security(syminfo.tickerid, 'D', [time[1], low[1]], lookahead=barmerge.lookahead_on)

cdailyh_open = request.security(syminfo.tickerid, 'D', high, lookahead=barmerge.lookahead_on)
cdailyl_open = request.security(syminfo.tickerid, 'D', low, lookahead=barmerge.lookahead_on)
var monday_time = time
var monday_high = high
var monday_low = low

[weekly_time, weekly_open] = request.security(syminfo.tickerid, 'W', [time, open], lookahead=barmerge.lookahead_on)
[weeklyh_time, weeklyh_open] = request.security(syminfo.tickerid, 'W', [time[1], high[1]], lookahead=barmerge.lookahead_on)
[weeklyl_time, weeklyl_open] = request.security(syminfo.tickerid, 'W', [time[1], low[1]], lookahead=barmerge.lookahead_on)


[monthly_time, monthly_open] = request.security(syminfo.tickerid, 'M', [time, open], lookahead=barmerge.lookahead_on)
[monthlyh_time, monthlyh_open] = request.security(syminfo.tickerid, 'M', [time[1], high[1]], lookahead=barmerge.lookahead_on)
[monthlyl_time, monthlyl_open] = request.security(syminfo.tickerid, 'M', [time[1], low[1]], lookahead=barmerge.lookahead_on)


[quarterly_time, quarterly_open] = request.security(syminfo.tickerid, '3M', [time, open], lookahead=barmerge.lookahead_on)
[quarterlyh_time, quarterlyh_open] = request.security(syminfo.tickerid, '3M', [time[1], high[1]], lookahead=barmerge.lookahead_on)
[quarterlyl_time, quarterlyl_open] = request.security(syminfo.tickerid, '3M', [time[1], low[1]], lookahead=barmerge.lookahead_on)


[yearly_time, yearly_open] = request.security(syminfo.tickerid, '12M', [time, open], lookahead=barmerge.lookahead_on)
[yearlyh_time, yearlyh_open] = request.security(syminfo.tickerid, '12M', [time, high], lookahead=barmerge.lookahead_on)
[yearlyl_time, yearlyl_open] = request.security(syminfo.tickerid, '12M', [time, low], lookahead=barmerge.lookahead_on)


[intra_time, intra_open] = request.security(syminfo.tickerid, '240', [time, open], lookahead=barmerge.lookahead_on)
[intrah_time, intrah_open] = request.security(syminfo.tickerid, '240', [time[1], high[1]], lookahead=barmerge.lookahead_on)
[intral_time, intral_open] = request.security(syminfo.tickerid, '240', [time[1], low[1]], lookahead=barmerge.lookahead_on)

//------------------------------ Inputs -------------------------------

var is_intra_enabled = input.bool(defval=false, title='Open', group='4H', inline='4H')
var is_intrarange_enabled = input.bool(defval=false, title='Prev H/L', group='4H', inline='4H')
var is_intram_enabled = input.bool(defval=false, title='Prev Mid', group='4H', inline='4H')
IntraTextType = input.bool(defval=false, title='ShortHand', group='4H', inline='4Hsh')

var is_daily_enabled = input.bool(defval=true, title='Open', group='Daily', inline='Daily')
var is_dailyrange_enabled = input.bool(defval=true, title='Prev H/L', group='Daily', inline='Daily')
var is_dailym_enabled = input.bool(defval=false, title='Prev Mid', group='Daily', inline='Daily')
DailyTextType = input.bool(defval=false, title='ShortHand', group='Daily', inline='Dailysh')

var is_monday_enabled = input.bool(defval=true, title='Range', group='Monday Range', inline='Monday')
var is_monday_mid = input.bool(defval=false, title='Mid', group='Monday Range', inline='Monday')
var untested_monday = false
MondayTextType = input.bool(defval=false, title='ShortHand', group='Monday Range', inline='Mondaysh')

var is_weekly_enabled = input.bool(defval=false, title='Open', group='Weekly', inline='Weekly')
var is_weeklyrange_enabled = input.bool(defval=true, title='Prev H/L', group='Weekly', inline='Weekly')
var is_weekly_mid = input.bool(defval=false, title='Prev Mid', group='Weekly', inline='Weekly')
WeeklyTextType = input.bool(defval=false, title='ShortHand', group='Weekly', inline='Weeklysh')

var is_monthly_enabled = input.bool(defval=false, title='Open', group='Monthly', inline='Monthly')
var is_monthlyrange_enabled = input.bool(defval=false, title='Prev H/L', group='Monthly', inline='Monthly')
var is_monthly_mid = input.bool(defval=false, title='Prev Mid', group='Monthly', inline='Monthly')
MonthlyTextType = input.bool(defval=false, title='ShortHand', group='Monthly', inline='Monthlysh')

var is_quarterly_enabled = input.bool(defval=false, title='Open', group='Quarterly', inline='Quarterly')
var is_quarterlyrange_enabled = input.bool(defval=false, title='Prev H/L', group='Quarterly', inline='Quarterly')
var is_quarterly_mid = input.bool(defval=false, title='Prev Mid', group='Quarterly', inline='Quarterly')
QuarterlyTextType = input.bool(defval=false, title='ShortHand', group='Quarterly', inline='Quarterlysh')

var is_yearly_enabled = input.bool(defval=false, title='Open', group='Yearly', inline='Yearly')
var is_yearlyrange_enabled = input.bool(defval=false, title='Current H/L', group='Yearly', inline='Yearly')
var is_yearly_mid = input.bool(defval=false, title='Mid', group='Yearly', inline='Yearly')
YearlyTextType = input.bool(defval=false, title='ShortHand', group='Yearly', inline='Yearlysh')

var is_londonrange_enabled = input.bool(defval=false, title='London Range', group='FX Sessions', inline='FX')
var is_usrange_enabled = input.bool(defval=false, title='New York Range', group='FX Sessions', inline='FX')
var is_asiarange_enabled = input.bool(defval=false, title='Asia Range', group='FX Sessions', inline='FX')
SessionTextType = input.bool(defval=false, title='ShortHand', group='FX Sessions', inline='FXColor')

Londont = input.session("0800-1600", "London Session")
USt = input.session("1400-2100", "New York Session")
Asiat = input.session("0000-0900", "Tokyo Session")

DailyColor = input.color(title='', defval=#000000, group='Daily', inline='Dailysh')
MondayColor = input.color(title='', defval=#2962ff, group='Monday Range', inline='Mondaysh')
WeeklyColor = input.color(title='', defval=#000000, group='Weekly', inline='Weeklysh')
MonthlyColor = input.color(title='', defval=#f23645, group='Monthly', inline='Monthlysh')
YearlyColor = input.color(title='', defval=color.red, group='Yearly', inline='Yearlysh')
quarterlyColor = input.color(title='', defval=#FF9800, group='Quarterly', inline='Quarterlysh')
IntraColor = input.color(title='', defval=#000000, group='4H', inline='4Hsh')
LondonColor = input.color(title='', defval=#000000, group='FX Sessions', inline='FXColor')
USColor = input.color(title='', defval=#000000, group='FX Sessions', inline='FXColor')
AsiaColor = input.color(title='', defval=#000000, group='FX Sessions', inline='FXColor')

var pdhtext = GlobalTextType or DailyTextType ? 'PDH' : 'Prev Daily High'
var pdltext = GlobalTextType or DailyTextType ? 'PDL' : 'Prev Daily Low'
var dotext = GlobalTextType or DailyTextType ? 'DO' : 'Daily Open'
var pdmtext = GlobalTextType or DailyTextType ? 'PDM' : 'Prev Daily Middle'

var pwhtext = GlobalTextType or WeeklyTextType ? 'PWH' : 'Prev Weekly High'
var pwltext = GlobalTextType or WeeklyTextType ? 'PWL' : 'Prev Weekly Low'
var wotext = GlobalTextType or WeeklyTextType ? 'WO' : 'Weekly Open'
var pwmtext = GlobalTextType or WeeklyTextType ? 'PWM' : 'Prev Weekly Middle'

var pmhtext = GlobalTextType or MonthlyTextType ? 'PMH' : 'Prev Monthly High'
var pmltext = GlobalTextType or MonthlyTextType ? 'PML' : 'Prev Monthly Low'
var motext = GlobalTextType or MonthlyTextType ? 'MO' : 'Monthly Open'
var pmmtext = GlobalTextType or MonthlyTextType ? 'PMM' : 'Prev Monthly Middle'

var pqhtext = GlobalTextType or QuarterlyTextType ? 'PQH' : 'Prev Quarterly High'
var pqltext = GlobalTextType or QuarterlyTextType ? 'PQL' : 'Prev Quarterly Low'
var qotext = GlobalTextType or QuarterlyTextType ? 'QO' : 'Quarterly Open'
var pqmtext = GlobalTextType or QuarterlyTextType ? 'PQM' : 'Prev Quarterly Middle'

var cyhtext = GlobalTextType or YearlyTextType ? 'CYH' : 'Yearly High'
var cyltext = GlobalTextType or YearlyTextType ? 'CYL' : 'Yearly Low'
var yotext = GlobalTextType or YearlyTextType ? 'YO' : 'Yearly Open'
var cymtext = GlobalTextType or YearlyTextType ? 'CYM' : 'Yearly Middle'

var pihtext = GlobalTextType or IntraTextType ? 'P-4H-H' : 'Prev 4h High'
var piltext = GlobalTextType or IntraTextType ? 'P-4H-L' : 'Prev 4h Low'
var iotext = GlobalTextType or IntraTextType ? '4H-O' : '4h Open'
var pimtext = GlobalTextType or IntraTextType ? 'P-4H-M' : 'Prev 4h Middle'

var pmonhtext = GlobalTextType or MondayTextType ? 'MDAY-H' : 'Monday High'
var pmonltext = GlobalTextType or MondayTextType ? 'MDAY-L' : 'Monday Low'
var pmonmtext = GlobalTextType or MondayTextType ? 'MDAY-M' : 'Monday Middle'

var lhtext = GlobalTextType or SessionTextType ? 'Lon-H' : 'London High'
var lltext = GlobalTextType or SessionTextType ? 'Lon-L' : 'London Low'
var lotext = GlobalTextType or SessionTextType ? 'Lon-O' : 'London Open'

var ushtext = GlobalTextType or SessionTextType ? 'NY-H' : 'New York High'
var usltext = GlobalTextType or SessionTextType ? 'NY-L' : 'New York Low'
var usotext = GlobalTextType or SessionTextType ? 'NY-O' : 'New York Open'

var asiahtext = GlobalTextType or SessionTextType ? 'AS-H' : 'Asia High'
var asialtext = GlobalTextType or SessionTextType ? 'AS-L' : 'Asia Low'
var asiaotext = GlobalTextType or SessionTextType ? 'AS-O' : 'Asia Open'

if globalcoloring == true
    DailyColor := GlobalColor
    MondayColor := GlobalColor
    WeeklyColor := GlobalColor
    MonthlyColor := GlobalColor
    YearlyColor := GlobalColor
    quarterlyColor := GlobalColor
    IntraColor := GlobalColor
    IntraColor


if weekly_time != weekly_time[1]
    untested_monday := false
    untested_monday

if is_monday_enabled == true and untested_monday == false
    untested_monday := true
    monday_time := daily_time
    monday_high := cdailyh_open
    monday_low := cdailyl_open
    monday_low


linewidthint = 1
if linesize == 'Small'
    linewidthint := 1
    linewidthint
if linesize == 'Medium'
    linewidthint := 2
    linewidthint
if linesize == 'Large'
    linewidthint := 3
    linewidthint

var DEFAULT_LINE_WIDTH = linewidthint
var DEFAULT_TAIL_WIDTH = linewidthint

fontsize = size.small

if labelsize == 'Small'
    fontsize := size.small
    fontsize

if labelsize == 'Medium'
    fontsize := size.normal
    fontsize

if labelsize == 'Large'
    fontsize := size.large
    fontsize

linestyles = line.style_solid
if linestyle == 'Dashed'
    linestyles := line.style_dashed
    linestyles

if linestyle == 'Dotted'
    linestyles := line.style_dotted
    linestyles



var DEFAULT_LABEL_SIZE = fontsize
var DEFAULT_LABEL_STYLE = label.style_none
var DEFAULT_EXTEND_RIGHT = distanceright


London = time(timeframe.period, Londont)
US = time(timeframe.period, USt)
Asia = time(timeframe.period, Asiat)

var clondonhigh = 0.0
var clondonlow = close
var londontime = time
var flondonhigh = 0.0
var flondonlow = 0.0
var flondonopen = 0.0

var onelondonfalse = false
if London
    if high > clondonhigh
        clondonhigh := high
        clondonhigh
    if low < clondonlow
        clondonlow := low
        clondonlow
    if onelondonfalse
        londontime := time
        flondonopen := open
        flondonopen
    flondonhigh := clondonhigh
    flondonlow := clondonlow
    onelondonfalse := false
    onelondonfalse
else
    if onelondonfalse == false
        flondonhigh := clondonhigh
        flondonlow := clondonlow
        flondonlow
    onelondonfalse := true

    clondonhigh := 0.0
    clondonlow := close
    clondonlow

//////////////////////////////////
var cushigh = 0.0
var cuslow = close
var ustime = time
var fushigh = 0.0
var fuslow = 0.0
var fusopen = 0.0

var oneusfalse = false
if US
    if high > cushigh
        cushigh := high
        cushigh
    if low < cuslow
        cuslow := low
        cuslow
    if oneusfalse
        ustime := time
        fusopen := open
        fusopen
    fushigh := cushigh
    fuslow := cuslow
    oneusfalse := false
    oneusfalse
else
    if oneusfalse == false
        fushigh := cushigh
        fuslow := cuslow
        fuslow
    oneusfalse := true

    cushigh := 0.0
    cuslow := close
    cuslow

//////////////////////////////////
var casiahigh = 0.0
var casialow = close
var asiatime = time
var fasiahigh = 0.0
var fasialow = 0.0
var fasiaopen = 0.0

var oneasiafalse = false
if Asia
    if high > casiahigh
        casiahigh := high
        casiahigh
    if low < casialow
        casialow := low
        casialow
    if oneasiafalse
        asiatime := time
        fasiaopen := open
        fasiaopen
    fasiahigh := casiahigh
    fasialow := casialow
    oneasiafalse := false
    oneasiafalse
else
    if oneasiafalse == false
        fasiahigh := casiahigh
        fasialow := casialow
        fasialow
    oneasiafalse := true

    casiahigh := 0.0
    casialow := close
    casialow

//------------------------------ Plotting ------------------------------
var pricearray = array.new_float(0)
var labelarray = array.new_label(0)
f_LevelMerge(pricearray, labelarray, currentprice, currentlabel, currentcolor) =>
    if array.includes(pricearray, currentprice)
        whichindex = array.indexof(pricearray, currentprice)
        labelhold = array.get(labelarray, whichindex)
        whichtext = label.get_text(labelhold)

        label.set_text(labelhold, label.get_text(currentlabel) + ' / ' + whichtext)
        label.set_text(currentlabel, '')
        label.set_textcolor(labelhold, currentcolor)
    else
        array.push(pricearray, currentprice)
        array.push(labelarray, currentlabel)


var can_show_daily = is_daily_enabled and timeframe.isintraday
var can_show_weekly = is_weekly_enabled and not timeframe.isweekly and not timeframe.ismonthly
var can_show_monthly = is_monthly_enabled and not timeframe.ismonthly

get_limit_right(bars) =>
    timenow + (time - time[1]) * bars

// the following code doesn't need to be processed on every candle
if barstate.islast
    is_weekly_open = dayofweek == dayofweek.monday
    is_monthly_open = dayofmonth == 1
    can_draw_daily = (is_weekly_enabled ? not is_weekly_open : true) and (is_monthly_enabled ? not is_monthly_open : true)
    can_draw_weekly = is_monthly_enabled ? not(is_monthly_open and is_weekly_open) : true
    can_draw_intra = is_intra_enabled
    can_draw_intrah = is_intrarange_enabled
    can_draw_intral = is_intrarange_enabled
    can_draw_intram = is_intram_enabled
    pricearray := array.new_float(0)
    labelarray := array.new_label(0)

    /////////////////////////////////

    if is_londonrange_enabled
        //label.new(bar_index,high)
        london_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)


        if displayStyle == 'Right Anchored'
            londontime := get_limit_right(radistance)
            londontime

        var londonh_line = line.new(x1=londontime, x2=london_limit_right, y1=flondonhigh, y2=flondonhigh, color=LondonColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var londonl_line = line.new(x1=londontime, x2=london_limit_right, y1=flondonlow, y2=flondonlow, color=LondonColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var londono_line = line.new(x1=londontime, x2=london_limit_right, y1=flondonopen, y2=flondonopen, color=LondonColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var londonh_label = label.new(x=london_limit_right, y=flondonhigh, text=lhtext, style=DEFAULT_LABEL_STYLE, textcolor=LondonColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)
        var londonl_label = label.new(x=london_limit_right, y=flondonlow, text=lltext, style=DEFAULT_LABEL_STYLE, textcolor=LondonColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)
        var londono_label = label.new(x=london_limit_right, y=flondonopen, text=lotext, style=DEFAULT_LABEL_STYLE, textcolor=LondonColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)
        line.set_x1(londonh_line, londontime)
        line.set_x2(londonh_line, london_limit_right)
        line.set_y1(londonh_line, flondonhigh)
        line.set_y2(londonh_line, flondonhigh)
        line.set_x1(londonl_line, londontime)
        line.set_x2(londonl_line, london_limit_right)
        line.set_y1(londonl_line, flondonlow)
        line.set_y2(londonl_line, flondonlow)
        line.set_x1(londono_line, londontime)
        line.set_x2(londono_line, london_limit_right)
        line.set_y1(londono_line, flondonopen)
        line.set_y2(londono_line, flondonopen)

        label.set_x(londonh_label, london_limit_right)
        label.set_y(londonh_label, flondonhigh)
        label.set_text(londonh_label, lhtext)
        label.set_x(londonl_label, london_limit_right)
        label.set_y(londonl_label, flondonlow)
        label.set_text(londonl_label, lltext)
        label.set_x(londono_label, london_limit_right)
        label.set_y(londono_label, flondonopen)
        label.set_text(londono_label, lotext)

        if mergebool
            f_LevelMerge(pricearray, labelarray, flondonhigh, londonh_label, LondonColor)
            f_LevelMerge(pricearray, labelarray, flondonlow, londonl_label, LondonColor)
            f_LevelMerge(pricearray, labelarray, flondonopen, londono_label, LondonColor)
//////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////

    if is_usrange_enabled
        //label.new(bar_index,high)
        us_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)


        if displayStyle == 'Right Anchored'
            ustime := get_limit_right(radistance)
            ustime

        var ush_line = line.new(x1=ustime, x2=us_limit_right, y1=fushigh, y2=fushigh, color=USColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var usl_line = line.new(x1=ustime, x2=us_limit_right, y1=fuslow, y2=fuslow, color=USColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var uso_line = line.new(x1=ustime, x2=us_limit_right, y1=fusopen, y2=fusopen, color=USColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var ush_label = label.new(x=us_limit_right, y=fushigh, text=lhtext, style=DEFAULT_LABEL_STYLE, textcolor=USColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)
        var usl_label = label.new(x=us_limit_right, y=fuslow, text=lltext, style=DEFAULT_LABEL_STYLE, textcolor=USColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)
        var uso_label = label.new(x=us_limit_right, y=fusopen, text=lotext, style=DEFAULT_LABEL_STYLE, textcolor=USColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)
        line.set_x1(ush_line, ustime)
        line.set_x2(ush_line, us_limit_right)
        line.set_y1(ush_line, fushigh)
        line.set_y2(ush_line, fushigh)

        line.set_x1(usl_line, ustime)
        line.set_x2(usl_line, us_limit_right)
        line.set_y1(usl_line, fuslow)
        line.set_y2(usl_line, fuslow)

        line.set_x1(uso_line, ustime)
        line.set_x2(uso_line, us_limit_right)
        line.set_y1(uso_line, fusopen)
        line.set_y2(uso_line, fusopen)


        label.set_x(ush_label, us_limit_right)
        label.set_y(ush_label, fushigh)
        label.set_text(ush_label, ushtext)
        label.set_x(usl_label, us_limit_right)
        label.set_y(usl_label, fuslow)
        label.set_text(usl_label, usltext)
        label.set_x(uso_label, us_limit_right)
        label.set_y(uso_label, fusopen)
        label.set_text(uso_label, usotext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, fushigh, ush_label, USColor)
            f_LevelMerge(pricearray, labelarray, fuslow, usl_label, USColor)
            f_LevelMerge(pricearray, labelarray, fusopen, uso_label, USColor)
    /////////////////////////////////

    if is_asiarange_enabled
        //label.new(bar_index,high)
        asia_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)


        if displayStyle == 'Right Anchored'
            asiatime := get_limit_right(radistance)
            asiatime

        var asiah_line = line.new(x1=asiatime, x2=asia_limit_right, y1=fasiahigh, y2=fasiahigh, color=AsiaColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var asial_line = line.new(x1=asiatime, x2=asia_limit_right, y1=fasialow, y2=fasialow, color=AsiaColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var asiao_line = line.new(x1=asiatime, x2=asia_limit_right, y1=fasiaopen, y2=fasiaopen, color=AsiaColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var asiah_label = label.new(x=asia_limit_right, y=fasiahigh, text=asiahtext, style=DEFAULT_LABEL_STYLE, textcolor=AsiaColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)
        var asial_label = label.new(x=asia_limit_right, y=fasialow, text=asialtext, style=DEFAULT_LABEL_STYLE, textcolor=AsiaColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)
        var asiao_label = label.new(x=asia_limit_right, y=fasiaopen, text=asiaotext, style=DEFAULT_LABEL_STYLE, textcolor=AsiaColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)
        line.set_x1(asiah_line, asiatime)
        line.set_x2(asiah_line, asia_limit_right)
        line.set_y1(asiah_line, fasiahigh)
        line.set_y2(asiah_line, fasiahigh)

        line.set_x1(asial_line, asiatime)
        line.set_x2(asial_line, asia_limit_right)
        line.set_y1(asial_line, fasialow)
        line.set_y2(asial_line, fasialow)

        line.set_x1(asiao_line, asiatime)
        line.set_x2(asiao_line, asia_limit_right)
        line.set_y1(asiao_line, fasiaopen)
        line.set_y2(asiao_line, fasiaopen)


        label.set_x(asiah_label, asia_limit_right)
        label.set_y(asiah_label, fasiahigh)
        label.set_text(asiah_label, asiahtext)
        label.set_x(asial_label, asia_limit_right)
        label.set_y(asial_label, fasialow)
        label.set_text(asial_label, asialtext)
        label.set_x(asiao_label, asia_limit_right)
        label.set_y(asiao_label, fasiaopen)
        label.set_text(asiao_label, asiaotext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, fasiahigh, asiah_label, AsiaColor)
            f_LevelMerge(pricearray, labelarray, fasialow, asial_label, AsiaColor)
            f_LevelMerge(pricearray, labelarray, fasiaopen, asiao_label, AsiaColor)
//////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////
    if can_draw_intra
        intra_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        if displayStyle == 'Right Anchored'
            intra_time := get_limit_right(radistance)
            intra_time


        var intra_line = line.new(x1=intra_time, x2=intra_limit_right, y1=intra_open, y2=intra_open, color=IntraColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var intra_label = label.new(x=intra_limit_right, y=intra_open, text=iotext, style=DEFAULT_LABEL_STYLE, textcolor=IntraColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)

        line.set_x1(intra_line, intra_time)
        line.set_x2(intra_line, intra_limit_right)
        line.set_y1(intra_line, intra_open)
        line.set_y2(intra_line, intra_open)
        label.set_x(intra_label, intra_limit_right)
        label.set_y(intra_label, intra_open)
        label.set_text(intra_label, iotext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, intra_open, intra_label, IntraColor)


//////////////////////////////////////////////////////////////////////////////////
//HIGH HIGH HIGH HIGH HIGH HIGH HIGH HIGH HIGH HIGH HIGH HIGH HIGH HIGH HIGH HIGH
    if can_draw_intrah
        intrah_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        if displayStyle == 'Right Anchored'
            intrah_time := get_limit_right(radistance)
            intrah_time



        var intrah_line = line.new(x1=intrah_time, x2=intrah_limit_right, y1=intrah_open, y2=intrah_open, color=IntraColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var intrah_label = label.new(x=intrah_limit_right, y=intrah_open, text=pihtext, style=DEFAULT_LABEL_STYLE, textcolor=IntraColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)

        line.set_x1(intrah_line, intrah_time)
        line.set_x2(intrah_line, intrah_limit_right)
        line.set_y1(intrah_line, intrah_open)
        line.set_y2(intrah_line, intrah_open)
        label.set_x(intrah_label, intrah_limit_right)
        label.set_y(intrah_label, intrah_open)
        label.set_text(intrah_label, pihtext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, intrah_open, intrah_label, IntraColor)

//////////////////////////////////////////////////////////////////////////////////
//LOW LOW LOW LOW LOW LOW LOW LOW LOW LOW LOW LOW LOW LOW LOW LOW
    if can_draw_intral
        intral_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        if displayStyle == 'Right Anchored'
            intral_time := get_limit_right(radistance)
            intral_time



        var intral_line = line.new(x1=intral_time, x2=intral_limit_right, y1=intral_open, y2=intral_open, color=IntraColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var intral_label = label.new(x=intral_limit_right, y=intral_open, text=piltext, style=DEFAULT_LABEL_STYLE, textcolor=IntraColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)

        line.set_x1(intral_line, intral_time)
        line.set_x2(intral_line, intral_limit_right)
        line.set_y1(intral_line, intral_open)
        line.set_y2(intral_line, intral_open)
        label.set_x(intral_label, intral_limit_right)
        label.set_y(intral_label, intral_open)
        label.set_text(intral_label, piltext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, intral_open, intral_label, IntraColor)

///////////////////////////////////////////////////////////////////////////////

    if can_draw_intram
        intram_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        intram_time = intrah_time
        intram_open = (intral_open + intrah_open) / 2
        if displayStyle == 'Right Anchored'
            intram_time := get_limit_right(radistance)
            intram_time

        var intram_line = line.new(x1=intram_time, x2=intram_limit_right, y1=intram_open, y2=intram_open, color=IntraColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var intram_label = label.new(x=intram_limit_right, y=intram_open, text=pimtext, style=DEFAULT_LABEL_STYLE, textcolor=IntraColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)
        line.set_x1(intram_line, intram_time)
        line.set_x2(intram_line, intram_limit_right)
        line.set_y1(intram_line, intram_open)
        line.set_y2(intram_line, intram_open)
        label.set_x(intram_label, intram_limit_right)
        label.set_y(intram_label, intram_open)
        label.set_text(intram_label, pimtext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, intram_open, intram_label, IntraColor)

////////////////////////////////////////// MONDAY

    if is_monday_enabled
        monday_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        if displayStyle == 'Right Anchored'
            monday_time := get_limit_right(radistance)
            monday_time

        var monday_line = line.new(x1=monday_time, x2=monday_limit_right, y1=monday_high, y2=monday_high, color=MondayColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var monday_label = label.new(x=monday_limit_right, y=monday_high, text=pmonhtext, style=DEFAULT_LABEL_STYLE, textcolor=MondayColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)

        line.set_x1(monday_line, monday_time)
        line.set_x2(monday_line, monday_limit_right)
        line.set_y1(monday_line, monday_high)
        line.set_y2(monday_line, monday_high)
        label.set_x(monday_label, monday_limit_right)
        label.set_y(monday_label, monday_high)
        label.set_text(monday_label, pmonhtext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, monday_high, monday_label, MondayColor)


    if is_monday_enabled
        monday_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        if displayStyle == 'Right Anchored'
            monday_time := get_limit_right(radistance)
            monday_time



        var monday_low_line = line.new(x1=monday_time, x2=monday_limit_right, y1=monday_low, y2=monday_low, color=MondayColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var monday_low_label = label.new(x=monday_limit_right, y=monday_low, text=pmonltext, style=DEFAULT_LABEL_STYLE, textcolor=MondayColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)

        line.set_x1(monday_low_line, monday_time)
        line.set_x2(monday_low_line, monday_limit_right)
        line.set_y1(monday_low_line, monday_low)
        line.set_y2(monday_low_line, monday_low)
        label.set_x(monday_low_label, monday_limit_right)
        label.set_y(monday_low_label, monday_low)
        label.set_text(monday_low_label, pmonltext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, monday_low, monday_low_label, MondayColor)



    if is_monday_mid
        mondaym_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)

        mondaym_open = (monday_high + monday_low) / 2
        if displayStyle == 'Right Anchored'
            monday_time := get_limit_right(radistance)
            monday_time

        var mondaym_line = line.new(x1=monday_time, x2=mondaym_limit_right, y1=mondaym_open, y2=mondaym_open, color=MondayColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var mondaym_label = label.new(x=mondaym_limit_right, y=mondaym_open, text=pmonmtext, style=DEFAULT_LABEL_STYLE, textcolor=MondayColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)
        line.set_x1(mondaym_line, monday_time)
        line.set_x2(mondaym_line, mondaym_limit_right)
        line.set_y1(mondaym_line, mondaym_open)
        line.set_y2(mondaym_line, mondaym_open)
        label.set_x(mondaym_label, mondaym_limit_right)
        label.set_y(mondaym_label, mondaym_open)
        label.set_text(mondaym_label, pmonmtext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, mondaym_open, mondaym_label, MondayColor)


//////////////////////////////////////////////////////////////////////////////////
////////////////////////DAILY OPEN DAILY OPEN DAILY OPEN DAILY OPEN DAILY OPEN DAILY OPEN DAILY OPEN

    if is_daily_enabled
        daily_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        if displayStyle == 'Right Anchored'
            daily_time := get_limit_right(radistance)
            daily_time

        var daily_line = line.new(x1=daily_time, x2=daily_limit_right, y1=daily_open, y2=daily_open, color=DailyColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var daily_label = label.new(x=daily_limit_right, y=daily_open, text=dotext, style=DEFAULT_LABEL_STYLE, textcolor=DailyColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)

        line.set_x1(daily_line, daily_time)
        line.set_x2(daily_line, daily_limit_right)
        line.set_y1(daily_line, daily_open)
        line.set_y2(daily_line, daily_open)
        label.set_x(daily_label, daily_limit_right)
        label.set_y(daily_label, daily_open)
        label.set_text(daily_label, dotext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, daily_open, daily_label, DailyColor)

//////////////////////////////////////////////////////////////////////////////////
//////////////////DAILY HIGH DAILY HIGH DAILY HIGH DAILY HIGH DAILY HIGH DAILY HIGH DAILY HIGH

    if is_dailyrange_enabled
        dailyh_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        if displayStyle == 'Right Anchored'
            dailyh_time := get_limit_right(radistance)
            dailyh_time
        // draw tails before lines for better visual


        var dailyh_line = line.new(x1=dailyh_time, x2=dailyh_limit_right, y1=dailyh_open, y2=dailyh_open, color=DailyColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var dailyh_label = label.new(x=dailyh_limit_right, y=dailyh_open, text=pdhtext, style=DEFAULT_LABEL_STYLE, textcolor=DailyColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)

        line.set_x1(dailyh_line, dailyh_time)
        line.set_x2(dailyh_line, dailyh_limit_right)
        line.set_y1(dailyh_line, dailyh_open)
        line.set_y2(dailyh_line, dailyh_open)
        label.set_x(dailyh_label, dailyh_limit_right)
        label.set_y(dailyh_label, dailyh_open)
        label.set_text(dailyh_label, pdhtext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, dailyh_open, dailyh_label, DailyColor)


//////////////////////////////////////////////////////////////////////////////////
//////////////////DAILY LOW DAILY LOW DAILY LOW DAILY LOW DAILY LOW DAILY LOW DAILY LOW DAILY LOW

    if is_dailyrange_enabled
        dailyl_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        if displayStyle == 'Right Anchored'
            dailyl_time := get_limit_right(radistance)
            dailyl_time


        var dailyl_line = line.new(x1=dailyl_time, x2=dailyl_limit_right, y1=dailyl_open, y2=dailyl_open, color=DailyColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var dailyl_label = label.new(x=dailyl_limit_right, y=dailyl_open, text=pdltext, style=DEFAULT_LABEL_STYLE, textcolor=DailyColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)

        line.set_x1(dailyl_line, dailyl_time)
        line.set_x2(dailyl_line, dailyl_limit_right)
        line.set_y1(dailyl_line, dailyl_open)
        line.set_y2(dailyl_line, dailyl_open)
        label.set_x(dailyl_label, dailyl_limit_right)
        label.set_y(dailyl_label, dailyl_open)
        label.set_text(dailyl_label, pdltext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, dailyl_open, dailyl_label, DailyColor)



//////////////////////////////////////////////////////////////////////////////// Daily MID

    if is_dailym_enabled
        dailym_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        dailym_time = dailyh_time
        dailym_open = (dailyl_open + dailyh_open) / 2
        if displayStyle == 'Right Anchored'
            dailym_time := get_limit_right(radistance)
            dailym_time
        var dailym_line = line.new(x1=dailym_time, x2=dailym_limit_right, y1=dailym_open, y2=dailym_open, color=DailyColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var dailym_label = label.new(x=dailym_limit_right, y=dailym_open, text=pdmtext, style=DEFAULT_LABEL_STYLE, textcolor=DailyColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)
        line.set_x1(dailym_line, dailym_time)
        line.set_x2(dailym_line, dailym_limit_right)
        line.set_y1(dailym_line, dailym_open)
        line.set_y2(dailym_line, dailym_open)
        label.set_x(dailym_label, dailym_limit_right)
        label.set_y(dailym_label, dailym_open)
        label.set_text(dailym_label, pdmtext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, dailym_open, dailym_label, DailyColor)


//////////////////////////////////////////////////////////////////////////////////


    if is_weekly_enabled
        weekly_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        cweekly_time = weekly_time
        if displayStyle == 'Right Anchored'
            cweekly_time := get_limit_right(radistance)
            cweekly_time


        var weekly_line = line.new(x1=cweekly_time, x2=weekly_limit_right, y1=weekly_open, y2=weekly_open, color=WeeklyColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var weekly_label = label.new(x=weekly_limit_right, y=weekly_open, text=wotext, style=DEFAULT_LABEL_STYLE, textcolor=WeeklyColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)

        line.set_x1(weekly_line, cweekly_time)
        line.set_x2(weekly_line, weekly_limit_right)
        line.set_y1(weekly_line, weekly_open)
        line.set_y2(weekly_line, weekly_open)
        label.set_x(weekly_label, weekly_limit_right)
        label.set_y(weekly_label, weekly_open)
        label.set_text(weekly_label, wotext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, weekly_open, weekly_label, WeeklyColor)
        // the weekly open can be the daily open too (monday)
        // only the weekly will be draw, in these case we update its label
    // if is_weekly_open and can_show_daily
            // label.set_text(weekly_label, "DO / WO            ")

//////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////// WEEKLY HIGH WEEKLY HIGH WEEKLY HIGH


    if is_weeklyrange_enabled
        weeklyh_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        if displayStyle == 'Right Anchored'
            weeklyh_time := get_limit_right(radistance)
            weeklyh_time


        var weeklyh_line = line.new(x1=weeklyh_time, x2=weeklyh_limit_right, y1=weeklyh_open, y2=weeklyh_open, color=WeeklyColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var weeklyh_label = label.new(x=weeklyh_limit_right, y=weeklyh_open, text=pwhtext, style=DEFAULT_LABEL_STYLE, textcolor=WeeklyColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)

        line.set_x1(weeklyh_line, weeklyh_time)
        line.set_x2(weeklyh_line, weeklyh_limit_right)
        line.set_y1(weeklyh_line, weeklyh_open)
        line.set_y2(weeklyh_line, weeklyh_open)
        label.set_x(weeklyh_label, weeklyh_limit_right)
        label.set_y(weeklyh_label, weeklyh_open)
        label.set_text(weeklyh_label, pwhtext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, weeklyh_open, weeklyh_label, WeeklyColor)

//////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////// WEEKLY LOW WEEKLY LOW WEEKLY LOW


    if is_weeklyrange_enabled
        weeklyl_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        if displayStyle == 'Right Anchored'
            weeklyl_time := get_limit_right(radistance)
            weeklyl_time


        var weeklyl_line = line.new(x1=weeklyl_time, x2=weeklyl_limit_right, y1=weekly_open, y2=weekly_open, color=WeeklyColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var weeklyl_label = label.new(x=weeklyl_limit_right, y=weeklyl_open, text=pwltext, style=DEFAULT_LABEL_STYLE, textcolor=WeeklyColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)

        line.set_x1(weeklyl_line, weeklyl_time)
        line.set_x2(weeklyl_line, weeklyl_limit_right)
        line.set_y1(weeklyl_line, weeklyl_open)
        line.set_y2(weeklyl_line, weeklyl_open)
        label.set_x(weeklyl_label, weeklyl_limit_right)
        label.set_y(weeklyl_label, weeklyl_open)
        label.set_text(weeklyl_label, pwltext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, weeklyl_open, weeklyl_label, WeeklyColor)



//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////// Weekly MID

    if is_weekly_mid
        weeklym_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        weeklym_time = weeklyh_time
        weeklym_open = (weeklyl_open + weeklyh_open) / 2
        if displayStyle == 'Right Anchored'
            weeklym_time := get_limit_right(radistance)
            weeklym_time

        var weeklym_line = line.new(x1=weeklym_time, x2=weeklym_limit_right, y1=weeklym_open, y2=weeklym_open, color=WeeklyColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var weeklym_label = label.new(x=weeklym_limit_right, y=weeklym_open, text=pwmtext, style=DEFAULT_LABEL_STYLE, textcolor=WeeklyColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)
        line.set_x1(weeklym_line, weeklym_time)
        line.set_x2(weeklym_line, weeklym_limit_right)
        line.set_y1(weeklym_line, weeklym_open)
        line.set_y2(weeklym_line, weeklym_open)
        label.set_x(weeklym_label, weeklym_limit_right)
        label.set_y(weeklym_label, weeklym_open)
        label.set_text(weeklym_label, pwmtext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, weeklym_open, weeklym_label, WeeklyColor)
////////////////////////////////////////////////////////////////////////////////// YEEEAARRLLYY LOW LOW LOW


    if is_yearlyrange_enabled
        yearlyl_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        if displayStyle == 'Right Anchored'
            yearlyl_time := get_limit_right(radistance)
            yearlyl_time


        var yearlyl_line = line.new(x1=yearlyl_time, x2=yearlyl_limit_right, y1=yearlyl_open, y2=yearlyl_open, color=YearlyColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var yearlyl_label = label.new(x=yearlyl_limit_right, y=yearlyl_open, text=cyltext, style=DEFAULT_LABEL_STYLE, textcolor=YearlyColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)

        line.set_x1(yearlyl_line, yearlyl_time)
        line.set_x2(yearlyl_line, yearlyl_limit_right)
        line.set_y1(yearlyl_line, yearlyl_open)
        line.set_y2(yearlyl_line, yearlyl_open)
        label.set_x(yearlyl_label, yearlyl_limit_right)
        label.set_y(yearlyl_label, yearlyl_open)
        label.set_text(yearlyl_label, cyltext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, yearlyl_open, yearlyl_label, YearlyColor)



//////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////// YEEEAARRLLYY HIGH HIGH HIGH


    if is_yearlyrange_enabled
        yearlyh_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        if displayStyle == 'Right Anchored'
            yearlyh_time := get_limit_right(radistance)
            yearlyh_time


        var yearlyh_line = line.new(x1=yearlyh_time, x2=yearlyh_limit_right, y1=yearlyh_open, y2=yearlyh_open, color=YearlyColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var yearlyh_label = label.new(x=yearlyh_limit_right, y=yearlyh_open, text=cyhtext, style=DEFAULT_LABEL_STYLE, textcolor=YearlyColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)

        line.set_x1(yearlyh_line, yearlyh_time)
        line.set_x2(yearlyh_line, yearlyh_limit_right)
        line.set_y1(yearlyh_line, yearlyh_open)
        line.set_y2(yearlyh_line, yearlyh_open)
        label.set_x(yearlyh_label, yearlyh_limit_right)
        label.set_y(yearlyh_label, yearlyh_open)
        label.set_text(yearlyh_label, cyhtext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, yearlyh_open, yearlyh_label, YearlyColor)



//////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////// YEEEAARRLLYY OPEN


    if is_yearly_enabled
        yearly_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        if displayStyle == 'Right Anchored'
            yearly_time := get_limit_right(radistance)
            yearly_time


        var yearly_line = line.new(x1=yearly_time, x2=yearly_limit_right, y1=yearly_open, y2=yearly_open, color=YearlyColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)

        var yearly_label = label.new(x=yearly_limit_right, y=yearly_open, text=yotext, style=DEFAULT_LABEL_STYLE, textcolor=YearlyColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)



        line.set_x1(yearly_line, yearly_time)
        line.set_x2(yearly_line, yearly_limit_right)
        line.set_y1(yearly_line, yearly_open)
        line.set_y2(yearly_line, yearly_open)
        label.set_x(yearly_label, yearly_limit_right)
        label.set_y(yearly_label, yearly_open)
        label.set_text(yearly_label, yotext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, yearly_open, yearly_label, YearlyColor)



//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////// yearly MID

    if is_yearly_mid
        yearlym_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        yearlym_time = yearlyh_time
        yearlym_open = (yearlyl_open + yearlyh_open) / 2
        if displayStyle == 'Right Anchored'
            yearlym_time := get_limit_right(radistance)
            yearlym_time

        var yearlym_line = line.new(x1=yearlym_time, x2=yearlym_limit_right, y1=yearlym_open, y2=yearlym_open, color=YearlyColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var yearlym_label = label.new(x=yearlym_limit_right, y=yearlym_open, text=cymtext, style=DEFAULT_LABEL_STYLE, textcolor=YearlyColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)
        line.set_x1(yearlym_line, yearlym_time)
        line.set_x2(yearlym_line, yearlym_limit_right)
        line.set_y1(yearlym_line, yearlym_open)
        line.set_y2(yearlym_line, yearlym_open)
        label.set_x(yearlym_label, yearlym_limit_right)
        label.set_y(yearlym_label, yearlym_open)
        label.set_text(yearlym_label, cymtext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, yearlym_open, yearlym_label, YearlyColor)


////////////////////////////////////////////////////////////////////////////////// QUATERLLYYYYY OPEN


    if is_quarterly_enabled
        quarterly_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        if displayStyle == 'Right Anchored'
            quarterly_time := get_limit_right(radistance)
            quarterly_time


        var quarterly_line = line.new(x1=quarterly_time, x2=quarterly_limit_right, y1=quarterly_open, y2=quarterly_open, color=quarterlyColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var quarterly_label = label.new(x=quarterly_limit_right, y=quarterly_open, text=qotext, style=DEFAULT_LABEL_STYLE, textcolor=quarterlyColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)

        line.set_x1(quarterly_line, quarterly_time)
        line.set_x2(quarterly_line, quarterly_limit_right)
        line.set_y1(quarterly_line, quarterly_open)
        line.set_y2(quarterly_line, quarterly_open)
        label.set_x(quarterly_label, quarterly_limit_right)
        label.set_y(quarterly_label, quarterly_open)
        label.set_text(quarterly_label, qotext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, quarterly_open, quarterly_label, quarterlyColor)



//////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////// QUATERLLYYYYY High


    if is_quarterlyrange_enabled
        quarterlyh_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        if displayStyle == 'Right Anchored'
            quarterlyh_time := get_limit_right(radistance)
            quarterlyh_time


        var quarterlyh_line = line.new(x1=quarterlyh_time, x2=quarterlyh_limit_right, y1=quarterlyh_open, y2=quarterlyh_open, color=quarterlyColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var quarterlyh_label = label.new(x=quarterlyh_limit_right, y=quarterlyh_open, text=pqhtext, style=DEFAULT_LABEL_STYLE, textcolor=quarterlyColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)

        line.set_x1(quarterlyh_line, quarterlyh_time)
        line.set_x2(quarterlyh_line, quarterlyh_limit_right)
        line.set_y1(quarterlyh_line, quarterlyh_open)
        line.set_y2(quarterlyh_line, quarterlyh_open)
        label.set_x(quarterlyh_label, quarterlyh_limit_right)
        label.set_y(quarterlyh_label, quarterlyh_open)
        label.set_text(quarterlyh_label, pqhtext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, quarterlyh_open, quarterlyh_label, quarterlyColor)



//////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////// QUATERLLYYYYY Low


    if is_quarterlyrange_enabled
        quarterlyl_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        if displayStyle == 'Right Anchored'
            quarterlyl_time := get_limit_right(radistance)
            quarterlyl_time


        var quarterlyl_line = line.new(x1=quarterlyl_time, x2=quarterlyl_limit_right, y1=quarterlyl_open, y2=quarterlyl_open, color=quarterlyColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var quarterlyl_label = label.new(x=quarterlyl_limit_right, y=quarterlyl_open, text=pqltext, style=DEFAULT_LABEL_STYLE, textcolor=quarterlyColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)

        line.set_x1(quarterlyl_line, quarterlyl_time)
        line.set_x2(quarterlyl_line, quarterlyl_limit_right)
        line.set_y1(quarterlyl_line, quarterlyl_open)
        line.set_y2(quarterlyl_line, quarterlyl_open)
        label.set_x(quarterlyl_label, quarterlyl_limit_right)
        label.set_y(quarterlyl_label, quarterlyl_open)

        label.set_text(quarterlyl_label, pqltext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, quarterlyl_open, quarterlyl_label, quarterlyColor)



//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////// QUATERLLYYYYY MID

    if is_quarterly_mid
        quarterlym_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        quarterlym_time = quarterlyh_time
        quarterlym_open = (quarterlyl_open + quarterlyh_open) / 2
        if displayStyle == 'Right Anchored'
            quarterlym_time := get_limit_right(radistance)
            quarterlym_time
        var quarterlym_line = line.new(x1=quarterlym_time, x2=quarterlym_limit_right, y1=quarterlym_open, y2=quarterlym_open, color=quarterlyColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var quarterlym_label = label.new(x=quarterlym_limit_right, y=quarterlym_open, text=pqmtext, style=DEFAULT_LABEL_STYLE, textcolor=quarterlyColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)
        line.set_x1(quarterlym_line, quarterlym_time)
        line.set_x2(quarterlym_line, quarterlym_limit_right)
        line.set_y1(quarterlym_line, quarterlym_open)
        line.set_y2(quarterlym_line, quarterlym_open)
        label.set_x(quarterlym_label, quarterlym_limit_right)
        label.set_y(quarterlym_label, quarterlym_open)

        label.set_text(quarterlym_label, pqmtext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, quarterlym_open, quarterlym_label, quarterlyColor)

////////////////////////////////////////////////////////////////////////////////// Monthly LOW LOW LOW


    if is_monthlyrange_enabled
        monthlyl_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        if displayStyle == 'Right Anchored'
            monthlyl_time := get_limit_right(radistance)
            monthlyl_time


        var monthlyl_line = line.new(x1=monthlyl_time, x2=monthlyl_limit_right, y1=monthlyl_open, y2=monthlyl_open, color=MonthlyColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var monthlyl_label = label.new(x=monthlyl_limit_right, y=monthlyl_open, text=pmltext, style=DEFAULT_LABEL_STYLE, textcolor=MonthlyColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)

        line.set_x1(monthlyl_line, monthlyl_time)
        line.set_x2(monthlyl_line, monthlyl_limit_right)
        line.set_y1(monthlyl_line, monthlyl_open)
        line.set_y2(monthlyl_line, monthlyl_open)
        label.set_x(monthlyl_label, monthlyl_limit_right)
        label.set_y(monthlyl_label, monthlyl_open)
        label.set_text(monthlyl_label, pmltext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, monthlyl_open, monthlyl_label, MonthlyColor)
        // the weekly open can be the daily open too (monday)
        // only the weekly will be draw, in these case we update its label


//////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////// MONTHLY HIGH HIGH HIGH



    if is_monthlyrange_enabled
        monthlyh_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        if displayStyle == 'Right Anchored'
            monthlyh_time := get_limit_right(radistance)
            monthlyh_time


        var monthlyh_line = line.new(x1=monthlyh_time, x2=monthlyh_limit_right, y1=monthlyh_open, y2=monthlyh_open, color=MonthlyColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var monthlyh_label = label.new(x=monthlyh_limit_right, y=monthlyh_open, text=pmhtext, style=DEFAULT_LABEL_STYLE, textcolor=MonthlyColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)

        line.set_x1(monthlyh_line, monthlyl_time)
        line.set_x2(monthlyh_line, monthlyh_limit_right)
        line.set_y1(monthlyh_line, monthlyh_open)
        line.set_y2(monthlyh_line, monthlyh_open)
        label.set_x(monthlyh_label, monthlyh_limit_right)
        label.set_y(monthlyh_label, monthlyh_open)
        label.set_text(monthlyh_label, pmhtext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, monthlyh_open, monthlyh_label, MonthlyColor)
        // the weekly open can be the daily open too (monday)
        // only the weekly will be draw, in these case we update its label

//////////////////////////////////////////////////////////////////////////////// MONTHLY MID

    if is_monthly_mid
        monthlym_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        monthlym_time = monthlyh_time
        monthlym_open = (monthlyl_open + monthlyh_open) / 2
        if displayStyle == 'Right Anchored'
            monthlym_time := get_limit_right(radistance)
            monthlym_time
        var monthlym_line = line.new(x1=monthlym_time, x2=monthlym_limit_right, y1=monthlym_open, y2=monthlym_open, color=MonthlyColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var monthlym_label = label.new(x=monthlym_limit_right, y=monthlym_open, text=pmmtext, style=DEFAULT_LABEL_STYLE, textcolor=MonthlyColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)
        line.set_x1(monthlym_line, monthlym_time)
        line.set_x2(monthlym_line, monthlym_limit_right)
        line.set_y1(monthlym_line, monthlym_open)
        line.set_y2(monthlym_line, monthlym_open)
        label.set_x(monthlym_label, monthlym_limit_right)
        label.set_y(monthlym_label, monthlym_open)
        label.set_text(monthlym_label, pmmtext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, monthlym_open, monthlym_label, MonthlyColor)
//////////////////////////////////////////////////////////////////////////////////



    if is_monthly_enabled
        monthly_limit_right = get_limit_right(DEFAULT_EXTEND_RIGHT)
        if displayStyle == 'Right Anchored'
            monthly_time := get_limit_right(radistance)
            monthly_time

        var monthlyLine = line.new(x1=monthly_time, x2=monthly_limit_right, y1=monthly_open, y2=monthly_open, color=MonthlyColor, width=DEFAULT_LINE_WIDTH, xloc=xloc.bar_time, style=linestyles)
        var monthlyLabel = label.new(x=monthly_limit_right, y=monthly_open, text=motext, style=DEFAULT_LABEL_STYLE, textcolor=MonthlyColor, size=DEFAULT_LABEL_SIZE, xloc=xloc.bar_time)

        line.set_x1(monthlyLine, monthly_time)
        line.set_x2(monthlyLine, monthly_limit_right)
        line.set_y1(monthlyLine, monthly_open)
        line.set_y2(monthlyLine, monthly_open)
        label.set_x(monthlyLabel, monthly_limit_right)
        label.set_y(monthlyLabel, monthly_open)
        label.set_text(monthlyLabel, motext)
        if mergebool
            f_LevelMerge(pricearray, labelarray, monthly_open, monthlyLabel, MonthlyColor)


/////////////////////////////////////////////////////////////////////////////

        // the monthly open can be the weekly open (monday 1st) and/or daily open too
        // only the monthly will be draw, in these case we update its label
        // if is_monthly_open
        //     if can_show_daily
        //         label.set_text(monthlyLabel, "DO / MO            ")
        //     if is_weekly_open
        //         if can_show_weekly
        //             label.set_text(monthlyLabel, "WO / MO            ")
        //         if can_show_daily and can_show_weekly
        //             label.set_text(monthlyLabel, "DO / WO / MO                ")

        // the start of the line is drew from the first week of the month
        // if the first day of the weekly candle (monday) is the 2nd of the month
        // we fix the start of the line position on the Prev weekly candle
        if timeframe.isweekly and dayofweek(monthly_time) != dayofweek.monday
            line.set_x1(monthlyLine, monthly_time - (weekly_time - weekly_time[1]))

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main finish (key levels)                                                 ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main start (project name)                                                ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

table_top_left = 'top_left'
table_top_center = 'top_center'
table_top_right = 'top_right'
table_middle_left = 'middle_left'
table_middle_center = 'middle_center'
table_middle_right = 'middle_right'
table_bottom_left = 'bottom_left'
table_bottom_center = 'bottom_center'
table_bottom_right = 'bottom_right'


i_border_color = input.color(color.white, title='Border', group='settings', inline='border')
i_border_width = input.int(0, title='', minval=0, maxval=3, group='settings', inline='border')
i_table_position = input.string(table_top_right, title='Position', options=[table_top_left, table_top_center, table_top_right, table_middle_left, table_middle_center, table_middle_right, table_bottom_left, table_bottom_center, table_bottom_right], group='settings')


table tbl = table.new(i_table_position, columns=1, rows=15, frame_color=i_border_color, frame_width=-1, border_color=i_border_color, border_width=i_border_width)

i_show_1 = input.bool(true, title='', group='Line 1', inline='text1')
i_color_1 = input.color(color.rgb(0, 0, 0), title='', group='Line 1', inline='text1')
i_text_1 = input.string('HYPEUPGRADE TR', title='', group='Line 1', inline='text1')
i_height_1 = input.float(3.5, title='', group='Line 1', inline='text1_2')
i_size_1 = input.string('large', title='', options=['tiny', 'small', 'normal', 'large', 'auto'], group='Line 1', inline='text1_2')
i_align_1 = input.string('center', title='', options=['center', 'left', 'right'], group='Line 1', inline='text1_2')

if i_show_1
    table.cell(tbl, 0, 0, i_text_1, text_size=i_size_1, text_color=i_color_1, height=i_height_1, text_halign=i_align_1)


i_show_2 = input.bool(true, title='', group='Line 2', inline='text2')
i_color_2 = input.color(color.rgb(0, 0, 0), title='', group='Line 2', inline='text2')
i_text_2 = input.string('Fütüristik Kripto Merkezi', title='', group='Line 2', inline='text2')
i_height_2 = input.float(3.5, title='', group='Line 2', inline='text2_2')
i_size_2 = input.string('normal', title='', options=['tiny', 'small', 'normal', 'large', 'auto'], group='Line 2', inline='text2_2')
i_align_2 = input.string('center', title='', options=['center', 'left', 'right'], group='Line 2', inline='text2_2')

if i_show_2
    table.cell(tbl, 0, 1, i_text_2, text_size=i_size_2, text_color=i_color_2, height=i_height_2, text_halign=i_align_2)

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main finish (project name)                                               ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main start (dynamic imbalance)                                           ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝


var box[]   top_boxes     = array.new_box()
var box[]   bottom_boxes     = array.new_box()
var box[]   tested_obs = array.new_box()
var bool matched = false

color imb = color.new(#630cff,70)
color imb_tested = color.new(color.red,60)

tf = timeframe.isdaily ? 1440 : (timeframe.isweekly ? 1440*7 : (timeframe.ismonthly ? 1440*7*30 : 1))
reqDate = timenow - 199999999*timeframe.multiplier*tf
Imbcol = input.color(imb, 'Imbalance Color', inline="1" ,group='=== Information ===')
Imbcol_tested = input.color(imb_tested, 'Mitigated Imbalance', inline="2" ,group='=== Information ===')
imb_extend = input.bool(false, "Auto-extend Untested imbalance",group='=== Information ===')
TopImbalance = low[2] <= open[1] and high[0] >= close[1]
TopImbalancesize = low[2] - high[0]
if TopImbalance and TopImbalancesize > 0 and time >= reqDate
    BOX1 = box.new(left=bar_index[1], top=low[2], right=bar_index[0], bottom=high[0])
    box.set_bgcolor(BOX1, Imbcol )
    box.set_border_color(BOX1, na )
    array.push(top_boxes, BOX1)

BottomInbalance = high[2] >= open[1] and low[0] <= close[1]
BottomInbalancesize = low[0] - high[2]
if BottomInbalance and BottomInbalancesize > 0 and time >= reqDate
    BOX2 = box.new(left=bar_index[1], top=low[0], right=bar_index[0], bottom=high[2])
    box.set_bgcolor(BOX2, Imbcol )
    box.set_border_color(BOX2, na )
    array.push(bottom_boxes, BOX2)

if barstate.isconfirmed
    if array.size(top_boxes) > 0
        for i = array.size(top_boxes) - 1 to 0 by 1
            tbox = array.get(top_boxes, i)
            top = box.get_top(tbox)
            bottom = box.get_bottom(tbox)
            ago = box.get_left(tbox)
            if imb_extend
                box.set_right(tbox, bar_index)
            if high > top
                box.set_bgcolor(tbox, Imbcol_tested)  
                if imb_extend 
                    box.set_right(tbox, ago+1)
                array.remove(top_boxes, i)
                continue
            if high > bottom //and ago < 5000
                matched := false
                asize = array.size(tested_obs)
                if asize > 0
                    for j = asize - 1 to 0 by 1
                        tbox2 = array.get(tested_obs, j)
                        ago2 = box.get_left(tbox2)
                        if ago==ago2
                            matched := true
                            box.set_bottom(tbox, high)
                            if imb_extend
                                box.set_right(tbox, ago+1)
                            box.set_top(tbox2, high)
                            break
                if not matched
                    BOX3 = box.copy(tbox)
                    box.set_top(BOX3, high)
                    box.set_bgcolor(BOX3, Imbcol_tested) 
                    if imb_extend  
                        box.set_right(BOX3, ago+1)
                    array.push(tested_obs, BOX3)
                    box.set_bottom(tbox, high)

    if array.size(bottom_boxes) > 0
        for i = array.size(bottom_boxes) - 1 to 0 by 1
            tbox = array.get(bottom_boxes, i)
            top = box.get_top(tbox)
            bottom = box.get_bottom(tbox)
            ago = box.get_left(tbox)
            if imb_extend
                box.set_right(tbox, bar_index)
            if low < bottom 
                box.set_bgcolor(tbox, Imbcol_tested) 
                if imb_extend
                    box.set_right(tbox, ago+1)  
                array.remove(bottom_boxes, i)
                continue
            if low < top //and ago < 5000
                matched := false
                asize = array.size(tested_obs)
                if asize > 0
                    for j = asize - 1 to 0 by 1
                        tbox2 = array.get(tested_obs, j)
                        ago2 = box.get_left(tbox2)
                        if ago==ago2
                            matched := true
                            box.set_top(tbox, low)
                            box.set_bottom(tbox2, low)
                            break
                if not matched
                    BOX4 = box.copy(tbox)
                    box.set_bottom(BOX4, low)
                    box.set_bgcolor(BOX4, Imbcol_tested)  
                    if imb_extend
                        box.set_right(BOX4, ago+1) 
                    array.push(tested_obs, BOX4)
                    box.set_top(tbox, low)


// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main finish (dynamic imbalance)                                          ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main start (super orderblock)                                            ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

plotOB = input.bool(defval=true, title='Plot OB', group='Order Blocks')
obBullColor = input.color(defval=color.new(color.green, 90), title='Bullish OB Color', inline='Set Custom Color', group='Order Blocks')
obBearColor = input.color(defval=color.new(color.red, 90), title='Bearish OB Color', inline='Set Custom Color', group='Order Blocks')
obBoxBorder = input.string(defval=line.style_solid, title='OB Box Border Style', options=[line.style_dashed, line.style_dotted, line.style_solid], group='Order Blocks', tooltip='To disable border, set Border Width below to 0')
obBorderTransparency = input.int(defval=80, title='OB Border Box Transparency', minval=0, maxval=100, group='Order Blocks')
obMaxBoxSet = input.int(defval=10, title='Maximum OB Box Displayed', minval=1, maxval=100, group='Order Blocks', tooltip='Minimum = 1, Maximum = 100')
filterMitOB = input.bool(defval=true, title='Custom Color Mitigated OB', group='Order Blocks')
mitOBColor = input.color(defval=color.new(color.gray, 90), title='Mitigated OB Color', group='Order Blocks', inline='Set Custom Color Mit OB', tooltip='Set Transparency to 0 to make mitigated OB disappear')

plotFVG = input.bool(defval=true, title='Plot FVG', group='Fair Value Gaps', inline='FVG sets')
plotStructureBreakingFVG = input.bool(defval=false, title='Plot Structure Breaking FVG', group='Fair Value Gaps', inline='FVG sets')
fvgBullColor = input.color(defval=color.new(#630cff, 70), title='Bullish FVG Color', inline='Set Custom Color', group='Fair Value Gaps')
fvgBearColor = input.color(defval=color.new(#630cff, 70), title='Bearish FVG Color', inline='Set Custom Color', group='Fair Value Gaps')
fvgStructBreakingColor = input.color(defval=color.new(color.blue, 90), title='Structure Breaking FVG Color', inline='Set Custom Color', group='Fair Value Gaps')
fvgBoxBorder = input.string(defval=line.style_solid, title='FVG Box Border Style', options=[line.style_dashed, line.style_dotted, line.style_solid], group='Fair Value Gaps', tooltip='To disable border, set Border Width below to 0')
fvgBorderTransparency = input.int(defval=80, title='FVG Border Box Transparency', minval=0, maxval=100, group='Fair Value Gaps')
fvgMaxBoxSet = input.int(defval=10, title='Maximum FVG Box Displayed', minval=1, maxval=100, group='Fair Value Gaps', tooltip='Minimum = 1, Maximum = 100')
filterMitFVG = input.bool(defval=true, title='Custom Color Mitigated FVG', group='Fair Value Gaps')
mitFVGColor = input.color(defval=color.new(#ff5252, 60), title='Mitigated FVG Color', group='Fair Value Gaps', inline='Set Custom Color Mit FVG', tooltip='Set Transparency to 0 to make mitigated FVG disappear')

plotRJB = input.bool(defval=false, title='Plot RJB', group='Rejection Blocks', inline='RJB sets')
rjbBullColor = input.color(defval=color.new(color.green, 90), title='Bullish RJB Color', inline='Set Custom Color', group='Rejection Blocks')
rjbBearColor = input.color(defval=color.new(color.red, 90), title='Bearish RJB Color', inline='Set Custom Color', group='Rejection Blocks')
rjbBoxBorder = input.string(defval=line.style_solid, title='RJB Box Border Style', options=[line.style_dashed, line.style_dotted, line.style_solid], group='Rejection Blocks', tooltip='To disable border, set Border Width below to 0')
rjbBorderTransparency = input.int(defval=80, title='RJB Border Box Transparency', minval=0, maxval=100, group='Rejection Blocks')
rjbMaxBoxSet = input.int(defval=10, title='Maximum RJB Box Displayed', minval=1, maxval=100, group='Rejection Blocks', tooltip='Minimum = 1, Maximum = 100')
filterMitRJB = input.bool(defval=false, title='Custom Color Mitigated RJB', group='Rejection Blocks')
mitRJBColor = input.color(defval=color.new(color.gray, 90), title='Mitigated RJB Color', group='Rejection Blocks', inline='Set Custom Color Mit RJB', tooltip='Set to 100 to make mitigated RJB disappear')

plotPVT = input.bool(defval=false, title='Plot Pivots', group='Pivots')
pivotLookup  = input.int(defval=1, minval=1, maxval=5,title='Pivot Lookup', group='Pivots', tooltip='Minimum = 1, Maximum = 5')
pvtTopColor = input.color(defval=color.new(color.silver, 0), title='Pivot Top Color', group='Pivots', inline='PVT Color')
pvtBottomColor = input.color(defval=color.new(color.silver, 0), title='Pivot Bottom Color', group='Pivots', inline='PVT Color')

plotBOS = input.bool(defval=false, title='Plot BoS', group='Crossovers', inline='BOS sets')
useHighLowForBullishBoS = input.bool(defval=false, title='Use High/Low for Bullish BoS (for Bearish setup)', group='Crossovers')
useHighLowForBearishBoS = input.bool(defval=false, title='Use High/Low for Bearish BoS (for Bullish setup)', group='Crossovers')
bosBoxFlag  = input.bool(title='BoS Box Length Manually', defval=false, group='Crossovers', tooltip='If activated the BoS Boxes will not extend unitl crossed by price. Instead will extend by the amount of bars choosen in the "Set BoS Box Length Manually" option')
bosBoxLength  = input.int(title='BoS Box Length Manually', defval=3, minval=1, maxval=5, group='Crossovers', inline='BoS Boxes', tooltip='If "Set BoS Box Length Manually" is marked, choose by how many bars. Minimum = 1, Maximum = 5')
bosBullColor = input.color(defval=color.new(color.green, 90), title='Bullish BoS Color', inline='Set Custom Color', group='Crossovers')
bosBearColor = input.color(defval=color.new(color.red, 90), title='Bearish BoS Color', inline='Set Custom Color', group='Crossovers')
bosBoxBorder = input.string(defval=line.style_solid, title='BoS Box Border Style', options=[line.style_dashed, line.style_dotted, line.style_solid], group='Crossovers', tooltip='To disable border, set Border Width below to 0')
bosBorderTransparency = input.int(defval=80, title='BoS Border Box Transparency', minval=0, maxval=100, group='Crossovers')
bosMaxBoxSet = input.int(defval=10, title='Maximum BoS Box Displayed', minval=1, maxval=100, group='Crossovers', tooltip='Minimum = 1, Maximum = 100')

plotHVB = input.bool(defval=false, title='Plot HVB', group='High Volume Bar', tooltip='A candle where the average volume is higher than last few bars.')
hvbBullColor = input.color(defval=color.green, title='Bullish HVB Color', inline='Set Custom Color', group='High Volume Bar')
hvbBearColor = input.color(defval=color.red, title='Bearish HVB Color', inline='Set Custom Color', group='High Volume Bar')
hvbEMAPeriod = input.int(defval=12, minval=1, title='Volume EMA Period', group='High Volume Bar')
hvbMultiplier = input.float(defval=1.5, title='Volume Multiplier', minval=1, maxval=100, group='High Volume Bar')

plotPPDD = input.bool(defval=false, title="Plot PPDD OB's", group='Qualitative indicators', tooltip='Premium Premium Discount Discount (PPDD) is an OB formed after liquidity sweep. It will show up by default as a triangle (Bull ▲ / Bear ▼). Also PPDD1 (by deafult maked with a x-cross ⨯) which is a weak OB formed after liquidity sweep, that fails to completely engulf the high/low, but closes beyond the trapped candles open price.')
ppddBullColor = input.color(defval=color.new(color.green, 0), title="Bullish PPDD OB's Color", group='Qualitative indicators', inline='PPDD Color')
ppddBearColor = input.color(defval=color.new(color.red, 0), title="Bearish PPDD OB's Color", group='Qualitative indicators', inline='PPDD Color')

plotOBFVG = input.bool(defval=false, title='Plot Stacked OB+FVG', group='Qualitative indicators', tooltip='Marks the candle (default with a diamond ◆) when an OB & FVG are stacked, showing momentum')
obfvgBullColor = input.color(defval=color.new(color.green, 0), title='Bullish Stacked OB+FVG Color', group='Qualitative indicators', inline='OBFVG Color')
obfvgBearColor = input.color(defval=color.new(color.red, 0), title='Bearish Stacked OB+FVG Color', group='Qualitative indicators', inline='OBFVG Color')

plotLabelOB = input.bool(defval=true, title='Plot OB Label', inline='OB label', group='Label Options')
obLabelColor = input.color(defval=color.gray, title='Color', inline='OB label', group='Label Options')
obLabelSize = input.string(defval=size.small, title="Size", options=[size.huge, size.large, size.small, size.tiny, size.auto, size.normal], inline='OB label', group='Label Options')
plotLabelFVG = input.bool(defval=true, title='Plot FVG Label', inline='FVG label', group='Label Options')
fvgLabelColor = input.color(defval=color.gray, title='Color', inline='FVG label', group='Label Options')
fvgLabelSize = input.string(defval=size.tiny, title="Size", options=[size.huge, size.large, size.small, size.tiny, size.auto, size.normal], inline='FVG label', group='Label Options')
plotLabelRJB = input.bool(defval=true, title='Plot RJB Label', inline='RJB label', group='Label Options')
rjbLabelColor = input.color(defval=color.gray, title='Color', inline='RJB label', group='Label Options')
rjbLabelSize = input.string(defval=size.tiny, title="Size", options=[size.huge, size.large, size.small, size.tiny, size.auto, size.normal], inline='RJB label', group='Label Options')
plotLabelBOS = input.bool(defval=true, title='Plot BoS Label', inline='BOS label', group='Label Options')
bosLabelColor = input.color(defval=color.gray, title='Color', inline='BOS label', group='Label Options')
bosLabelSize = input.string(defval=size.tiny, title="Size", options=[size.huge, size.large, size.small, size.tiny, size.auto, size.normal], inline='BOS label', group='Label Options')

//Box Types
var int _ob  = 1
var int _fvg = 2
var int _rjb = 3
var int _bos = 4

//Box Labels
var string _obLabel  = "OB"
var string _fvgLabel = "FVG"
var string _rjbLabel = "RJB"
var string _bosLabel = "BoS"
var string _plus     = "+"
var string _minus    = "-"
var string _empty    = ""

//Box Arrays
var box[] _bearBoxesOB  = array.new_box()
var box[] _bullBoxesOB  = array.new_box()
var box[] _bearBoxesFVG = array.new_box()
var box[] _bullBoxesFVG = array.new_box()
var box[] _bearBoxesRJB = array.new_box()
var box[] _bullBoxesRJB = array.new_box()
var box[] _bearBoxesBOS = array.new_box()
var box[] _bullBoxesBOS = array.new_box()

//Functions
isUp(index) =>
    close[index] > open[index]

isDown(index) =>
    close[index] < open[index]

isObUp(index) =>
    isDown(index + 1) and isUp(index) and close[index] > high[index + 1]

isObDown(index) =>
    isUp(index + 1) and isDown(index) and close[index] < low[index + 1]

isFvgUp(index) =>
    (low[index] > high[index + 2])

isFvgDown(index) =>
    (high[index] < low[index + 2])

//Function to Calculte Box Length
_controlBox(_boxes, _high, _low, _type) =>
    if array.size(_boxes) > 0
        for i = array.size(_boxes) - 1 to 0 by 1
            _box = array.get(_boxes, i)
            _boxLow = box.get_bottom(_box)
            _boxHigh = box.get_top(_box)
            _boxRight = box.get_right(_box)
            if bosBoxFlag and _type == _bos
                if na or (bar_index + bosBoxLength - 1 == _boxRight and not((_high > _boxLow and _low < _boxLow) or (_high > _boxHigh and _low < _boxHigh)))
                    box.set_right(_box, bar_index + bosBoxLength - 1)
            else if (filterMitOB and _type == _ob) or (filterMitFVG and _type == _fvg) or (filterMitRJB and _type == _rjb)
                if na or (bar_index == _boxRight and not((_high > _boxLow and _low < _boxLow) or (_high > _boxHigh and _low < _boxHigh)))
                    box.set_right(_box, bar_index + 1)
                else
                    if _type == _ob
                        box.set_bgcolor(_box, mitOBColor)
                        box.set_border_color(_box, mitOBColor)
                    else if _type == _fvg
                        box.set_bgcolor(_box, mitFVGColor)
                        box.set_border_color(_box, mitFVGColor)
                    else if _type == _rjb
                        box.set_bgcolor(_box, mitRJBColor)
                        box.set_border_color(_box, mitRJBColor)
            else
                if na or (bar_index == _boxRight and not((_high > _boxLow and _low < _boxLow) or (_high > _boxHigh and _low < _boxHigh)))
                    box.set_right(_box, bar_index + 1)

//////////////////// Pivots //////////////////// 
hih = ta.pivothigh(high, pivotLookup, pivotLookup)
lol = ta.pivotlow(low , pivotLookup, pivotLookup)
top = ta.valuewhen(hih, high[pivotLookup], 0)
bottom = ta.valuewhen(lol, low [pivotLookup], 0)
plot(top, offset=-pivotLookup, linewidth=1, color=(top != top[1] ? na : (plotPVT ? pvtTopColor : na)), title="Pivot Top")
plot(bottom, offset=-pivotLookup, linewidth=1, color=(bottom != bottom[1] ? na : (plotPVT ? pvtBottomColor : na)), title="Pivot Bottom")

//////////////////// Order Block //////////////////
//Bullish OB Box Plotting
if isObUp(1) and plotOB
    _bullboxOB = box.new(left=bar_index - 2, top=high[2], right=bar_index, bottom=math.min(low[2], low[1]), border_color=color.new(obBullColor, obBorderTransparency), border_style=obBoxBorder, border_width=1, bgcolor=obBullColor, 
     text=plotLabelOB ? _obLabel  + _plus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=obLabelSize, text_color=obLabelColor)
    if array.size(_bullBoxesOB) > obMaxBoxSet
        box.delete(array.shift(_bullBoxesOB))
    array.push(_bullBoxesOB, _bullboxOB)

//Bearish OB Box Plotting
if isObDown(1) and plotOB
    _bearboxOB = box.new(left=bar_index - 2, top=math.max(high[2], high[1]), right=bar_index, bottom=low[2], border_color=color.new(obBearColor, obBorderTransparency), border_style=obBoxBorder, border_width=1, bgcolor=obBearColor, 
     text=plotLabelOB ? _obLabel  + _minus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=obLabelSize, text_color=obLabelColor)
    if array.size(_bearBoxesOB) > obMaxBoxSet
        box.delete(array.shift(_bearBoxesOB))
    array.push(_bearBoxesOB, _bearboxOB)
    
if plotOB
    _controlBox(_bearBoxesOB, high, low, _ob)
    _controlBox(_bullBoxesOB, high, low, _ob)

//////////////////// Fair Value Gap //////////////////
//Bullish FVG Box Plotting
if isFvgUp(0)
    box _bullboxFVG = na
    if plotStructureBreakingFVG and (close[1] > top) and (low[1] < top) and (high[2] < top) and (low > top)
        _bullboxFVG := box.new(left=bar_index-2, top=low[0], right=bar_index, bottom=high[2], bgcolor=fvgStructBreakingColor, border_color=color.new(fvgStructBreakingColor, fvgBorderTransparency), border_style=fvgBoxBorder, border_width=1,
         text=plotLabelFVG ? _fvgLabel  + _plus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=fvgLabelSize, text_color=fvgLabelColor)        
    else if plotFVG   
        _bullboxFVG := box.new(left=bar_index-2, top=low[0], right=bar_index, bottom=high[2], bgcolor=fvgBullColor, border_color=color.new(fvgBullColor, fvgBorderTransparency), border_style=fvgBoxBorder, border_width=1,
         text=plotLabelFVG ? _fvgLabel  + _plus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=fvgLabelSize, text_color=fvgLabelColor)    
    if array.size(_bullBoxesFVG) > fvgMaxBoxSet
        box.delete(array.shift(_bullBoxesFVG))
    array.push(_bullBoxesFVG, _bullboxFVG)

//Bearish FVG Box Plotting    
if isFvgDown(0)
    box _bearboxFVG = na
    if plotStructureBreakingFVG and (close[1] < bottom) and (high[1] > bottom) and (low[2] > bottom) and (high < bottom)
        _bearboxFVG := box.new(left=bar_index-2, top=low[2], right=bar_index, bottom=high[0], bgcolor=fvgStructBreakingColor, border_color=color.new(fvgStructBreakingColor, fvgBorderTransparency), border_style=fvgBoxBorder, border_width=1,
         text=plotLabelFVG ? _fvgLabel  + _minus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=fvgLabelSize, text_color=fvgLabelColor)    
    else if plotFVG
        _bearboxFVG := box.new(left=bar_index-2, top=low[2], right=bar_index, bottom=high[0], bgcolor=fvgBearColor, border_color=color.new(fvgBearColor, fvgBorderTransparency), border_style=fvgBoxBorder, border_width=1,
         text=plotLabelFVG ? _fvgLabel  + _minus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=fvgLabelSize, text_color=fvgLabelColor)    
    if array.size(_bearBoxesFVG) > fvgMaxBoxSet
        box.delete(array.shift(_bearBoxesFVG))
    array.push(_bearBoxesFVG, _bearboxFVG)
    
if plotFVG or plotStructureBreakingFVG
    _controlBox(_bearBoxesFVG, high, low, _fvg)
    _controlBox(_bullBoxesFVG, high, low, _fvg)

//////////////////// Rejection Block //////////////////
if plotRJB
    isDownRjbObCondition = isObDown(1)
    isDownRjb1 = isDownRjbObCondition and  (high[1] < (close[2] + 0.2*(high[2]-close[2]))) // RJB is on trapped's wick and <50% of the wick was covered by signal
    isDownRjb2 = isDownRjbObCondition and (high[1] > high[2]) // RJB is on signal's wick
    if isDownRjb1 and plotRJB
        _bearboxRJB = box.new(left=bar_index-2, top=high[2], right=bar_index, bottom=close[2], bgcolor=rjbBearColor, border_color=color.new(rjbBearColor, rjbBorderTransparency), border_style=rjbBoxBorder, border_width=1,
         text=plotLabelRJB ? _rjbLabel  + _minus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=rjbLabelSize, text_color=rjbLabelColor)
        if array.size(_bearBoxesRJB) > rjbMaxBoxSet
            box.delete(array.shift(_bearBoxesRJB))
        array.push(_bearBoxesRJB, _bearboxRJB)
        
    if isDownRjb2 and plotRJB
        _bearboxRJB = box.new(left=bar_index-1, top=high[1], right=bar_index, bottom=open[1], bgcolor=rjbBearColor, border_color=color.new(rjbBearColor, rjbBorderTransparency), border_style=rjbBoxBorder, border_width=1,
         text=plotLabelRJB ? _rjbLabel  + _minus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=rjbLabelSize, text_color=rjbLabelColor)
        if array.size(_bearBoxesRJB) > rjbMaxBoxSet
            box.delete(array.shift(_bearBoxesRJB))
        array.push(_bearBoxesRJB, _bearboxRJB)

//Bullish RJB Box Plotting
if plotRJB
    isUpRjbObCondition = isObUp(1)
    isUpRjb1 = isUpRjbObCondition and (low[1] > (close[2] - 0.2*(close[2]-low[2]))) // RJB is on trapped's wick and <50% of the wick was covered by signal
    isUpRjb2 = isUpRjbObCondition and (low[1] < low[2]) // RJB is on signal's wick
    if isUpRjb1 and plotRJB
        _bullboxRJB = box.new(left=bar_index-2, top=close[2], right=bar_index, bottom=low[2], bgcolor=rjbBullColor, border_color=color.new(rjbBullColor, rjbBorderTransparency), border_style=rjbBoxBorder, border_width=1,
         text=plotLabelRJB ? _rjbLabel  + _plus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=rjbLabelSize, text_color=rjbLabelColor)
        if array.size(_bullBoxesRJB) > rjbMaxBoxSet
            box.delete(array.shift(_bullBoxesRJB))
        array.push(_bullBoxesRJB, _bullboxRJB)
    
    if isUpRjb2 and plotRJB
        _bullboxRJB = box.new(left=bar_index-1, top=open[1], right=bar_index, bottom=low[1], bgcolor=rjbBullColor, border_color=color.new(rjbBullColor, rjbBorderTransparency), border_style=rjbBoxBorder, border_width=1, 
         text=plotLabelRJB ? _rjbLabel  + _plus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=rjbLabelSize, text_color=rjbLabelColor)
        if array.size(_bullBoxesRJB) > rjbMaxBoxSet
            box.delete(array.shift(_bullBoxesRJB))
        array.push(_bullBoxesRJB, _bullboxRJB)

if plotRJB
    _controlBox(_bearBoxesRJB, high, low, _rjb)
    _controlBox(_bullBoxesRJB, high, low, _rjb)

//////////////////// Crossovers a.k.a. Break of Structure ////////////////////
//Bullish BOS Box Plotting
if plotBOS
    if ta.crossover(useHighLowForBullishBoS ? high : close, top)
        _bullboxBOS = box.new(left=bar_index, top=top, right=bosBoxFlag ? bar_index+bosBoxLength : bar_index+1, bottom=bottom, bgcolor=bosBullColor, border_color=color.new(bosBullColor, bosBorderTransparency), border_style=bosBoxBorder, border_width=1, 
         text=plotLabelBOS ? _bosLabel + _plus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=bosLabelSize, text_color=bosLabelColor)
        if array.size(_bullBoxesBOS) > bosMaxBoxSet
            box.delete(array.shift(_bullBoxesBOS))
        array.push(_bullBoxesBOS, _bullboxBOS)

//Bearish BOS Box Plotting        
if plotBOS 
    if ta.crossunder(useHighLowForBearishBoS ? low : close, bottom)
        _bearboxBOS = box.new(left=bar_index, top=top, right=bosBoxFlag ? bar_index+bosBoxLength : bar_index+1, bottom=bottom, bgcolor=bosBearColor, border_color=color.new(bosBearColor, bosBorderTransparency), border_style=bosBoxBorder, border_width=1, 
         text=plotLabelBOS ? _bosLabel  + _minus : _empty, text_halign=text.align_right, text_valign=text.align_bottom, text_size=bosLabelSize, text_color=bosLabelColor)
        if array.size(_bearBoxesBOS) > bosMaxBoxSet
            box.delete(array.shift(_bearBoxesBOS))
        array.push(_bearBoxesBOS, _bearboxBOS)

if plotBOS
    _controlBox(_bearBoxesBOS, high, low, _bos)
    _controlBox(_bullBoxesBOS, high, low, _bos)

//////////////////// Premium Premium & Discount Discount //////////////////
premiumPremium = plotPPDD and isObDown(0) and ((math.max(high, high[1]) > top and close < top) or (math.max(high, high[1]) > top[1] and close < top[1]))
discountDiscount = plotPPDD and isObUp(0) and ((math.min(low, low[1]) < bottom and close > bottom) or (math.min(low, low[1]) < bottom[1] and close > bottom[1]))
plotshape(premiumPremium, "Bearish PPDD OB", style=shape.triangledown , location=location.abovebar, color=ppddBearColor, size=size.tiny)
plotshape(discountDiscount, "Bullish PPDD OB", style=shape.triangleup , location=location.belowbar, color=ppddBullColor, size=size.tiny)

premiumPremium1 = plotPPDD and (isUp(1) and isDown(0) and close[0] < open[1]) and ((math.max(high, high[1]) > top and close < top) or (math.max(high, high[1]) > top[1] and close < top[1])) and not premiumPremium
discountDiscount1 = plotPPDD and (isDown(1) and isUp(0) and close[0] > open[1]) and ((math.min(low, low[1]) < bottom and close > bottom) or (math.min(low, low[1]) < bottom[1] and close > bottom[1])) and not discountDiscount
plotshape(premiumPremium1, "Bearish PPDD Weak OB", style=shape.xcross, location=location.abovebar, color=ppddBearColor, size=size.tiny)
plotshape(discountDiscount1, "Bullish PPDD Weak OB", style=shape.xcross, location=location.belowbar, color=ppddBullColor, size=size.tiny)

////////////////// High Volume Bars //////////////////
volEma = ta.ema(volume, hvbEMAPeriod)
isHighVolume = volume > (hvbMultiplier * volEma)
barcolor(plotHVB and isUp(0) and isHighVolume ? hvbBullColor : na, title="Bullish HVB")
barcolor(plotHVB and isDown(0) and isHighVolume ? hvbBearColor : na, title="Bearish HVB")

///////////////// Stacked OB + FVG //////////////////
plotshape(plotOBFVG and isFvgDown(0) and isObDown(1), "Bearish OB+FVG Stack", style=shape.diamond, location=location.abovebar, color=obfvgBearColor, size=size.tiny)
plotshape(plotOBFVG and isFvgUp(0) and isObUp(1), "Bullish OB+FVG Stack", style=shape.diamond, location=location.belowbar, color=obfvgBullColor, size=size.tiny)


// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main finish (super orderblock)                                           ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝