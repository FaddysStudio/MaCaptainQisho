$ rm -rf .FaddysBeat ; mkdir -p .FaddysBeat ; ln -s ~/studio/kit/percussive/*.wav .FaddysBeat

$ node . 0/dom 1/tak 3/tak 4/dom 6/tak > .FaddysBeat/maqsum.sco

$ cat - > .FaddysBeat/maqsum.orc

sr = 96000
ksmps = 96
nchnls = 2
0dbfs = 1

instr 13

SSample strget p4
aSample [] diskin2 SSample

out aSample

endin

$ csound -o maqsum.wav -3 .FaddysBeat/maqsum.*

$ aplay maqsum.wav

$ rm -rf .FaddysBeat
