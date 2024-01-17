//@version=5

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║                                                                              ║
// ║ Relative Strench Index - RSI                                                 ║
// ║ Stoch Relative Strench Index - Stoch RSI                                     ║
// ║                                                                              ║
// ║ developer : hypeupgradeTR                                                    ║
// ║ creators  : tradingview                                                      ║
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


indicator(title='RSI - Stoch RSI Overlay')


// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main start (rsi & stoch rsi)                                                  ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝


src = close
len = input.int(14, minval=1, title='Length')
up = ta.rma(math.max(ta.change(src), 0), len)
down = ta.rma(-math.min(ta.change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
sma_color_rsi = rsi>70 ? #ff0000 : rsi<30 ? #ff0000 : rsi>50 ? #2962ff : #2962ff
plot(rsi, color=sma_color_rsi, linewidth=1, title='RSI')
band1 = hline(70, linestyle=hline.style_solid, title='RSI UpperLimit')
band0 = hline(30, linestyle=hline.style_solid, title='RSI LowerLimit')
fill(band1, band0, color=color.new(#2196f3, 90), title='Background')
smoothK = input.int(3, minval=1)
smoothD = input.int(3, minval=1)
lengthRSI = input.int(14, minval=1)
lengthStoch = input.int(14, minval=1)
src1 = input(close, title='RSI Source')
rsi1 = ta.rsi(src, lengthRSI)
k = ta.sma(ta.stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)
d = ta.sma(k, smoothD)
plot(k, color=color.new(#2962ff, 70), linewidth=1, title='Stoch K')
plot(d, color=color.new(#ff6d00, 70), linewidth=1, title='Stoch D')
h0 = hline(80, title='Stoch RSI UpperLimit')
h1 = hline(20, title='Stoch RSI LowerLimit')

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║     main finish (rsi & stoch rsi)                                                 ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝


// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                                                                              ║
// ║                That's all Folks !                                            ║
// ║                                                                              ║
// ╚══════════════════════════════════════════════════════════════════════════════╝
