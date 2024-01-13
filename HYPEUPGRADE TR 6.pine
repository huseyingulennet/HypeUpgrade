//©HYPEUPGRADETR (based multible sources, modified and optimised by HYPEUPGRADETR)
//@version=5

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║ WVAP	                                                                      ║
// ║ RSI Candle                                                                   ║
// ║ Imbalance                                                                    ║
// ║                                                                              ║
// ║ developer : HYPEUPGRADETR                                                    ║
// ║ creators  : HYPEUPGRADETR													  ║
// ║                                                                              ║
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
//GRN01 = #7CFC00, GRN02 = #32CD32, GRN03 = #228B22, GRN04 = #006400, GRN05 = #008000, GRN06=#093507
//RED01 = #FF4500, RED02 = #FF0000, RED03 = #B22222, RED04 = #8B0000, RED05 = #800000, RED06=#330d06

// ──────────[ v3 Style Colors ]
// AQUA    = #00FFFF
// BLACK   = #000000
// BLUE    = #0000FF
// FUCHSIA = #FF00FF
// GRAY    = #808080
// GREEN   = #008000
// LIME    = #00FF00
// MAROON  = #800000
// NAVY    = #000080
// OLIVE   = #808000
// ORANGE  = #FF7F00
// PURPLE  = #800080
// RUBI    = #FF0000
// SILVER  = #C0C0C0
// TEAL    = #008080
// YELLOW  = #FFFF00
// WHITE   = #FFFFFF

// ╔══════════════════════════════════════╗
// ║                                      ║
// ║     indicator functions              ║
// ║                                      ║
// ╚══════════════════════════════════════╝

indicator("HYPEUPGRADETR 6", overlay = true, format=format.price, max_lines_count=500)


// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main start (wvap)          			                                  ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

// ----------------------------------------
groupVWAP = "Volume Weighted Average Price"
// ----------------------------------------

computeVWAP(src, isNewPeriod) =>
    var float sumSrcVol = na
    var float sumVol = na
    var float sumSrcSrcVol = na
    var float _lvwap = na

    sumSrcVol := isNewPeriod ? src * volume : src * volume + sumSrcVol[1]
    sumVol := isNewPeriod ? volume : volume + sumVol[1]
    // sumSrcSrcVol calculates the dividend of the equation that is later used to calculate the standard deviation
    sumSrcSrcVol := isNewPeriod ? volume * math.pow(src, 2) : volume * math.pow(src, 2) + sumSrcSrcVol[1]

    _vwap = sumSrcVol / sumVol
    variance = sumSrcSrcVol / sumVol - math.pow(_vwap, 2)
    variance := variance < 0 ? 0 : variance
    stDev = math.sqrt(variance)
    _lvwap := isNewPeriod ? _vwap[1] : _lvwap[1]

    [_vwap, stDev, _lvwap]

// ----------------------------------------

f_drawLabel(_x, _y, _text, _textcolor, _style, _size) =>
    var _label = label.new(
     x          = _x,
     y          = _y,
     text       = _text,
     textcolor  = _textcolor,
     style      = _style,
     size       = _size,
     xloc       = xloc.bar_time
     )
    
    label.set_xy(_label, _x, _y)

// ----------------------------------------

src = input(hlc3, title="VWAP Source", inline="V0", group=groupVWAP)

pvD_color = input.color(color.new(#089981, 0), title="", inline="V1", group=groupVWAP)
pvW_color = input.color(color.new(#2962ff, 0), title="", inline="V2", group=groupVWAP)
pvM_color = input.color(color.new(#ff9800, 0), title="", inline="V3", group=groupVWAP)
pvQ_color = input.color(color.new(#3BBC54, 0), title="", inline="V4", group=groupVWAP)
pvY_color = input.color(color.new(#2665BD, 0), title="", inline="V5", group=groupVWAP)

plot_pvD = input(true, title="Prev."                    , inline="V1", group=groupVWAP)
plot_pvW = input(true, title="Prev."                    , inline="V2", group=groupVWAP)
plot_pvM = input(false, title="Prev."                    , inline="V3", group=groupVWAP)
plot_pvQ = input(false, title="Prev."                    , inline="V4", group=groupVWAP)
plot_pvY = input(false, title="Prev."                    , inline="V5", group=groupVWAP)

vD_color = input.color(color.new(#089981, 0), title=""    , inline="V1", group=groupVWAP)
vW_color = input.color(color.new(#2962ff, 0), title=""    , inline="V2", group=groupVWAP)
vM_color = input.color(color.new(#ff9800, 0), title=""    , inline="V3", group=groupVWAP)
vQ_color = input.color(color.new(#3BBC54, 0), title=""    , inline="V4", group=groupVWAP)
vY_color = input.color(color.new(#2665BD, 0), title=""    , inline="V5", group=groupVWAP)

plot_vD = input(true, title="Show Daily VWAP"            , inline="V1", group=groupVWAP)
plot_vW = input(true, title="Show Weekly VWAP"            , inline="V2", group=groupVWAP)
plot_vM = input(true, title="Show Monthly VWAP"        , inline="V3", group=groupVWAP)
plot_vQ = input(false, title="Show Quarterly VWAP"        , inline="V4", group=groupVWAP)
plot_vY = input(false, title="Show Yearly VWAP"            , inline="V5", group=groupVWAP)

vR_color        = input.color(color.new(#000000, 0)    , title=""                    , inline="V6", group=groupVWAP)
rolling_sv        = input(false                            , title="Show Rolling VWAP"    , inline="V6", group=groupVWAP)
rolling_period    = input.int(200                            , title=""                    , inline="V6", group=groupVWAP)

vwap_r = ta.vwma(src, rolling_period)

line_width_VWAP = input.int(1, minval=0, title="Lines Width", inline="V0A", group=groupVWAP)
line_width_pVWAP = line_width_VWAP

Vstyle = input(true, title="Circles Style", inline="V0A", group=groupVWAP)

VstyleC = Vstyle ? plot.style_line : plot.style_line
VstylepC = Vstyle ? plot.style_cross : plot.style_stepline

// ----------------------------------------
groupL = "Labels"
// ----------------------------------------

show_labels = input(true, title="Show Labels |", inline="L1", group=groupL)
show_VWAPlabels = input(true, title="VWAP", inline="L1", group=groupL)
show_pVWAPlabels = input(true, title="Previous", inline="L1", group=groupL)

off_mult = input(15, title="Labels Offset", inline="L2", group=groupL)
var DEFAULT_LABEL_SIZE    = size.normal
var DEFAULT_LABEL_STYLE    = label.style_none
ll_offset = timenow + math.round(ta.change(time) * off_mult)

// ----------------------------------------

timeChange(period) =>
    ta.change(time(period))

newSessionD = timeChange("D")
newSessionW = timeChange("W")
newSessionM = timeChange("M")
newSessionQ = timeChange("3M")
newSessionY = timeChange("12M")

[vD, stdevD, pvD] = computeVWAP(src, newSessionD)
[vW, stdevW, pvW] = computeVWAP(src, newSessionW)
[vM, stdevM, pvM] = computeVWAP(src, newSessionM)
[vQ, stdevQ, pvQ] = computeVWAP(src, newSessionQ)
[vY, stdevY, pvY] = computeVWAP(src, newSessionY)

// ----------------------------------------

vRplot = plot(rolling_sv ? vwap_r : na, title="VWAP - Rolling"    , color=vR_color, style=VstyleC, linewidth=line_width_VWAP)
f_drawLabel(ll_offset, show_labels and show_VWAPlabels and rolling_sv ? vwap_r : na, "rV", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE) 

vDplot = plot(plot_vD ? vD : na, title="VWAP - Daily"    , color=vD_color, style=VstyleC, linewidth=line_width_VWAP)
f_drawLabel(ll_offset, show_labels and show_VWAPlabels and plot_vD ? vD : na, "vD", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE)

vWplot = plot(plot_vW ? vW : na, title="VWAP - Weekly"    , color=vW_color, style=VstyleC, linewidth=line_width_VWAP)
f_drawLabel(ll_offset, show_labels and show_VWAPlabels and plot_vW ? vW : na, "vW", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE)

vMplot = plot(plot_vM ? vM : na, title="VWAP - Monthly"    , color=vM_color, style=VstyleC, linewidth=line_width_VWAP)
f_drawLabel(ll_offset, show_labels and show_VWAPlabels and plot_vM ? vM : na, "vM", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE)

vQplot = plot(plot_vQ ? vQ : na, title="VWAP - Quarter"    , color=vQ_color, style=VstyleC, linewidth=line_width_VWAP)
f_drawLabel(ll_offset, show_labels and show_VWAPlabels and plot_vQ ? vQ : na, "vQ", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE)

vYplot = plot(plot_vY ? vY : na, title="VWAP - Year"    , color=vY_color, style=VstyleC, linewidth=line_width_VWAP)
f_drawLabel(ll_offset, show_labels and show_VWAPlabels and plot_vY ? vY : na, "vY", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE)

// ----------------------------------------

pvDplot = plot(plot_pvD ? pvD : na, title="pVWAP - Daily"    , color=pvD_color, style=VstylepC, linewidth=line_width_pVWAP)
f_drawLabel(ll_offset, show_labels and show_pVWAPlabels and plot_pvD ? pvD : na, "pvD", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE)

pvWplot = plot(plot_pvW ? pvW : na, title="pVWAP - Weekly"    , color=pvW_color, style=VstylepC, linewidth=line_width_pVWAP)
f_drawLabel(ll_offset, show_labels and show_pVWAPlabels and plot_pvW ? pvW : na, "pvW", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE)

pvMplot = plot(plot_pvM ? pvM : na, title="pVWAP - Monthly"    , color=pvM_color, style=VstylepC, linewidth=line_width_pVWAP)
f_drawLabel(ll_offset, show_labels and show_pVWAPlabels and plot_pvM ? pvM : na, "pvM", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE)

pvQplot = plot(plot_pvQ ? pvQ : na, title="pVWAP - Quarter"    , color=pvQ_color, style=VstylepC, linewidth=line_width_pVWAP)
f_drawLabel(ll_offset, show_labels and show_pVWAPlabels and plot_pvQ ? pvQ : na, "pvQ", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE)

pvYplot = plot(plot_pvY ? pvY : na, title="pVWAP - Year"    , color=pvY_color, style=VstylepC, linewidth=line_width_pVWAP)
f_drawLabel(ll_offset, show_labels and show_pVWAPlabels and plot_pvY ? pvY : na, "pvY", color.silver, DEFAULT_LABEL_STYLE, DEFAULT_LABEL_SIZE)

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main finish (wvap)          			                                  ║
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
// ║     main start (rsi candle)                                                  ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

src3 = close
len = input.int(14, minval=1, title='Length')
up = ta.rma(math.max(ta.change(src3), 0), len)
down = ta.rma(-math.min(ta.change(src3), 0), len)
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