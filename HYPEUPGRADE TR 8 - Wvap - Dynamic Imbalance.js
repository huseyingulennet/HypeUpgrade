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
// ║ creators  : HYPEUPGRADETR, By Leviathan, SpacemanBTC, crypto_kai, glaz       ║
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
AQUA    = #00FFFF
BLACK   = #000000
BLUE    = #0000FF
FUCHSIA = #FF00FF
GRAY    = #808080
GREEN   = #008000
LIME    = #00FF00
MAROON  = #800000
NAVY    = #000080
OLIVE   = #808000
ORANGE  = #FF7F00
PURPLE  = #800080
RUBI    = #FF0000
SILVER  = #C0C0C0
TEAL    = #008080
YELLOW  = #FFFF00
WHITE   = #FFFFFF

// ╔══════════════════════════════════════╗
// ║                                      ║
// ║     indicator functions              ║
// ║                                      ║
// ╚══════════════════════════════════════╝


indicator('HYPEUPGRADETR 5', overlay=true, max_boxes_count=500, max_bars_back=1000, max_lines_count=500)
//indicator("Market sessions and Volume profile - By Leviathan", overlay=true, max_boxes_count=500, max_bars_back=1000)
//indicator(title='RSI Chart Bars', overlay=true, shorttitle='RSI Bars')
//indicator('Imbalance Finder Dynamic', overlay=true, max_lines_count=500, max_boxes_count=500)
//indicator('Key Levels SpacemanBTC IDWM', shorttitle='SpacemanBTC Key Level V13.1', overlay=true, max_lines_count=100)


// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main start (market day)                                                  ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

show_monday = input.bool(false, "Monday-Pazartesi", group="/// MARKET GÜNLERİ ///")
show_tuesday = input.bool(false, "Tuesday-Salı", group="/// MARKET GÜNLERİ ///")
show_wednesday = input.bool(false, "Wednesday-Çarşamba", group="/// MARKET GÜNLERİ ///")
show_thursday = input.bool(false, "Thursday-Perşembe", group="/// MARKET GÜNLERİ ///")
show_friday = input.bool(false, "Friday-Cuma", group="/// MARKET GÜNLERİ ///")
show_saturday = input.bool(true, "Saturday-Cumartesi", group="/// MARKET GÜNLERİ ///")
show_sunday = input.bool(true, "Sunday-Pazar", group="/// MARKET GÜNLERİ ///")
transp = input.int(85, "Transp", minval=0, maxval=100, group="/// MARKET GÜNLERİ ///")

c_monday = color.new(color.red, transp)
c_tuesday = color.new(color.orange, transp)
c_wednesday = color.new(color.yellow, transp)
c_thursday = color.new(color.green, transp)
c_friday = color.new(color.aqua, transp)
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
// ║     main start (market sessions)                                             ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

//==========================
//Inputs
//==========================
sessionType = input.string('Daily', 'Session Type', options=['Tokyo','London','New York','Daily','Weekly', 'Monthly', 'Quarterly', 'Yearly'], group="/// MARKET SEANSLARI ///")

showProf = input.bool(false, 'Show Volume Profile', group='/// MARKET SEANSLARI ///')
showSbox = input.bool(false, 'Show Session Box', group='/// MARKET SEANSLARI ///')
showPoc = input.bool(true, 'Show POC', group='/// MARKET SEANSLARI ///')
showVA = input.bool(true, 'Show VAH and VAL', group='/// MARKET SEANSLARI ///')
showVAb = input.bool(false, 'Show Value Area Box', group='/// MARKET SEANSLARI ///')
showCur = input.bool(false, 'Show Live Zone', group='/// MARKET SEANSLARI ///')
showLabels = input.bool(true, 'Show Session Lables', group='/// MARKET SEANSLARI ///')
showFx = input.bool(false, 'Show Forex Sessions (no profile)', group='/// MARKET SEANSLARI ///')
resolution = input.int(30, 'Resolution', minval=5, tooltip='The higher the value, the more refined of a profile, but less profiles shown on chart', group='Volume Profile Settings')
VAwid = input.int(70, 'Value Area Volume %', minval=1, maxval=100, group='Volume Profile Settings')
dispMode = input.string('Mode 2', 'Bar Mode', ['Mode 1', 'Mode 2', 'Mode 3'], group='Volume Profile Settings')
volType = input.string('Volume', 'Profile Data Type', options=['Volume', 'Open Interest'], group='Volume Profile Settings')
smoothVol = input.bool(false, 'Smooth Volume Data', tooltip='Useful for assets that have very large spikes in volume over large bars - helps create better profiles', group='Volume Profile Settings')
dataTf = ''

bullCol = input.color(color.rgb(76, 175, 79, 50), 'Up Volume', group='Appearance')
bearCol = input.color(color.rgb(255, 82, 82, 50), 'Down Volume', group='Appearance')
VAbCol = input.color(color.rgb(107, 159, 255, 90), 'Value Area Box', group='Appearance' )
pocCol = input.color(color.red, 'POC', inline='p', group='Appearance')
pocWid = input.int(2, 'Thickness', inline='p', group='Appearance')
vahCol = input.color(color.aqua, 'VAH', inline='h', group='Appearance')
vahWid = input.int(1, 'Thickness', inline='h', group='Appearance')
valCol = input.color(color.aqua, 'VAL', inline='l', group='Appearance')
valWid = input.int(1, 'Thickness', inline='l', group='Appearance')
boxBg = input.color(color.rgb(255, 153, 0, 100), 'Box', inline='m', group='Appearance')
boxWid = input.int(1, 'Thickness', inline='m', group='Appearance')

//==========================
//Constants / Variable Declaration
//==========================
var int zoneStart = 0
var int tokyoStart = 0
var int londonStart = 0
var int nyStart = 0
int lookback = bar_index - zoneStart
var activeZone = false

// Defining arrays that store the information
var vpGreen = array.new_float(resolution, 0) // Sum of volume on long bars
var vpRed = array.new_float(resolution, 0) // Same thing but with red bars
var zoneBounds = array.new_float(resolution, 0) // array that stores the highest value that can be in a zone

//Values to store current intra bar data
var float[] ltfOpen =  array.new_float(0)
var float[] ltfClose =  array.new_float(0)
var float[] ltfHigh =  array.new_float(0)
var float[] ltfLow =  array.new_float(0)
var float[] ltfVolume = array.new_float(0)

//Getting OI Data
string userSymbol = syminfo.prefix + ":" + syminfo.ticker
string openInterestTicker = str.format("{0}_OI", userSymbol)
string timeframe = syminfo.type == "futures" and timeframe.isintraday ? "1D" : timeframe.period
deltaOi = request.security(openInterestTicker, timeframe, close-close[1], ignore_invalid_symbol = true)

//Selecting what vol type to use
vol() =>
    out = smoothVol ? ta.ema(volume, 5) : volume
    if volType == 'Open Interest'
        out := deltaOi
    out

//Getting intrabar intial data
[dO, dC, dH, dL, dV] = request.security_lower_tf(syminfo.tickerid, dataTf, [open, close, high, low, vol()])

//==========================
//Functions
//==========================
resetProfile(enable) =>
    if enable
        array.fill(vpGreen, 0)
        array.fill(vpRed, 0)
        array.clear(ltfOpen)
        array.clear(ltfHigh)
        array.clear(ltfLow)
        array.clear(ltfClose)
        array.clear(ltfVolume)

profHigh = ta.highest(high, lookback+1)[1]
profLow = ta.lowest(low, lookback+1)[1]

tr = ta.atr(1)
atr = ta.atr(14)

get_vol(y11, y12, y21, y22, height, vol) =>
    nz(math.max(math.min(math.max(y11, y12), math.max(y21, y22)) - math.max(math.min(y11, y12), math.min(y21, y22)), 0) * vol / height)

profileAdd(o, h, l, c, v, g, w) =>
    //Array to store how much to distribute in each zone, on scale of 1 for full gap size to 0
    zoneDist = array.new_float(resolution, 0)
    distSum = 0.0
    // Going over each zone
    for i = 0 to array.size(vpGreen) - 1
        // Checking to see if cur bar is in zone
        zoneTop = array.get(zoneBounds, i)
        zoneBot = zoneTop - g

        body_top = math.max(c, o)
        body_bot = math.min(c, o)
        itsgreen = c >= o

        topwick = h - body_top
        bottomwick = body_bot - l
        body = body_top - body_bot

        bodyvol = body * v / (2 * topwick + 2 * bottomwick + body)
        topwickvol = 2 * topwick * v / (2 * topwick + 2 * bottomwick + body)
        bottomwickvol = 2 * bottomwick * v / (2 * topwick + 2 * bottomwick + body)

        if volType == 'Volume'
            array.set(vpGreen, i, array.get(vpGreen, i) + (itsgreen ? get_vol(zoneBot, zoneTop, body_bot, body_top, body, bodyvol) : 0) + get_vol(zoneBot, zoneTop, body_top, h, topwick, topwickvol) / 2 + get_vol(zoneBot, zoneTop, body_bot, l, bottomwick, bottomwickvol) / 2)
            array.set(vpRed, i, array.get(vpRed, i) + (itsgreen ? 0 : get_vol(zoneBot, zoneTop, body_bot, body_top, body, bodyvol)) + get_vol(zoneBot, zoneTop, body_top, h, topwick, topwickvol) / 2 + get_vol(zoneBot, zoneTop, body_bot, l, bottomwick, bottomwickvol) / 2)
        else if volType == 'Open Interest'
            if v > 0
                array.set(vpGreen, i, array.get(vpGreen, i) + get_vol(zoneBot, zoneTop, body_bot, body_top, body, v))// + get_vol(zoneBot, zoneTop, body_top, h, topwick, topwickvol) / 2 + get_vol(zoneBot, zoneTop, body_bot, l, bottomwick, bottomwickvol) / 2)
            if v < 0
                array.set(vpRed, i, array.get(vpRed, i) + get_vol(zoneBot, zoneTop, body_bot, body_top, body, -v))// + get_vol(zoneBot, zoneTop, body_top, h, topwick, topwickvol) / 2 + get_vol(zoneBot, zoneTop, body_bot, l, bottomwick, bottomwickvol) / 2)

calcSession(update) =>
    array.fill(vpGreen, 0)
    array.fill(vpRed, 0)
    if bar_index > lookback and update
        gap = (profHigh - profLow) / resolution

        // Defining profile bounds
        for i = 0 to resolution - 1
            array.set(zoneBounds, i, profHigh - gap * i)

        // Putting each bar inside zone into the volume profile array
        if array.size(ltfOpen) > 0
            for j = 0 to array.size(ltfOpen) - 1
                profileAdd(array.get(ltfOpen, j), array.get(ltfHigh, j), array.get(ltfLow, j), array.get(ltfClose, j), array.get(ltfVolume, j), gap, 1)

pocLevel() =>
    float maxVol = 0
    int levelInd = 0
    for i = 0 to array.size(vpRed) - 1
        if array.get(vpRed, i) + array.get(vpGreen, i) > maxVol
            maxVol := array.get(vpRed, i) + array.get(vpGreen, i)
            levelInd := i

    float outLevel = na
    if levelInd != array.size(vpRed) - 1
        outLevel := array.get(zoneBounds, levelInd) - (array.get(zoneBounds, levelInd) - array.get(zoneBounds, levelInd+1)) / 2
    outLevel

valueLevels(poc) =>
    float gap = (profHigh - profLow) / resolution
    float volSum = array.sum(vpRed) + array.sum(vpGreen)
    float volCnt = 0

    float vah = profHigh
    float val = profLow

    //Finding poc index
    int pocInd = 0
    for i = 0 to array.size(zoneBounds)-2
        if array.get(zoneBounds, i) >= poc and array.get(zoneBounds, i + 1) < poc
            pocInd := i

    volCnt += (array.get(vpRed, pocInd) + array.get(vpGreen, pocInd))
    for i = 1 to array.size(vpRed)
        if pocInd + i >= 0 and pocInd + i < array.size(vpRed)
            volCnt += (array.get(vpRed, pocInd + i) + array.get(vpGreen, pocInd + i))
            if volCnt >= volSum * (VAwid/100)
                break
            else
                val := array.get(zoneBounds, pocInd + i) - gap
        if pocInd - i >= 0 and pocInd - i < array.size(vpRed)
            volCnt += (array.get(vpRed, pocInd - i) + array.get(vpGreen, pocInd - i))
            if volCnt >= volSum * (VAwid/100)
                break
            else
                vah := array.get(zoneBounds, pocInd - i)

    [val, vah]

drawNewZone(update) =>
    if bar_index > lookback and update and array.sum(vpGreen) + array.sum(vpRed) > 0
        gap = (profHigh - profLow) / resolution
        float leftMax = bar_index[lookback]
        float rightMax = bar_index[int(lookback / 1.4)]
        float rightMaxVol = array.max(vpGreen)+array.max(vpRed)
        float buffer = gap / 10
        if showLabels
            label.new((bar_index - 1 + int(leftMax))/2, profHigh, sessionType, color=color.rgb(0,0,0,100), textcolor=chart.fg_color)
        if showProf
            for i = 0 to array.size(vpRed) - 1
                greenEnd = int(leftMax + (rightMax - leftMax) * (array.get(vpGreen, i) / rightMaxVol))
                redEnd = int(greenEnd + (rightMax - leftMax) * (array.get(vpRed, i) / rightMaxVol))
                if dispMode == 'Mode 2'
                    box.new(int(leftMax), array.get(zoneBounds, i) - buffer, greenEnd, array.get(zoneBounds, i) - gap + buffer, bgcolor=bullCol, border_width=0)
                    box.new(greenEnd, array.get(zoneBounds, i) - buffer, redEnd, array.get(zoneBounds, i) - gap + buffer, bgcolor=bearCol, border_width=0)
                else if dispMode == 'Mode 1'
                    box.new(int(leftMax), array.get(zoneBounds, i) - buffer, greenEnd, array.get(zoneBounds, i) - gap + buffer, bgcolor=bullCol, border_width=0)
                else
                    box.new(int(leftMax), array.get(zoneBounds, i) - buffer, greenEnd, array.get(zoneBounds, i) - gap + buffer, bgcolor=bullCol, border_width=0)
                    box.new(int(leftMax)-redEnd+greenEnd, array.get(zoneBounds, i) - buffer, int(leftMax), array.get(zoneBounds, i) - gap + buffer, bgcolor=bearCol, border_width=0)

        box.new(int(leftMax), profHigh, bar_index-1, profLow, chart.fg_color, boxWid, line.style_dashed, bgcolor=boxBg)
        poc = pocLevel()
        [val, vah] = valueLevels(poc)
        if showPoc
            line.new(int(leftMax), poc, bar_index-1, poc, color=pocCol, width=pocWid)
        if showVA
            line.new(int(leftMax), vah, bar_index-1, vah, color=vahCol, width=vahWid)
            line.new(int(leftMax), val, bar_index-1, val, color=valCol, width=valWid)
        if showVAb
            box.new(int(leftMax), vah, bar_index-1, val, border_color=color.rgb(54, 58, 69, 100), bgcolor=VAbCol)


    //if update
    //    resetProfile(true)

drawCurZone(update, delete) =>
    var line pocLine = na
    var line vahLine = na
    var line valLine = na
    var box outBox = na
    var label sessionLab = na

    var redBoxes = array.new_box(array.size(vpRed), na)
    var greenBoxes = array.new_box(array.size(vpRed), na)

    if bar_index > lookback and update and array.sum(vpGreen) + array.sum(vpRed) > 0
        //Clearing the previous boxes and array
        if not na(pocLine)
            line.delete(pocLine)
        if not na(vahLine)
            line.delete(vahLine)
        if not na(valLine)
            line.delete(valLine)
        if not na(outBox)
            box.delete(outBox)
        if not na(sessionLab)
            label.delete(sessionLab)

        for i = 0 to array.size(redBoxes) - 1
            if not na(array.get(redBoxes, i))
                box.delete(array.get(redBoxes, i))
                box.delete(array.get(greenBoxes, i))


        gap = (profHigh - profLow) / resolution
        float leftMax = bar_index[lookback]
        float rightMax = bar_index[int(lookback / 1.4)]
        float rightMaxVol = array.max(vpGreen)+array.max(vpRed)
        float buffer = gap / 10
        if showLabels
            sessionLab := label.new((bar_index - 1 + int(leftMax))/2, profHigh, sessionType, color=color.rgb(0,0,0,100), textcolor=chart.fg_color)
        if showProf
            for i = 0 to array.size(vpRed) - 1
                greenEnd = int(leftMax + (rightMax - leftMax) * (array.get(vpGreen, i) / rightMaxVol))
                redEnd = int(greenEnd + (rightMax - leftMax) * (array.get(vpRed, i) / rightMaxVol))
                if dispMode == 'Mode 2'
                    array.set(greenBoxes, i, box.new(int(leftMax), array.get(zoneBounds, i) - buffer, greenEnd, array.get(zoneBounds, i) - gap + buffer, bgcolor=bullCol, border_width=0))
                    array.set(redBoxes, i, box.new(greenEnd, array.get(zoneBounds, i) - buffer, redEnd, array.get(zoneBounds, i) - gap + buffer, bgcolor=bearCol, border_width=0))
                else if dispMode == 'Mode 1'
                    array.set(greenBoxes, i, box.new(int(leftMax), array.get(zoneBounds, i) - buffer, greenEnd, array.get(zoneBounds, i) - gap + buffer, bgcolor=bullCol, border_width=0))
                else
                    array.set(greenBoxes, i, box.new(int(leftMax), array.get(zoneBounds, i) - buffer, greenEnd, array.get(zoneBounds, i) - gap + buffer, bgcolor=bullCol, border_width=0))
                    array.set(redBoxes, i, box.new(int(leftMax)-redEnd+greenEnd, array.get(zoneBounds, i) - buffer, int(leftMax), array.get(zoneBounds, i) - gap + buffer, bgcolor=bearCol, border_width=0))

        outBox := box.new(int(leftMax), profHigh, bar_index-1, profLow, chart.fg_color, boxWid, line.style_dashed, bgcolor=boxBg)


        poc = pocLevel()
        [val, vah] = valueLevels(poc)
        if showPoc
            line.delete(pocLine)
            pocLine := line.new(int(leftMax), poc, bar_index-1, poc, color=pocCol, width=pocWid)
        if showVA
            line.delete(vahLine)
            line.delete(valLine)
            vahLine := line.new(int(leftMax), vah, bar_index-1, vah, color=vahCol, width=vahWid)
            valLine := line.new(int(leftMax), val, bar_index-1, val, color=valCol, width=valWid)
        if showVAb
            box.new(int(leftMax), vah, bar_index-1, val, border_color=color.rgb(54, 58, 69, 100), bgcolor=VAbCol)

    if delete
        box.delete(outBox)
        line.delete(pocLine)
        line.delete(vahLine)
        line.delete(valLine)
        for i = 0 to array.size(greenBoxes)-1
            box.delete(array.get(greenBoxes, i))
        for i = 0 to array.size(redBoxes)-1
            box.delete(array.get(redBoxes, i))

drawForexBox(startBar, title, top, bottom) =>
    box.new(int(startBar), top, bar_index-1, bottom, chart.fg_color, boxWid, line.style_dashed, bgcolor=boxBg)
    if showLabels
        label.new((bar_index - 1 + int(startBar))/2, top, title, color=color.rgb(0,0,0,100), textcolor=chart.fg_color)


combArray(arr1, arr2) =>
    out = array.copy(arr1)
    if array.size(arr2) > 0
        for i = 0 to array.size(arr2) - 1
            array.push(out, array.get(arr2, i))
    out

updateIntra(o, h, l, c, v) =>
    if array.size(o) > 0
        for i = 0 to array.size(o) - 1
            array.push(ltfOpen, array.get(o, i))
            array.push(ltfHigh,array.get(h, i))
            array.push(ltfLow,array.get(l, i))
            array.push(ltfClose,array.get(c, i))
            array.push(ltfVolume,array.get(v, i))


//==========================
//Calculations
//==========================
//Detecting different start dates
newDaily = dayofweek != dayofweek[1]
newWeekly = weekofyear != weekofyear[1]
newMonthly = (dayofmonth != dayofmonth[1] + 1) and (dayofmonth != dayofmonth[1])
newYearly = year != year[1]
newQuarterly = month != month[1] and (month - 1) % 3 == 0

utcHour = hour(time(timeframe.period, '0000-2400', 'GMT'), 'GMT')

newTokyo = utcHour != utcHour[1] + 1 and utcHour != utcHour[1]
endTokyo = utcHour >= 9 and utcHour[1] < 9

newLondon = utcHour >= 7 and utcHour[1] < 7
endLondon = utcHour >= 16 and utcHour[1] < 16

newNewYork = utcHour >= 13 and utcHour[1] < 13
endNewYork = utcHour >= 22 and utcHour[1] < 22

newSession = switch sessionType
    'Tokyo' => newTokyo
    'London' => newLondon
    'New York' => newNewYork
    'Daily' => newDaily
    'Weekly' => newWeekly
    'Monthly' => newMonthly
    'Yearly' => newYearly
    'Quarterly' => newQuarterly
    => newDaily

zoneEnd = switch sessionType
    'Tokyo' => endTokyo
    'London' => endLondon
    'New York' => endNewYork
    'Daily' => newDaily
    'Weekly' => newWeekly
    'Monthly' => newMonthly
    'Yearly' => newYearly
    'Quarterly' => newQuarterly
    => newDaily

isForex = showFx

//Re calculating and drawing zones
calcSession(zoneEnd or (barstate.islast and showCur))
drawNewZone(zoneEnd)
drawCurZone(barstate.islast and not zoneEnd and showCur and activeZone, zoneEnd)

//Reseting profie at start of new zone
resetProfile(newSession)

//Updating data arrays
updateIntra(dO, dH, dL, dC, dV)

//Reseting zone start value
if zoneEnd
    activeZone := false

if newSession
    zoneStart := bar_index
    activeZone := true

if newLondon
    londonStart := bar_index
if newTokyo
    tokyoStart := bar_index
if newNewYork
    nyStart := bar_index

londonHigh = ta.highest(high, bar_index-londonStart+1)
tokyoHigh = ta.highest(high, bar_index-tokyoStart+1)
nyHigh = ta.highest(high, bar_index-nyStart+1)

londonLow = ta.lowest(low, bar_index-londonStart+1)
tokyoLow = ta.lowest(low, bar_index-tokyoStart+1)
nyLow = ta.lowest(low, bar_index-nyStart+1)

if endLondon and isForex
    drawForexBox(londonStart, 'London', londonHigh, londonLow)
if endNewYork and isForex
    drawForexBox(nyStart, 'New York', nyHigh, nyLow)
if endTokyo and isForex
    drawForexBox(tokyoStart, 'Tokyo', tokyoHigh, tokyoLow)

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main finish (market sessions)                                            ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝


// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main start (rsi candle)                                                  ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

src = close
len = input.int(14, minval=1, title='Length')
up = ta.rma(math.max(ta.change(src), 0), len)
down = ta.rma(-math.min(ta.change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - 100 / (1 + up / down)

//coloring method below

src1 = close
len1 = input.int(70, minval=1, title='UpLevel')
src2 = close
len2 = input.int(30, minval=1, title='DownLevel')
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
// ║     main start (key levels)                                                  ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

displayStyle = input.string(defval='Standard', title='Display Style', options=['Standard', 'Right Anchored'], inline='Display')
mergebool = input.bool(defval=true, title='Merge Levels?', inline='Display')
distanceright = input.int(defval=15, title='Distance', minval=5, maxval=500, inline='Dist')
radistance = input.int(defval=25, title='Anchor Distance', minval=5, maxval=500, inline='Dist')
labelsize = input.string(defval='Medium', title='Text Size', options=['Small', 'Medium', 'Large'])
linesize = input.string(defval='Small', title='Line Width', options=['Small', 'Medium', 'Large'], inline='Line')
linestyle = input.string(defval='Solid', title='Line Style', options=['Solid', 'Dashed', 'Dotted'], inline='Line')



GlobalTextType = input.bool(defval=true, title='Global Text ShortHand', tooltip='Enable for shorthand text on all text')
var globalcoloring = input.bool(defval=false, title='Global Coloring', tooltip='Enable for all color controls via one color', inline='GC')
GlobalColor = input.color(title='', defval=color.white, inline='GC')
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
var is_weeklyrange_enabled = input.bool(defval=false, title='Prev H/L', group='Weekly', inline='Weekly')
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
MondayColor = input.color(title='', defval=#000000, group='Monday Range', inline='Mondaysh')
WeeklyColor = input.color(title='', defval=#000000, group='Weekly', inline='Weeklysh')
MonthlyColor = input.color(title='', defval=#f23645, group='Monthly', inline='Monthlysh')
YearlyColor = input.color(title='', defval=color.red, group='Yearly', inline='Yearlysh')
quarterlyColor = input.color(title='', defval=#FF9800, group='Quarterly', inline='Quarterlysh')
IntraColor = input.color(title='', defval=color.orange, group='4H', inline='4Hsh')
LondonColor = input.color(title='', defval=color.white, group='FX Sessions', inline='FXColor')
USColor = input.color(title='', defval=color.white, group='FX Sessions', inline='FXColor')
AsiaColor = input.color(title='', defval=color.white, group='FX Sessions', inline='FXColor')
var pdhtext = GlobalTextType or DailyTextType ? 'PDH' : 'Prev Day High'
var pdltext = GlobalTextType or DailyTextType ? 'PDL' : 'Prev Day Low'
var dotext = GlobalTextType or DailyTextType ? 'DO' : 'Daily Open'
var pdmtext = GlobalTextType or DailyTextType ? 'PDM' : 'Prev Day Middle'

var pwhtext = GlobalTextType or WeeklyTextType ? 'PWH' : 'Prev Week High'
var pwltext = GlobalTextType or WeeklyTextType ? 'PWL' : 'Prev Week Low'
var wotext = GlobalTextType or WeeklyTextType ? 'WO' : 'Weekly Open'
var pwmtext = GlobalTextType or WeeklyTextType ? 'PWM' : 'Prev Week Middle'

var pmhtext = GlobalTextType or MonthlyTextType ? 'PMH' : 'Prev Month High'
var pmltext = GlobalTextType or MonthlyTextType ? 'PML' : 'Prev Month Low'
var motext = GlobalTextType or MonthlyTextType ? 'MO' : 'Monthly Open'
var pmmtext = GlobalTextType or MonthlyTextType ? 'PMM' : 'Prev Month Mid'

var pqhtext = GlobalTextType or QuarterlyTextType ? 'PQH' : 'Prev Quarterly High'
var pqltext = GlobalTextType or QuarterlyTextType ? 'PQL' : 'Prev Quarterly Low'
var qotext = GlobalTextType or QuarterlyTextType ? 'QO' : 'Quarterly Open'
var pqmtext = GlobalTextType or QuarterlyTextType ? 'PQM' : 'Prev Quarterly Mid'

var cyhtext = GlobalTextType or YearlyTextType ? 'CYH' : 'Yearly High'
var cyltext = GlobalTextType or YearlyTextType ? 'CYL' : 'Yearly Low'
var yotext = GlobalTextType or YearlyTextType ? 'YO' : 'Yearly Open'
var cymtext = GlobalTextType or YearlyTextType ? 'CYM' : 'Yearly Middle'

var pihtext = GlobalTextType or IntraTextType ? 'P-4H-H' : 'Prev 4h High'
var piltext = GlobalTextType or IntraTextType ? 'P-4H-L' : 'Prev 4h Low'
var iotext = GlobalTextType or IntraTextType ? '4H-O' : '4h Open'
var pimtext = GlobalTextType or IntraTextType ? 'P-4H-M' : 'Prev 4h Middlee'

var pmonhtext = GlobalTextType or MondayTextType ? 'MDAY-H' : 'Monday High'
var pmonltext = GlobalTextType or MondayTextType ? 'MDAY-L' : 'Monday Low'
var pmonmtext = GlobalTextType or MondayTextType ? 'MDAY-M' : 'Monday Mid'

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
