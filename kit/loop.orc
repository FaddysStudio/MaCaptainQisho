instr loop

iBar chnget "bar"
iBar += 1
chnset iBar, "bar"

iRepeats init p4

if iBar < iRepeats then

print iBar
print iRepeats

schedule "rewind", 0, 1

endif

endin

instr rewind

rewindscore

endin
