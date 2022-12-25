// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// ©kaya.uluer (based multible sources, modified and optimised by Kaya Uluer)

//@version=5
indicator(title='3 Bollinger Bands with Volume Profile, Ribbon and RSI Candles', shorttitle='3BB-VP-RIB-RSI-MACD', overlay=true, linktoseries=true, max_bars_back=1000, max_lines_count=500)

src = input.source(group='General', title='Source', defval=close)
off = input.int(group='General', title='offset', defval=0, minval=-500, maxval=500)

menbl = input.bool(group='Moving Average', title="Show Moving Average?", defval=true)
mtype = input.string(group='Moving Average', title='Type', defval='SMA', options=['SMA', 'HMA', 'EMA', 'WMA'])
mavgf = input.int(group='Moving Average', title='Moving Average Fast', defval=99, minval=3)
mavgs = input.int(group='Moving Average', title='Moving Average Slow', defval=200, minval=3)

renbl = input.bool(group='MA Ribbon', title="Show MA Ribbon?", defval=true)
rtype = input.string(group='MA Ribbon', title='Type', inline='Ribbon', defval='EMA', options=['SMA', 'HMA', 'EMA', 'WMA'])
rgaps = input.int(group='MA Ribbon', title='Gap', inline='Ribbon', defval=7, minval=5, maxval=50)

lenbl = input.bool(group='RSI Candels', title="Show RSI Candels?", defval=true)
llen  = input.int(group='RSI Candels', title='Length', defval=14, minval=1)
lev1  = input.int(group='RSI Candels', title='Up Level', defval=70, minval=1)
lev2  = input.int(group='RSI Candels', title='Down Level', defval=30, minval=1)

benbl = input.bool(group='Bollinger Bands', title="Show Bollinger Bands?", defval=false)
blen  = input.int(group='Bollinger Bands', title='Length', defval=14, minval=1)
b1enb = input.bool(group='Bollinger Bands', title="", inline='BB1', defval=false)
mult1 = input.float(group='Bollinger Bands', title='BB1 StdDev', inline='BB1', defval=2.0, minval=0.001, maxval=50)
b2enb = input.bool(group='Bollinger Bands', title="", inline='BB2', defval=false)
mult2 = input.float(group='Bollinger Bands', title='BB2 StdDev', inline='BB2', defval=3.0, minval=0.001, maxval=50)
b3enb = input.bool(group='Bollinger Bands', title="", inline='BB3', defval=false)
mult3 = input.float(group='Bollinger Bands', title='BB3 StdDev', inline='BB3', defval=4.0, minval=0.001, maxval=50)
alert = input.int(group='Bollinger Bands', title='BB number for alert', defval=1, minval=1, maxval=3)
sel_x = input.string(group='Bollinger Bands', title='cross select', defval='Outside', options=['Outside', 'Inside'])

Ienbl               = input.bool(group='Ichimoku', title="Show Ichimoku?", defval=false)
conversionPeriods   = input.int(group='Ichimoku', title="Conversion Line Length", defval=10, minval=1)
basePeriods         = input.int(group='Ichimoku', title="Base Line Length", defval=30, minval=1)
laggingSpan2Periods = input.int(group='Ichimoku', title="Leading Span B Length", defval=60, minval=1)
displacement        = input.int(group='Ichimoku', title="Displacement", defval=30, minval=1)

venbl = input.bool(group='Volume Profile', title="Show Volume Profile?", defval=true)
vp_poc_show = input.bool(group='Volume Profile', title='Show POC Line', defval=true)
vp_lookback = input.int(group='Volume Profile', title='Volume Lookback Depth [10-1000]', defval=200, minval=10, maxval=1000)
vp_max_bars = input.int(group='Volume Profile', title='Number of Bars [10-500]', defval=100, minval=10, maxval=500)
vp_bar_mult = input.int(group='Volume Profile', title='Bar Length Multiplier [10-100]', defval=30, minval=10, maxval=100)
vp_bar_offset = input.int(group='Volume Profile', title='Bar Horizontal Offset [0-100]', defval=30, minval=0, maxval=100)
vp_bar_width = input.int(group='Volume Profile', title='Bar Width [1-20]', defval=2, minval=1, maxval=20)
vp_delta_type = input.string(group='Volume Profile', title='Delta Type', defval='Both', options=['Both', 'Bullish', 'Bearish'])

henbl     = input.bool(group='MACD Heatmap', title="Show MACD Heatmap?", defval=false)
firstMA   = input.int(group='MACD Heatmap', title="Fast MA", defval=12)
secondMA  = input.int(group='MACD Heatmap', title="Slow MA", defval=26)
signalLen = input.int(group='MACD Heatmap', title="Signal length", defval=9)

//MOVING AVERAGES
mafast = mtype == 'EMA' ? ta.ema(src, mavgf) : rtype == 'SMA' ? ta.sma(src, mavgf) : rtype == 'HMA' ? ta.hma(src, mavgf) : ta.wma(src, mavgf)
maslow = mtype == 'EMA' ? ta.ema(src, mavgs) : rtype == 'SMA' ? ta.sma(src, mavgs) : rtype == 'HMA' ? ta.hma(src, mavgs) : ta.wma(src, mavgs)
colr   = mafast > maslow ? color.white : color.yellow

plot(menbl ? mafast : na, 'MA FAST', color=color.rgb(255, 255, 0, 50), linewidth=2, offset=off)
plot(menbl ? maslow : na, 'MA SLOW', color=colr, linewidth=3, offset=off)

// MACD Heatmap
fastMA     = ta.ema(src, firstMA)
slowMA     = ta.ema(src, secondMA)
macdDiff   = fastMA - slowMA
macdSignal = ta.ema(macdDiff, signalLen)
macdHist   = macdDiff - macdSignal

// .. based on the MAs
bgcolor(color=not henbl ? na : fastMA > slowMA ? color.new(color.green,97) : color.new(color.red,97))
bgcolor(color=not henbl ? na : ta.change(fastMA) > 0 ? color.new(color.green,97) : color.new(color.red,97))
bgcolor(color=not henbl ? na : ta.change(slowMA) > 0 ? color.new(color.green,97) : color.new(color.red,97))
bgcolor(color=not henbl ? na : ta.change(macdDiff) > 0 ? color.new(color.green,97) : color.new(color.red,97))

// .. based on the histogram values
bgcolor(color=not henbl ? na : macdDiff > macdHist ? color.new(color.green,97) : color.new(color.red,97))
bgcolor(color=not henbl ? na : macdHist > 0 ? color.new(color.green,97) : color.new(color.red,97))
bgcolor(color=not henbl ? na : ta.change(macdHist) > 0 ? color.new(color.green,97) : color.new(color.red,97))

// .. based on the MACD signal line
bgcolor(color=not henbl ? na : macdDiff > macdSignal ? color.new(color.green,97) : color.new(color.red,97))
bgcolor(color=not henbl ? na : macdSignal > 0 ? color.new(color.green,97) : color.new(color.red,97))
bgcolor(color=not henbl ? na : ta.change(macdSignal) > 0 ? color.new(color.green,97) : color.new(color.red,97))

//RIBBONS
fiba = ta.wma(ta.wma(ta.wma(ta.wma(ta.wma(ta.wma(close, 3), 5), 8), 13), 21), 34)
rcol = fiba > fiba[1] ? color.white : color.red

step = rgaps
basis = rtype == 'EMA' ? ta.ema(src, step) : rtype == 'SMA' ? ta.sma(src, step) : rtype == 'HMA' ? ta.hma(src, step) : ta.wma(src, step)
plot(renbl ? basis : na, 'Basis0', color=rcol, linewidth=2, offset=off)

step := step + rgaps
echos = rtype == 'EMA' ? ta.ema(src, step) : rtype == 'SMA' ? ta.sma(src, step) : rtype == 'HMA' ? ta.hma(src, step) : ta.wma(src, step)
plot(renbl ? echos : na, 'Basis1', color=color.rgb(255, 30, 0, 10), offset=off)

step := step + rgaps
echos := rtype == 'EMA' ? ta.ema(src, step) : rtype == 'SMA' ? ta.sma(src, step) : rtype == 'HMA' ? ta.hma(src, step) : ta.wma(src, step)
plot(renbl ? echos : na, 'Basis2', color=color.rgb(255, 60, 0, 20), offset=off)

step := step + rgaps
echos := rtype == 'EMA' ? ta.ema(src, step) : rtype == 'SMA' ? ta.sma(src, step) : rtype == 'HMA' ? ta.hma(src, step) : ta.wma(src, step)
plot(renbl ? echos : na, 'Basis3', color=color.rgb(255, 90, 0, 30), offset=off)

step := step + rgaps
echos := rtype == 'EMA' ? ta.ema(src, step) : rtype == 'SMA' ? ta.sma(src, step) : rtype == 'HMA' ? ta.hma(src, step) : ta.wma(src, step)
plot(renbl ? echos : na, 'Basis4', color=color.rgb(255, 120, 0, 40), offset=off)

step := step + rgaps
echos := rtype == 'EMA' ? ta.ema(src, step) : rtype == 'SMA' ? ta.sma(src, step) : rtype == 'HMA' ? ta.hma(src, step) : ta.wma(src, step)
plot(renbl ? echos : na, 'Basis5', color=color.rgb(255, 150, 0, 50), offset=off)

step := step + rgaps
echos := rtype == 'EMA' ? ta.ema(src, step) : rtype == 'SMA' ? ta.sma(src, step) : rtype == 'HMA' ? ta.hma(src, step) : ta.wma(src, step)
plot(renbl ? echos : na, 'Basis6', color=color.rgb(255, 180, 0, 60), offset=off)

step := step + rgaps
echos := rtype == 'EMA' ? ta.ema(src, step) : rtype == 'SMA' ? ta.sma(src, step) : rtype == 'HMA' ? ta.hma(src, step) : ta.wma(src, step)
plot(renbl ? echos : na, 'Basis7', color=color.rgb(255, 210, 0, 70), offset=off)

step := step + rgaps
echos := rtype == 'EMA' ? ta.ema(src, step) : rtype == 'SMA' ? ta.sma(src, step) : rtype == 'HMA' ? ta.hma(src, step) : ta.wma(src, step)
plot(renbl ? echos : na, 'Basis8', color=color.rgb(255, 240, 0, 80), offset=off)

//Bollinger Bands
basis := ta.sma(src,blen)

DevBB1 = mult1 * ta.stdev(src, blen)
upper1 = basis + DevBB1
lower1 = basis - DevBB1
p11 = plot(benbl and b1enb ? upper1 : na, 'BB1 Upper', color=color.rgb(100, 100, 255, 70), offset=off)
p12 = plot(benbl and b1enb ? lower1 : na, 'BB1 Lower', color=color.rgb(100, 100, 255, 70), offset=off)
fill(p11, p12, title='Background', color=color.rgb(00, 00, 255, 90))

DevBB2 = mult2 * ta.stdev(src, blen)
upper2 = basis + DevBB2
lower2 = basis - DevBB2
p21 = plot(benbl and b2enb ? upper2 : na, 'BB2 Upper', color=color.rgb(100, 100, 255, 70), offset=off)
p22 = plot(benbl and b2enb ? lower2 : na, 'BB2 Lower', color=color.rgb(100, 100, 255, 70), offset=off)
fill(p21, p22, title='Background', color=color.rgb(00, 00, 255, 90))

DevBB3 = mult3 * ta.stdev(src, blen)
upper3 = basis + DevBB3
lower3 = basis - DevBB3
p31 = plot(benbl and b3enb ? upper3 : na, 'BB3 Upper', color=color.rgb(100, 100, 255, 70), offset=off)
p32 = plot(benbl and b3enb ? lower3 : na, 'BB3 Lower', color=color.rgb(100, 100, 255, 70), offset=off)
fill(p31, p32, title='Background', color=color.rgb(00, 00, 255, 90))

//Ichimoku
donchian(len) => math.avg(ta.lowest(len), ta.highest(len))
conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = math.avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)

plot(not Ienbl ? na : conversionLine, color=#2962FF, title="Conversion Line")
plot(not Ienbl ? na : baseLine, color=#B71C1C, title="Base Line")
plot(not Ienbl ? na : close, offset = -displacement + 1, color=#43A047, title="Lagging Span")
p1 = plot(not Ienbl ? na : leadLine1, offset = displacement - 1, color=#A5D6A7, title="Leading Span A")
p2 = plot(not Ienbl ? na : leadLine2, offset = displacement - 1, color=#EF9A9A, title="Leading Span B")
fill(p1, p2, color = leadLine1 > leadLine2 ? color.rgb(67, 160, 71, 90) : color.rgb(244, 67, 54, 90))

//RSI Candlestick
up = ta.rma(math.max(ta.change(src), 0), llen)
down = ta.rma(-math.min(ta.change(src), 0), llen)
rsi = not lenbl ? ( lev1 + lev2 ) / 2 : down == 0 ? 100 : up == 0 ? 0 : 100 - 100 / (1 + up / down)
barcolor(rsi > lev1 ? color.yellow : rsi < lev2 ? color.yellow : na)

//VOLUME PROFILE
if venbl

    float vp_Vmax = 0.0
    int vp_VmaxId = 0
    int vp_N_BARS = vp_max_bars

    var int vp_first = time

    vp_a_P = array.new_float(vp_N_BARS + 1, 0.0)  // LL -> HH
    vp_a_V = array.new_float(vp_N_BARS + 1, 0.0)
    vp_a_W = array.new_int(vp_N_BARS, 0)


    // CALCULATIONS
    float vp_HH = ta.highest(high, vp_lookback)
    float vp_LL = ta.lowest(low, vp_lookback)

    if barstate.islast
        float vp_HL = (vp_HH - vp_LL) / vp_N_BARS
        for j = 1 to vp_N_BARS + 1 by 1
            array.set(vp_a_P, j - 1, vp_LL + vp_HL * j)
        for i = 0 to vp_lookback - 1 by 1
            int Dc = 0
            int Bn = int((low[i] - vp_LL) / vp_HL)
            int Ed = int((high[i] - vp_LL) / vp_HL)
            for j = Bn to Ed by 1
                float Pj = array.get(vp_a_P, j)
                if low[i] < Pj and high[i] > Pj
                    if vp_delta_type == 'Bullish' ? close[i] >= open[i] : vp_delta_type == 'Bearish' ? close[i] <= open[i] : true
                        Dc := Dc + 1
                        Dc
            if vp_delta_type == 'Bullish' ? close[i] >= open[i] : vp_delta_type == 'Bearish' ? close[i] <= open[i] : true
                for j = Bn to Ed by 1
                    float Pj = array.get(vp_a_P, j)
                    if low[i] < Pj and high[i] > Pj
                        float Vj = array.get(vp_a_V, j)
                        float dVj = Vj + (Dc > 0 ? nz(volume[i]) / Dc : 0.0)
                        array.set(vp_a_V, j, dVj)

        vp_Vmax := array.max(vp_a_V)
        vp_VmaxId := array.indexof(vp_a_V, vp_Vmax)

        for j = 0 to vp_N_BARS - 1 by 1
            float Vj = array.get(vp_a_V, j)
            int Aj = math.round(vp_bar_mult * Vj / vp_Vmax)
            array.set(vp_a_W, j, Aj)

    if barstate.isfirst
        vp_first := time
        vp_first
    vp_change = ta.change(time)
    vp_x_loc = timenow + math.round(vp_change * vp_bar_offset)

    if barstate.islast
        for i = 0 to vp_N_BARS - 1 by 1
            x1 = vp_VmaxId == i and vp_poc_show ? math.max(time[vp_lookback], vp_first) : timenow + math.round(vp_change * (vp_bar_offset - array.get(vp_a_W, i)))
            ys = array.get(vp_a_P, i)
            line.new(x1=x1, y1=ys, x2=vp_x_loc, y2=ys, xloc=xloc.bar_time, extend=extend.none, color=vp_VmaxId == i ? color.new(color.orange, 10) : color.new(color.gray, 60), style=line.style_solid, width=vp_bar_width)

//ALERTS
upper = alert == 1 ? upper1 : alert == 2 ? upper2 : upper3
lower = alert == 1 ? lower1 : alert == 2 ? lower2 : lower3
upper_x = sel_x == 'Outside' ? ta.crossover(src, upper) : ta.crossunder(src, upper)
lower_x = sel_x == 'Outside' ? ta.crossunder(src, lower) : ta.crossover(src, lower)
alertcondition(upper_x or lower_x, title='Alert BB Cross', message='Alert BB Cross')
